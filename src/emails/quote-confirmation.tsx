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

interface QuoteConfirmationEmailProps {
  requestId: string;
  customerName: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
}

export function QuoteConfirmationEmail({
  requestId,
  customerName,
  service,
  preferredDate,
  preferredTime,
}: QuoteConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your cleaning quote request has been received</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You, {customerName}!</Heading>
          <Text style={text}>
            We&apos;ve received your quote request for{" "}
            <strong>{service}</strong>.
          </Text>
          <Section style={details}>
            <Text style={detailLabel}>Request ID</Text>
            <Text style={detailValue}>{requestId}</Text>
            <Text style={detailLabel}>Preferred Date</Text>
            <Text style={detailValue}>{preferredDate}</Text>
            <Text style={detailLabel}>Preferred Time</Text>
            <Text style={detailValue}>{preferredTime}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={text}>
            Our team will review your request and contact you within 24 hours
            with a personalized quote. If you have any questions, reply to this
            email or call us at +1 713-259-3741.
          </Text>
          <Text style={footer}>Tori's Cleaning Service - Professional Cleaning Services</Text>
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

const text = {
  color: "#4a5568",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
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

const footer = {
  color: "#a0aec0",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "40px 0",
};
