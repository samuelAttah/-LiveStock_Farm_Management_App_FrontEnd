import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingHorizontal: 15,
    fontFamily: "Helvetica",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  description: {
    fontSize: 18,
    marginBottom: 2,
    textAlign: "center",
    color: "#424242",
    marginTop: 5,
  },
  expenses: {
    fontSize: 18,
    marginBottom: 2,
    textAlign: "center",
    color: "red",
    marginTop: 5,
  },
  revenues: {
    fontSize: 18,
    marginBottom: 2,
    textAlign: "center",
    color: "green",
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 2,
    textAlign: "center",
    color: "grey",
    marginTop: 5,
  },
  linecover: {
    marginTop: 7,
    marginLeft: 10,
  },
  anotherlinecover: {
    marginTop: 7,
    marginLeft: 20,
    paddingLeft: 35,
  },
  feedslinecover: {
    marginTop: 7,
    marginLeft: 40,
    paddingLeft: 40,
  },

  secondlinecover: {
    marginTop: 5,
    marginLeft: 10,
  },
  singlelineleft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    flexWrap: "wrap",
  },
  anothersinglelineleft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    flexWrap: "wrap",
  },
  starttext: { fontSize: "12px", marginRight: 2, fontWeight: "bold" },
  longstarttext: {
    display: "flex",
    fontSize: "12px",
    marginRight: 2,
    fontWeight: "bold",
  },
  starttotalbatchexpensestext: {
    fontSize: "12px",
    marginRight: 2,
    fontWeight: "bold",
    color: "red",
  },
  starttotalbatchrevenuestext: {
    fontSize: "12px",
    marginRight: 2,
    fontWeight: "bold",
    color: "green",
  },
  fetchedtext: { fontWeight: "thin", fontSize: "10px" },
  fetchedtotalbatchexpensestext: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "red",
  },
  fetchedtotalbatchrevenuestext: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "green",
  },
  fetchedtotalbatchnormaltext: {
    fontWeight: "bold",
    fontSize: "14px",
  },
});

const BatchSummaryPDFfile = ({
  stateBatch,
  costPerUnit,
  totalDeadAnimals,
  totalPurchaseCost,
  purchasedDate,
  createdDate,
  numberOfTimesFeedExpense,
  formattedTotalAmountSpentOnFeeds,
  numberOfTimesDrugExpense,
  formattedTotalAmountSpentOnDrugs,
  numberOfTimesHousingExpense,
  formattedTotalAmountSpentOnHousings,
  numberOfTimesOtherExpense,
  formattedTotalAmountSpentOnOtherExpenses,
  formattedTotalBatchExpenses,
  numberOfTimesAnimalsWereSold,
  formattedTotalIncomeGeneratedFromAnimalSales,
  totalNumberOfAnimalsSold,
  numberOfTimesOtherItemsWereSold,
  formattedTotalIncomeGeneratedFromOtherSales,
  formattedTotalBatchRevenues,
  profitOrLoss,
  formattedProfitOrLoss,
  singleUserDetail,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#2196f3" }}>
            {singleUserDetail?.farmName ?? "Update Company/Farm Name"}
          </Text>
          {singleUserDetail?.companyLogo ? (
            <Image
              src={singleUserDetail?.companyLogo}
              style={{ height: "50", width: "70" }}
            />
          ) : (
            <Text style={{ color: "#2196f3" }}>Update Company Logo</Text>
          )}
        </View>
        <View>
          <Text style={styles.title}>{stateBatch?.batchTitle}</Text>
        </View>

        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
            marginBottom: 5,
          }}
        />
        <View>
          <Text style={styles.description}>General Description</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.linecover}>
            <View style={styles.singlelineleft}>
              <Text style={styles.starttext}>Batch Title: </Text>
              <Text style={styles.fetchedtext}>{stateBatch?.batchTitle}</Text>
            </View>
            <View style={styles.singlelineleft}>
              <Text style={styles.starttext}>Initial Number of Animals: </Text>
              <Text style={styles.fetchedtext}>
                {stateBatch?.numberPurchased}
              </Text>
            </View>
            <View style={styles.singlelineleft}>
              <Text style={styles.starttext}>Cost Per Animal: </Text>
              <Text style={styles.fetchedtext}>{costPerUnit}</Text>
            </View>
            <View style={styles.singlelineleft}>
              <Text style={styles.starttext}>Date of Purchase: </Text>
              <Text style={styles.fetchedtext}>
                {purchasedDate?.split("T")[0]}
              </Text>
            </View>
          </View>
          <View style={styles.secondlinecover}>
            <View style={styles.singlelineleft}>
              <Text style={styles.starttext}>Animal Type: </Text>
              <Text style={styles.fetchedtext}>{stateBatch?.animalType}</Text>
            </View>
            <View style={styles.singlelineleft}>
              <Text style={styles.starttext}>Number of Dead Animals: </Text>
              <Text style={styles.fetchedtext}>{totalDeadAnimals}</Text>
            </View>
            <View style={styles.singlelineleft}>
              <Text style={styles.starttext}>Total Purchase Cost: </Text>
              <Text style={styles.fetchedtext}>{totalPurchaseCost}</Text>
            </View>
            <View style={styles.singlelineleft}>
              <Text style={styles.starttext}>Batch Creation Date: </Text>
              <Text style={styles.fetchedtext}>
                {createdDate?.split("T")[0]}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
          }}
        />
        <View>
          <Text style={styles.expenses}>Batch Expenses</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            marginLeft: 20,
          }}
        >
          <Text
            color="grey"
            style={{
              textAlign: "left",
              marginLeft: 20,
              paddingLeft: 15,
              fontSize: 12,
              color: "grey",
            }}
          >
            Purchase of Feeds
          </Text>
        </View>
        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>Feeds Purchase Count: </Text>
              <Text style={styles.fetchedtext}>{numberOfTimesFeedExpense}</Text>
            </View>
          </View>
          <View style={styles.feedslinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>
                {" "}
                Total amount spent on Feeding:{" "}
              </Text>
              <Text style={styles.fetchedtext}>
                {formattedTotalAmountSpentOnFeeds}
              </Text>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
          }}
        /> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            marginLeft: 20,
          }}
        >
          <Text
            color="grey"
            style={{
              textAlign: "left",
              marginLeft: 20,
              paddingLeft: 15,
              fontSize: 12,
              color: "grey",
            }}
          >
            Purchase of Drugs
          </Text>
        </View>
        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>Drugs Purchase Count: </Text>
              <Text style={styles.fetchedtext}>{numberOfTimesDrugExpense}</Text>
            </View>
          </View>
          <View style={styles.feedslinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>
                {" "}
                Total amount spent on Drugs:{" "}
              </Text>
              <Text style={styles.fetchedtext}>
                {formattedTotalAmountSpentOnDrugs}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            marginLeft: 20,
          }}
        >
          <Text
            color="grey"
            style={{
              textAlign: "left",
              marginLeft: 20,
              paddingLeft: 15,
              fontSize: 12,
              color: "grey",
            }}
          >
            Purchase of Properties
          </Text>
        </View>
        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>Properties Purchase Count: </Text>
              <Text style={styles.fetchedtext}>
                {numberOfTimesHousingExpense}
              </Text>
            </View>
          </View>
          <View style={styles.feedslinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>
                {" "}
                Total amount spent on Properties:{" "}
              </Text>
              <Text style={styles.fetchedtext}>
                {formattedTotalAmountSpentOnHousings}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            marginLeft: 20,
          }}
        >
          <Text
            color="grey"
            style={{
              textAlign: "left",
              marginLeft: 20,
              paddingLeft: 15,
              fontSize: 12,
              color: "grey",
            }}
          >
            Other/Miscellaneous Expenses
          </Text>
        </View>
        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>Other Expenses Count: </Text>
              <Text style={styles.fetchedtext}>
                {numberOfTimesOtherExpense}
              </Text>
            </View>
          </View>
          <View style={styles.feedslinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>
                {" "}
                Total amount spent on Other Expenses:{" "}
              </Text>
              <Text style={styles.fetchedtext}>
                {formattedTotalAmountSpentOnOtherExpenses}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttotalbatchexpensestext}>
                Total Amount of All Expenses:{" "}
              </Text>
              <Text style={styles.fetchedtotalbatchexpensestext}>
                {formattedTotalBatchExpenses}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
          }}
        />

        <View>
          <Text style={styles.revenues}>Batch Revenues</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            marginLeft: 20,
          }}
        >
          <Text
            color="grey"
            style={{
              textAlign: "left",
              marginLeft: 20,
              paddingLeft: 15,
              fontSize: 12,
              color: "grey",
            }}
          >
            Sales of Animals
          </Text>
        </View>
        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>Animal Sales Count: </Text>
              <Text style={styles.fetchedtext}>
                {numberOfTimesAnimalsWereSold}
              </Text>
            </View>
          </View>
          <View style={styles.feedslinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.longstarttext}>
                {" "}
                Total Amount Generated from Sales of Animals:{" "}
              </Text>
              <Text style={styles.fetchedtext}>
                {formattedTotalIncomeGeneratedFromAnimalSales}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>
                Total Number of Animals Sold:{" "}
              </Text>
              <Text style={styles.fetchedtext}>{totalNumberOfAnimalsSold}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            marginLeft: 20,
          }}
        >
          <Text
            color="grey"
            style={{
              textAlign: "left",
              marginLeft: 20,
              paddingLeft: 15,
              fontSize: 12,
              color: "grey",
            }}
          >
            Sales of Other Farm Items
          </Text>
        </View>
        <View
          style={{
            borderBottom: "1px",
            color: "grey",
            borderColor: "grey",
            height: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttext}>Other Revenues Count: </Text>
              <Text style={styles.fetchedtext}>
                {numberOfTimesOtherItemsWereSold}
              </Text>
            </View>
          </View>
          <View style={styles.feedslinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.longstarttext}>
                {" "}
                Total Amount Generated from Sales of Other Items:{" "}
              </Text>
              <Text style={styles.fetchedtext}>
                {formattedTotalIncomeGeneratedFromOtherSales}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <View style={styles.anotherlinecover}>
            <View style={styles.anothersinglelineleft}>
              <Text style={styles.starttotalbatchrevenuestext}>
                Total Amount of All Revenues:{" "}
              </Text>
              <Text style={styles.fetchedtotalbatchrevenuestext}>
                {formattedTotalBatchRevenues}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 7,
            marginLeft: 20,
            paddingLeft: 35,
          }}
        >
          {profitOrLoss >= 0 ? (
            <Text style={styles.starttotalbatchrevenuestext}>
              Total Profit:{" "}
            </Text>
          ) : (
            <Text style={styles.starttotalbatchexpensestext}>Total Loss: </Text>
          )}
          {profitOrLoss > 0 ? (
            <Text style={styles.fetchedtotalbatchrevenuestext}>
              {formattedProfitOrLoss}
            </Text>
          ) : profitOrLoss < 0 ? (
            <Text style={styles.fetchedtotalbatchexpensestext}>
              {formattedProfitOrLoss}
            </Text>
          ) : (
            <Text style={styles.fetchedtotalbatchnormaltext}>
              {formattedProfitOrLoss}
            </Text>
          )}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
};

export default BatchSummaryPDFfile;
