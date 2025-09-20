import {
  Html,
  Head,
  Font,
  Preview,
  Body,
  Container,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

export default function VerificationEmail({
  username,
  otp,
}: {
  username: string;
  otp: string;
}) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Body style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Section>
            <Row>
              <Heading as="h2">Hello {username},</Heading>
            </Row>
            <Row>
              <Text>
                Thank you for registering. Please use the following verification
                code to complete your registration:
              </Text>
            </Row>
            <Row>
              <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                {otp}
              </Text>
            </Row>
            <Row>
              <Text>
                If you did not request this code, please ignore this email.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
