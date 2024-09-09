import { createTransport, TransportOptions } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const transport = createTransport({
	host: 'smtp.javis.vn',
	port: 587,
	auth: {
		user: 'prj-template@javis.vn',
		pass: '0XzpXUB8iW',
	},
    pool: true,
    maxMessages: Infinity,
    maxConnections: 5,
    rateDelta: 20000,
    rateLimit: 5,
    connectionTimeout: 5000,
    socketTimeout: 5000,
    greetingTimeout: 5000,
} as TransportOptions);

// transport.on("idle", function () {
//     // send next message from the pending queue
//     console.log('idle');
//     while (transport.isIdle() && messages.length) {
//         console.log('send' + messages.length);
//         console.log(transport.isIdle());
//         transport.sendMail(messages.shift()!);
//     }
// });

let email = [
    'tienvv1234@gmail.com', 
    'tiendaica1234@gmail.com', 
    'tien.phamtienthuan.com',
];

const messages: Mail.Options[] = [
    {
        to: email[0],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(1, email.length).join(','),
    },
    {
        to: email[1],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 1).join(','),
    },
    {
        to: email[2],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 2).join(','),
    },
    {
        to: email[0],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(1, email.length).join(','),
    },
    {
        to: email[1],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 1).join(','),
    },
    {
        to: email[2],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 2).join(','),
    },
    {
        to: email[0],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(1, email.length).join(','),
    },
    {
        to: email[1],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 1).join(','),
    },
    {
        to: email[2],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 2).join(','),
    },
    {
        to: email[0],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(1, email.length).join(','),
    },
    {
        to: email[1],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 1).join(','),
    },
    {
        to: email[2],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 2).join(','),
    },
    {
        to: email[0],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(1, email.length).join(','),
    },
    {
        to: email[1],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 1).join(','),
    },
    {
        to: email[2],
        subject: 'Hello',
        text: 'Hello world',
        bcc: email.slice(0, 2).join(','),
    },
];

export const sendMail = async () => {
	try {
		const info = await transport.sendMail({
			from: 'prj-template@javis.vn',
			to: email[0],
			subject: 'Hello',
			text: 'Hello world',
			html: '<b>Hello world</b>',
            bcc: email.slice(1, email.length).join(','),
		});
        console.log('info');
		return info;
	} catch (error: unknown) {
		console.error(error as string, 'sendMail');
	}
};

export const sendMailToAll = async () => {
    try {
        for (const message of messages) {
            const info = await transport.sendMail({
                from: 'prj-template@javis.vn',
                ...message,
            });
        }
        console.log('sendMailToAll');
    } catch (error: unknown) {
        console.error(error as string, 'sendMailToAll');
    }
} 

sendMailToAll().then(() => {
    console.log('done');
}).catch((error) => {
    console.error(error);
})
