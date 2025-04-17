
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZapierWebhookConfig from '@/components/settings/ZapierWebhookConfig';

const ZapierSettings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">CRM Integration Settings</h1>
          <p className="mb-8 text-gray-600 text-center">
            Configure your Zapier webhook to automatically send lead information from your forms to your CRM system.
          </p>
          
          <ZapierWebhookConfig />
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">How to Set Up Your Zapier Integration</h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Create a new Zap in your Zapier account</li>
              <li>Select "Webhook by Zapier" as your trigger app</li>
              <li>Choose "Catch Hook" as the trigger event</li>
              <li>Copy the webhook URL provided by Zapier</li>
              <li>Paste the URL in the field above and click "Save Webhook URL"</li>
              <li>Continue setting up your Zap, connecting to your CRM as the action app</li>
              <li>Map the form fields to your CRM fields (all form submissions include standardized data)</li>
              <li>Test and enable your Zap</li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              Note: All form submissions on the website will now automatically be sent to your CRM through this webhook.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ZapierSettings;
