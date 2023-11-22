'use strict';

import {none, Option} from "fp-ts/Option";
import {AirtableUser, AirtableUserAccount} from "../../../../types/Airtable";

/**
 * A set of functions called "actions" for `useraccess`
 */

export default {
  checkAccess: async (ctx, next) => {
    const givenEmail = ctx.request.body.email;
    const existingStrapiUser = await strapi.plugins['users-permissions'].services.user.count({email: givenEmail});
    if (existingStrapiUser) return ctx.throw(409, "User already registered.");
    const maybeUser: Option<AirtableUser> = await strapi.service("api::useraccess.airtable").getUser(givenEmail);
    if (maybeUser._tag == "None") return ctx.notFound();
    const airtableUser: AirtableUser = maybeUser.value;
    const randomPassword = strapi.service("api::shared.password").generate({length: 8});
    const newUser = await strapi.plugins['users-permissions'].services.user.add({
      blocked: false,
      confirmed: true,
      username: airtableUser.email,
      email: airtableUser.email,
      password: randomPassword,
      provider: 'local',
      created_by: 1,
      updated_by: 1,
      role: 1
    });
    const registeredAirtableUserAccount: AirtableUserAccount = {
      airtableUserId: airtableUser.id.toString(),
      strapiUserId: newUser.id.toString()
    }
    const airtableInsertSuccessful = await strapi.service("api::useraccess.airtable").addRegisteredUser(registeredAirtableUserAccount);
    if (!airtableInsertSuccessful) {
      await strapi.plugins['users-permissions'].services.user.remove({
        id: newUser.id
      })
      return ctx.throw(500, "Unable to fully complete user registration, try later.")
    }
    await strapi.service("api::shared.email").notify({
      recipient: airtableUser.email,
      subject: "User registration",
      body: `Login: '${airtableUser.email}', password: '${randomPassword}'`
    })
    ctx.status = 200;
    ctx.body = { message: "User registration complete."}
  }
};
