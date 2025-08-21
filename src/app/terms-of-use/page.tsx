import ReactMarkdown from "react-markdown";

const email = "<<@todo: insert email address>>";

const usagePolicyShort = `# Terms of Use

By using pineappl.xyz, you agree to the following terms of use:

## Disclaimer

All users are required to verify the information available on this site. This website is not responsible for any mistakes or losses incurred due to information provided on this site.

Certain activities on this site require children to be supervised by an adult and may involve external resources from the internet. Supervising adults are solely responsible for ensuring the safety of children and their accounts during these activities.

All games and content on this site are subject to regular updates, improvements, and error corrections.

## Usage

**This website requires a purchase to be used.**
When making a purchase, you will be asked to provide your email address.
This email address will be the only way to identify you and your account. Losing access to your email address will result in loss of access to your account.

Upon successfully completing a payment, an *access code* will be sent to the email address you specified.

- The access code allows you to access all content on the site for a certain period of time, depending on the type of purchase made.
- The access code is meant to be *private* and should not be shared with anyone.
- Sharing the access code will compromise your account and progress.
- If your access code is lost or compromised, contact us at **${email}** from your registered email address.

## Refund Policy

**Payments once made cannot be refunded.** There are no subscription plans offered on this site.

## Data Collection

- Anonymous usage statistics such as page views, time spent, etc., are collected to improve the overall experience.
- Personally identifiable information of any child is not collected.
- Email addresses used to make a payment are stored to identify users and provide access to the service.

## Promotions

By making a payment, users agree to receive emails from us.
These emails may include promotional content, payment reminders, and feature updates.

Users can opt out at any time.
Click the unsubscribe link in any email to stop receiving them.

## Contact

If you have questions about these terms of use, contact us at ${email}.`;

export default function UsagePolicy() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex bg-blue-500 text-white p-4 w-full">
        For any questions or concerns, please contact us at {email}.
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6 text-foreground">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  {children}
                </h2>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-base leading-relaxed">{children}</li>
              ),
              p: ({ children }) => (
                <p className="text-base leading-relaxed mb-4">{children}</p>
              ),
            }}
          >
            {usagePolicyShort}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
