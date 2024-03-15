# n8n-nodes-amocrm

This is an n8n community node. It lets you use [AmoCRM](https://amocrm.ru) your n8n workflows.

AmoCRM allows you to save the history of interaction with customers, as well as automate sales department processes.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Compatibility](#compatibility)  
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)
[Donation](#donation)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-amocrm` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes: select **I understand the risks of installing unverified code from a public source**.
5. Select **Install**.

After installing the node, you can use it like any other node. n8n displays the node in search results in the **Nodes** panel.

## Operations

It supports these operations:

- Get account information
- Add modify and retrieve companies
- Add modify and retrieve contacts
- Add change and get deals
- Add modify and retrieve tasks
- Add modify and retrieve notes
- Add modify and retrieve catalogs
- Add modify and retrieve catalog elements

## Credentials

Create an AmoCRM account [here](https://amocrm.ru). For 14 days free of charge.

- Go to n8n and create a new credential amoCRM. Copy OAuth Redirect URL.
- Go to your amoCRM account and create a new widget in the Market section type of external integration https://your-domain.amocrm.ru/amo-market/
- Paste the previously copied OAuth Redirect URL into the "Redirect Link" field.
- Provide the accesses required for integration (these may vary depending on your scenario for using this node)
- Enter an arbitrary name and description of the integration. The integration name may appear in the amoCRM event log if the created_by and updated_by parameters are not filled in. Description cannot be shorter than 5 characters
- Press to Save button
- Update your page and find your integration in installed section. Press on it.
- In the settings of the created integration, go to the Keys and Accesses section. Copy Integration ID and Secret key
- Go to n8n and paste the Integration ID and Secret key you received.
- Fill Account Subdomain and click on connect my account. Window will open.
- Select the account to connect to and click the Allow button
- If everything was successful, you will see a green message indicating successful connection in n8n

## Compatibility

Tested against n8n version 1.20.0+

## Usage

In your Workflow, find the amoCRM node and use as you need.
I accept comments and suggestions in Issues repository on github or in telegram [@yatolstoy](https://t.me/yatolstoy)

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [amoCRM API Documentation](https://www.amocrm.ru/developers)

## Donation

This code is developed by an enthusiastic developer on his own initiative. By donations you will force me to develop and improve this node. Thank you!

- [Link for donation from Russia](https://yoomoney.ru/to/410012112222938)
- [Link for donation from another countries](https://appstart.easystaff.io/easylancer/yatolstoy)
