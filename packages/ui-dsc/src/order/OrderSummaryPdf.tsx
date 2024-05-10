/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Link,
  StyleSheet,
} from "@react-pdf/renderer"
import { getCatalogItemDescriptor } from "../utils/getCatalogItemDescriptor"
import { grey } from "@material-ui/core/colors"
import { getShippingValues, getPaymentValues } from "../utils/getListValues"
import { type CatalogCartItem, OrderState } from "../types"

const styles = StyleSheet.create({
  body: {
    display: "flex",
    margin: 20,
  },
  title: {
    padding: 8,
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "#004080",
    color: "#fff",
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
  },
  items: {
    marginBottom: 8,
    fontSize: 16,
    flexDirection: "row",
  },
  header: {
    flexGrow: 1,
    fontSize: 26,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: grey[200],
    padding: 12,
  },
  subheader: {
    fontSize: 24,
    marginBottom: 14,
    textDecoration: "underline",
  },
  leftPanel: {
    width: "50%",
  },
  rightPanel: {
    width: "50%",
  },
  date: {
    marginTop: 8,
    fontSize: 16,
  },
  id: {
    fontSize: 12,
  },
  total: {
    fontSize: 22,
  },
  address: {
    fontSize: 16,
    marginBottom: 4,
  },
})

// generate display for list of items in order
const getItemsList = (items: CatalogCartItem[]) =>
  items.map((item: CatalogCartItem) => (
    <View key={item.id} style={styles.items}>
      <View style={styles.leftPanel}>
        <Text>{getCatalogItemDescriptor(item)}</Text>
        <Text style={styles.id}>{item.id}</Text>
      </View>
      <View style={styles.rightPanel}>
        <Text>${item.fee}</Text>
      </View>
    </View>
  ))

// generate address list
const getAddressList = (items: string[]) =>
  items.map((item: string) => (
    <Text key={item} style={styles.address}>
      {item}
    </Text>
  ))

type OrderSummaryPDFProperties = {
  order: OrderState
}

/**
 * OrderSummaryPDF displays a PDF version of the user's order summary. It is
 * presented after a successful order submission.
 */
const OrderSummaryPdf = ({ order }: OrderSummaryPDFProperties) => {
  const { formData, cartItems, cartTotal, orderID } = order
  return (
    <PDFViewer width={800} height={800}>
      <Document title="DSC Order Summary">
        <Page size="A3">
          <View style={styles.body}>
            <View style={styles.title}>
              <Text>DSC Order #{orderID}</Text>
              <Text style={styles.date}>{new Date().toDateString()}</Text>
            </View>
            <View style={styles.header}>
              <Text>Order Summary</Text>
            </View>
            <View>
              {getItemsList(cartItems)}
              <View style={styles.row}>
                <View style={styles.leftPanel}>
                  <Text style={styles.total}>Total</Text>
                </View>
                <View style={styles.rightPanel}>
                  <Text style={styles.total}>{cartTotal}</Text>
                </View>
              </View>
            </View>
            <View style={styles.header}>
              <Text>Shipping and Billing Information</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.leftPanel}>
                <Text style={styles.subheader}>Shipping Address</Text>
                {getAddressList(getShippingValues(formData))}
              </View>
              <View style={styles.rightPanel}>
                <Text style={styles.subheader}>Payment Details</Text>
                {getAddressList(getPaymentValues(formData))}
              </View>
            </View>
            <View style={styles.header}>
              <Text>Payment Information</Text>
            </View>
            <View style={styles.row}>
              <Text>
                Payment information is available at the
                <Link src={`${import.meta.env.VITE_APP_STOCKCENTER_URL}/information/payment`}>
                  DSC website.
                </Link>
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export { OrderSummaryPdf }
