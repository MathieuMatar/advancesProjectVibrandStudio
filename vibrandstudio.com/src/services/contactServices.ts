class ContactServices {
    static async sendMail(data: { name: string; email: string; title: string; message: string }) {

        return { success: true, message: "Mail sent successfully" };



    }
}

export default ContactServices;