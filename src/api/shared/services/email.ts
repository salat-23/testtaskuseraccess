export default {
  notify: async ({recipient, subject, body}: {recipient: string, subject: string, body: string}) => {
    // stub for email notification, this will return true, emulating sending notification
    return true
  }
}
