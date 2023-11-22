interface AirtableUser {
  id: number,
  email: string,
  fullName: string,
}

interface AirtableUserAccount {
  strapiUserId: string,
  airtableUserId: string
}

export type {AirtableUser, AirtableUserAccount}
