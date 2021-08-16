const util = require('util');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, './.env')
});

const child = require('child_process');
const execAsync = util.promisify(child.exec);

const nodemailer = require('nodemailer');
const sample = require('lodash/sample');

const quotes = require('./quotes.json');
const cowsayAvatars = require('./avatars');
const RECIPIENTS = require('./recipients');

const { EMAIL_PASSWORD, EMAIL_USERNAME } = process.env;

(async function main() {
    const emails = RECIPIENTS.map(async (recipient) => {
        const { html, subject } = await getRandomQuoteEmail(recipient);
        const emailPayload = {
            auth: {
                user: EMAIL_USERNAME,
                pass: EMAIL_PASSWORD
            },
            from: EMAIL_USERNAME,
            to: recipient.EMAIL,
            subject,
            html
        };

        return sendEmail(emailPayload);
    });

    try {
        const result = await Promise.all(emails);
        process.stdout.write(result.toString());
    } catch (e) {
        process.stdout.write(e.toString());
        console.error(e);
    }
})();

function sendEmail(options) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        debug: true,
        logger: true,
        auth: options.auth
    });

    return transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    });
}

async function getRandomQuoteEmail(recipient) {
    const withCowsay = true;
    const quoteContent = sample(quotes);
    const avatar = sample(cowsayAvatars);
    const { stdout, stderr } = await execAsync(`cowsay -f ${avatar} "${quoteContent.text} ~ ${quoteContent.author || 'unknown'}"`);
    const quote = withCowsay && !stderr
        ? `<pre>${stdout}</pre>`
        : `<blockquote>
            ${quoteContent.text}

            <footer>~ ${quoteContent.author || 'unknown'}</footer>
        </blockquote>`

    return {
        ...quoteContent,
        subject: `Some wise words from ${quoteContent.author || 'unknown'} for your day`,
        html: `
        <div>Good Morning ${recipient.NAME},</div>

        <div style="margin: 16px 0;">
            Thought some words from ${quoteContent.author || 'unknown'}, would brighten your day.
        </div>

        ${quote}

        <div style="margin: 16px 0;">
            Have a good Day!
            <div style="margin: 5px 0;">
            Lennart
            </div>
        </div>

        <div style="margin: 16px 0;">~ don't click here to unsubscribe: just come talk to me</div>
        `
    };
}
