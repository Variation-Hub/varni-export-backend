const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5555;
app.use(express.json());
app.use(cors());

var transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "api",
        pass: "787bf6a6962f0cc14ea7b6c5ce15f44e"
    }
});

const generateEmailTemplate = (data) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="background-color: #FB6119; padding: 20px; text-align: center;">
                <h2 style="color: #fff; margin: 0;">Varni Export</h2>
            </div>
            <div style="padding: 20px;">
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 10px;">
                        <strong>First Name:</strong> ${data.first_name}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Last Name:</strong> ${data.last_name}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Email:</strong> <a href="mailto:${data.email}" style="color: #FB6119;">${data.email}</a>
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Phone:</strong> <a href="tel:+${data.country_code} ${data.phone}" style="color: #FB6119;">+${data.country_code} ${data.phone}</a>
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Business Type:</strong> ${data.business_type}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Website:</strong> <a href="${data.website}" style="color: #FB6119;">${data.website}</a>
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Address:</strong> ${data.address}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>City:</strong> ${data.city}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Postal Code:</strong> ${data.postal_code}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>State:</strong> ${data.state}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Product:</strong> ${data.product}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Message:</strong> ${data.message}
                    </li>
                </ul>
                <p>Thank you.</p>
            </div>
        </div>
    `;
};

const generateEmailTemplateEnquiry = (data) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="background-color: #FB6119; padding: 20px; text-align: center;">
                <h2 style="color: #fff; margin: 0;">Varni Export</h2>
            </div>
            <div style="padding: 20px;">
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 10px;">
                        <strong>Full Name:</strong> ${data.full_name}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Email:</strong> <a href="mailto:${data.email}" style="color: #FB6119;">${data.email}</a>
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Phone:</strong> <a href="tel:+${data.country_code} ${data.number}" style="color: #FB6119;">+${data.country_code} ${data.number}</a>
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Company Name:</strong> ${data.company_name}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>City:</strong> ${data.city}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Postal Code:</strong> ${data.postal_code}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Country:</strong> ${data.country}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Product:</strong> ${data.product_name}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Quantity in Ton:</strong> ${data.quantity_in_ton}
                    </li>
                </ul>
                <p>Thank you.</p>
            </div>
        </div>
    `;
};

app.post('/send-email', (req, res) => {
    try {
        const { subject, body } = req.body;

        const mailOptions = {
            from: 'enquiry@varniexports.com',
            to: 'enquiry@varniexports.com',
            subject: subject,
            text: Object.keys(body).map(value => `${value} : ${body[value]}`).join(" "),
            html: generateEmailTemplate(body) // Convert the plain text to HTML for email clients that do not support HTML
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ', info.response);
                res.status(200).send('Thank you for Enquiry');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing request');  // Return an error message if there's a problem with the request itself. 500 is a server error status code. 400 is a client error status code. 404 is a not found status code. 200 is a success status code. 503 is a service unavailable status code. 502 is a bad gateway status code. 504 is a gateway timeout status code. 511 is network authentication required status code. 520 is a temporary error status code. 521 is web server is down status code. 522 is connection timed out status code. 523 is origin server temporary failure status code. 524 is a gateway timeout error status code. 525 is a HTTP version not supported status code. 526 is
    }
})

app.post('/send-enquiry', (req, res) => {
    try {
        const { subject, body } = req.body;

        const mailOptions = {
            from: 'enquiry@varniexports.com',
            to: 'enquiry@varniexports.com',
            subject: subject,
            text: Object.keys(body).map(value => `${value} : ${body[value]}`).join(" "),
            html: generateEmailTemplateEnquiry(body) // Convert the plain text to HTML for email clients that do not support HTML
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ', info.response);
                res.status(200).send('Thank you for Enquiry');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing request');  // Return an error message if there's a problem with the request itself. 500 is a server error status code. 400 is a client error status code. 404 is a not found status code. 200 is a success status code. 503 is a service unavailable status code. 502 is a bad gateway status code. 504 is a gateway timeout status code. 511 is network authentication required status code. 520 is a temporary error status code. 521 is web server is down status code. 522 is connection timed out status code. 523 is origin server temporary failure status code. 524 is a gateway timeout error status code. 525 is a HTTP version not supported status code. 526 is
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});