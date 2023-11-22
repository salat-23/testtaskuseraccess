'use strict';

/**
 * useraccess service
 */

import {none,Option} from "fp-ts/Option";
import {AirtableUser} from "../../../../types/Airtable";

export default {
  getUserFromAirtable: async (email: string): Promise<Option<AirtableUser>> => {
    return none;
  }
}
