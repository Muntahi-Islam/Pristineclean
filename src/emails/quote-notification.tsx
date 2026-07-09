import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface QuoteNotificationEmailProps {
  requestId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  propertyType: string;
  frequency: string;
  preferredDate: string;
  estimatedValue?: string;
}

export function QuoteNotificationEmail({
  requestId,
  customerName,
  customerEmail,
  customerPhone,
  service,
  propertyType,
  frequency,
  preferredDate,
  estimatedValue,
}: QuoteNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New quote request from {customerName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Quote Request</Heading>
          <Text style={badge}>Action Required</Text>
          <Section style={details}>
            <Text style={detailLabel}>Request ID</Text>
            <Text style={detailValue}>{requestId}</Text>
            <Text style={detailLabel}>Customer</Text>
            <Text style={detailValue}>{customerName}</Text>
            <Text style={detailLabel}>Email</Text>
            <Text style={detailValue}>{customerEmail}</Text>
            <Text style={detailLabel}>Phone</Text>
            <Text style={detailValue}>{customerPhone}</Text>
            <Text style={detailLabel}>Service</Text>
            <Text style={detailValue}>{service}</Text>
            <Text style={detailLabel}>Property Type</Text>
            <Text style={detailValue}>{propertyType}</Text>
            <Text style={detailLabel}>Frequency</Text>
            <Text style={detailValue}>{frequency}</Text>
            <Text style={detailLabel}>Preferred Date</Text>
            <Text style={detailValue}>{preferredDate}</Text>
            {estimatedValue && (
              <>
                <Text style={detailLabel}>Est. Value</Text>
                <Text style={detailValue}>{estimatedValue}</Text>
              </>
            )}
          </Section>
          <Hr style={hr} />
          <Text style={text}>
            Log in to the admin dashboard to review and respond to this request.
          </Text>
          <Text style={footer}>Tori's Cleaning Service - Admin Notification</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f8f9fa",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "520px",
};

const h1 = {
  color: "#0a1628",
  fontSize: "28px",
  fontWeight: "600",
  letterSpacing: "-0.5px",
  margin: "30px 0",
};

const badge = {
  display: "inline-block",
  backgroundColor: "#e53e3e",
  color: "#ffffff",
  padding: "4px 12px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const details = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  border: "1px solid #e2e8f0",
};

const detailLabel = {
  color: "#718096",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "12px 0 4px",
};

const detailValue = {
  color: "#0a1628",
  fontSize: "16px",
  fontWeight: "500",
  margin: "0 0 8px",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "24px 0",
};

const text = {
  color: "#4a5568",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const footer = {
  color: "#a0aec0",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "40px 0",
};
