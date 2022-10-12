import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetBatchesQuery } from "./batchApiSlice";
import BatchSummaryPageExcerpt from "./BatchSummaryPageExcerpt";

const BatchSummaryPage = () => {
  const { batchId } = useParams();

  const { batch, isError, isLoading, isSuccess, error } = useGetBatchesQuery(
    "batchesList",
    {
      selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
        batch: data?.entities?.[batchId],
        isError,
        isLoading,
        isSuccess,
        error,
      }),
      refetchOnMountOrArgChange: true,
    }
  );

  const [stateBatch, setStateBatch] = useState({});

  const [createdDate, setCreatedDate] = useState(String);
  const [costPerUnit, setCostPerUnit] = useState(String);
  const [totalPurchaseCost, setTotalPurchaseCost] = useState(String);

  useEffect(() => {
    if (isSuccess) {
      setStateBatch(batch);

      setCreatedDate(batch.createdAt);

      const formattedTotalPurchaseCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(batch.totalPurchaseCost)[0]);

      const formattedCostPerUnit = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(batch.costPerUnit)[0]);

      setTotalPurchaseCost(formattedTotalPurchaseCost);

      setCostPerUnit(formattedCostPerUnit);
    }
  }, [batch, isSuccess]);

  const feeds = stateBatch?.feed;
  const housings = stateBatch?.housing;
  const mortalities = stateBatch?.mortality;
  const drugs = stateBatch?.drugs;
  const otherExpenses = stateBatch?.otherExpenses;
  const revenues = stateBatch?.revenue;
  const animalSales = stateBatch?.animalSales;

  //DEAD ANIMALS CALCULATION
  const totalDeadAnimals = mortalities?.length
    ? batch?.mortality.reduce((acc, mortality) => {
        return acc + mortality.numberDead;
      }, 0)
    : 0;

  //FEEDS EXPENSES CALCULATION
  const numberOfTimesFeedExpense = feeds?.length;
  const totalAmountSpentOnFeeds = feeds?.length
    ? feeds.reduce((acc, feed) => {
        return acc + Object.values(feed.amountPurchased)[0];
      }, 0)
    : 0;

  const formattedTotalAmountSpentOnFeeds = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(totalAmountSpentOnFeeds);

  //DRUGS EXPENSES CALCULATION
  const numberOfTimesDrugExpense = drugs?.length;

  const totalAmountSpentOnDrugs = drugs?.length
    ? drugs.reduce((acc, drug) => {
        return acc + Object.values(drug.cost)[0];
      }, 0)
    : 0;

  const formattedTotalAmountSpentOnDrugs = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(totalAmountSpentOnDrugs);

  //HOUSINGS EXPENSES CALCULATION
  const numberOfTimesHousingExpense = drugs?.length;

  const totalAmountSpentOnHousing = housings?.length
    ? housings.reduce((acc, house) => {
        return acc + Object.values(house.cost)[0];
      }, 0)
    : 0;

  const formattedTotalAmountSpentOnHousings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(totalAmountSpentOnHousing);

  //Other EXPENSES CALCULATION
  const numberOfTimesOtherExpense = otherExpenses?.length;

  const totalAmountSpentOnOtherExpenses = otherExpenses?.length
    ? otherExpenses.reduce((acc, expense) => {
        return acc + Object.values(expense.amountPurchased)[0];
      }, 0)
    : 0;

  const formattedTotalAmountSpentOnOtherExpenses = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: stateBatch?.currency ?? "USD",
    }
  ).format(totalAmountSpentOnOtherExpenses);

  //INCOME GENERATED FROM ANIMAL SALES
  const numberOfTimesAnimalsWereSold = animalSales?.length;

  const totalNumberOfAnimalsSold = animalSales?.length
    ? animalSales.reduce((acc, sale) => {
        return acc + Object.values(sale.numberSold)[0];
      }, 0)
    : 0;

  const totalIncomeGeneratedFromAnimalSales = animalSales?.length
    ? animalSales.reduce((acc, sale) => {
        return acc + Object.values(sale.totalCost)[0];
      }, 0)
    : 0;

  const formattedTotalIncomeGeneratedFromAnimalSales = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: stateBatch?.currency ?? "USD",
    }
  ).format(totalIncomeGeneratedFromAnimalSales);

  //INCOME GENERATED FROM SALES OF OTHER ITEMS
  const numberOfTimesOtherItemsWereSold = revenues?.length;

  const totalIncomeGeneratedFromOtherSales = revenues?.length
    ? revenues.reduce((acc, revenue) => {
        return acc + Object.values(revenue.totalCost)[0];
      }, 0)
    : 0;

  const formattedTotalIncomeGeneratedFromOtherSales = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: stateBatch?.currency ?? "USD",
    }
  ).format(totalIncomeGeneratedFromOtherSales);

  //TOTAL EXPENSES
  const totalBatchExpenses =
    totalAmountSpentOnFeeds +
    totalAmountSpentOnDrugs +
    totalAmountSpentOnHousing +
    totalAmountSpentOnOtherExpenses;

  const formattedTotalBatchExpenses = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(totalBatchExpenses);

  //TOTAL REVENUE GENERATED
  const totalBatchRevenues =
    totalIncomeGeneratedFromAnimalSales + totalIncomeGeneratedFromOtherSales;

  const formattedTotalBatchRevenues = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(totalBatchRevenues);

  return (
    <>
      {isSuccess && Object.keys(stateBatch)?.length ? (
        <BatchSummaryPageExcerpt
          batch={stateBatch}
          totalDeadAnimals={totalDeadAnimals}
          costPerUnit={costPerUnit}
          totalPurchaseCost={totalPurchaseCost}
          createdDate={createdDate}
          numberOfTimesFeedExpense={numberOfTimesFeedExpense}
          formattedTotalAmountSpentOnFeeds={formattedTotalAmountSpentOnFeeds}
          numberOfTimesDrugExpense={numberOfTimesDrugExpense}
          formattedTotalAmountSpentOnDrugs={formattedTotalAmountSpentOnDrugs}
          numberOfTimesHousingExpense={numberOfTimesHousingExpense}
          formattedTotalAmountSpentOnHousings={
            formattedTotalAmountSpentOnHousings
          }
          numberOfTimesOtherExpense={numberOfTimesOtherExpense}
          formattedTotalAmountSpentOnOtherExpenses={
            formattedTotalAmountSpentOnOtherExpenses
          }
          numberOfTimesAnimalsWereSold={numberOfTimesAnimalsWereSold}
          totalNumberOfAnimalsSold={totalNumberOfAnimalsSold}
          formattedTotalIncomeGeneratedFromAnimalSales={
            formattedTotalIncomeGeneratedFromAnimalSales
          }
          numberOfTimesOtherItemsWereSold={numberOfTimesOtherItemsWereSold}
          formattedTotalIncomeGeneratedFromOtherSales={
            formattedTotalIncomeGeneratedFromOtherSales
          }
          formattedTotalBatchExpenses={formattedTotalBatchExpenses}
          formattedTotalBatchRevenues={formattedTotalBatchRevenues}
          totalBatchExpenses={totalBatchExpenses}
          totalBatchRevenues={totalBatchRevenues}
        />
      ) : null}
      {isLoading && !isError ? <p>Loading...</p> : null}
      {isError && !isLoading && error ? error?.data.message : null}
    </>
  );
};

export default BatchSummaryPage;
