import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { registerReportFont } from "./fonts";
import type { ScanSessionData } from "@/lib/scanSession";

export interface ReportPdfLabels {
  title: string;
  overallLabel: string;
  point: string;
  generatedOn: string;
  disclaimer: string;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11 },
  title: { fontSize: 20, marginBottom: 4 },
  subtitle: { fontSize: 10, color: "#666666", marginBottom: 20 },
  scoreBlock: { marginBottom: 20 },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  scoreRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  body: { fontSize: 11, lineHeight: 1.7 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#999999",
  },
});

export async function generateReportPdf(
  session: ScanSessionData,
  reportText: string,
  labels: ReportPdfLabels
): Promise<Buffer> {
  const fontFamily = registerReportFont(session.locale);
  const dynamicStyles = StyleSheet.create({
    text: { fontFamily },
  });

  const doc = (
    <Document>
      <Page size="A4" style={[styles.page, dynamicStyles.text]}>
        <Text style={styles.title}>{labels.title}</Text>
        <Text style={styles.subtitle}>
          {labels.generatedOn} {new Date(session.createdAt).toLocaleDateString()}
        </Text>

        <View style={styles.scoreBlock}>
          {session.deepScan.metrics.map((m) => (
            <View key={m.key} style={styles.scoreRow}>
              <Text>{m.label}</Text>
              <Text>
                {m.score} {labels.point}
              </Text>
            </View>
          ))}
          <View style={styles.scoreRowLast}>
            <Text>{labels.overallLabel}</Text>
            <Text>
              {session.deepScan.overallScore} {labels.point}
            </Text>
          </View>
        </View>

        <Text style={styles.body}>{reportText}</Text>

        <Text style={styles.footer}>{labels.disclaimer}</Text>
      </Page>
    </Document>
  );

  return renderToBuffer(doc);
}
