<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #1a73e8 0%, #1557b0 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .info-row {
            margin: 15px 0;
            padding: 12px;
            background: white;
            border-left: 3px solid #1a73e8;
            border-radius: 4px;
        }
        .label {
            font-weight: 600;
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .value {
            font-size: 16px;
            color: #333;
            margin-top: 4px;
        }
        .message-box {
            background: white;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
            border: 1px solid #e0e0e0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">MC Rental Cars</p>
        </div>
        <div class="content">
            <p style="font-size: 16px; margin-top: 0;">You have received a new contact form submission:</p>
            
            <div class="info-row">
                <div class="label">Name</div>
                <div class="value">{{ $contactData['name'] }}</div>
            </div>
            
            <div class="info-row">
                <div class="label">Email</div>
                <div class="value">
                    <a href="mailto:{{ $contactData['email'] }}" style="color: #1a73e8; text-decoration: none;">
                        {{ $contactData['email'] }}
                    </a>
                </div>
            </div>
            
            @if(!empty($contactData['phone']))
            <div class="info-row">
                <div class="label">Phone</div>
                <div class="value">
                    <a href="tel:{{ $contactData['phone'] }}" style="color: #1a73e8; text-decoration: none;">
                        {{ $contactData['phone'] }}
                    </a>
                </div>
            </div>
            @endif
            
            <div class="info-row">
                <div class="label">Subject</div>
                <div class="value">{{ $contactData['subject'] ?? 'No subject provided' }}</div>
            </div>
            
            <div class="message-box">
                <div class="label" style="margin-bottom: 10px;">Message</div>
                <div style="white-space: pre-wrap; line-height: 1.8;">{{ $contactData['message'] }}</div>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <strong>Reply directly to this email to respond to {{ $contactData['name'] }}</strong>
            </p>
        </div>
    </div>
</body>
</html>
