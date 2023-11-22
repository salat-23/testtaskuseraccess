'use strict'

import {factories} from '@strapi/strapi';
import {none, some, Option} from "fp-ts/Option";
import Airtable from "airtable";
import {env} from "@strapi/utils";
import {AirtableUser, AirtableUserAccount} from "../../../../types/Airtable";

const airtable = new Airtable({apiKey: env("AIRTABLE_APIKEY")}).base(env("AIRTABLE_APPID"))
export default {
  getUser: async (email: string): Promise<Option<AirtableUser>> => {
    try {
      const result = await airtable("users").select({filterByFormula: `email = "${email}"`}).all()
      if (result.length == 0) return none;
      const rawJsonResponse = result[0]._rawJson;
      return some({
        id: rawJsonResponse.id,
        email: rawJsonResponse.fields["Email"],
        fullName: rawJsonResponse.fields["Full name"]
      });
    } catch (ex) {
      return none;
    }
  },
  addRegisteredUser: async (userAccount: AirtableUserAccount) => {
    try {
      const result = await airtable.table("userAccounts").create([
        {
          fields: {
            "StrapiUserId": userAccount.strapiUserId,
            "AirtableUserId": userAccount.airtableUserId
          }
        }
      ])
      return true;
    } catch (ex) {
      console.log(ex)
      return false
    }
  }
}
