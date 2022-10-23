import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetBatchesQuery } from "./batchApiSlice";
import { useGetUserDetailQuery } from "../user/userApiSlice";
import BatchSummaryPageExcerpt from "./BatchSummaryPageExcerpt";
import useTitle from "../../common/hooks/useTitle";

const BatchSummaryPage = () => {
  const { batchId } = useParams();
  useTitle("Farm Diary | Batch Summary");

  //USING RTK CUSTOM HOOKS

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

  const {
    data: userDetails = {},
    // isError,
    // isLoading,
    // error,
  } = useGetUserDetailQuery("userList", {
    refetchOnMountOrArgChange: true,
  });

  const [stateBatch, setStateBatch] = useState({});

  const [initialPurchased, setInitialPurchased] = useState(0);

  const [createdDate, setCreatedDate] = useState(String);
  const [purchasedDate, sePurchasedDate] = useState(String);
  const [costPerUnit, setCostPerUnit] = useState(String);
  const [totalPurchaseCost, setTotalPurchaseCost] = useState(String);

  useEffect(() => {
    if (isSuccess) {
      setStateBatch(batch);

      setCreatedDate(batch.createdAt);
      sePurchasedDate(batch?.datePurchased);

      const formattedTotalPurchaseCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(batch.totalPurchaseCost)[0]);

      setInitialPurchased(Object.values(batch.totalPurchaseCost)[0]);

      const formattedCostPerUnit = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(batch.costPerUnit)[0]);

      setTotalPurchaseCost(formattedTotalPurchaseCost);

      setCostPerUnit(formattedCostPerUnit);
    }
  }, [batch, isSuccess]);

  const arrayOfUserDetails = Object.keys(userDetails)?.length
    ? userDetails?.ids.map((id) => {
        return userDetails?.entities[id];
      })
    : [];

  const singleUserDetail = arrayOfUserDetails?.[0];

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
        return acc + Number(mortality.numberDead);
      }, 0)
    : 0;

  //FEEDS EXPENSES CALCULATION
  const numberOfTimesFeedExpense = feeds?.length;
  const totalAmountSpentOnFeeds = feeds?.length
    ? feeds.reduce((acc, feed) => {
        return acc + Number(Object.values(feed.amountPurchased)[0]);
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
        return acc + Number(Object.values(drug.cost)[0]);
      }, 0)
    : 0;

  const formattedTotalAmountSpentOnDrugs = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(totalAmountSpentOnDrugs);

  //HOUSINGS EXPENSES CALCULATION
  const numberOfTimesHousingExpense = housings?.length;

  const totalAmountSpentOnHousing = housings?.length
    ? housings.reduce((acc, house) => {
        return acc + Number(Object.values(house.cost)[0]);
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
        return acc + Number(Object.values(expense.amountPurchased)[0]);
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
        return acc + Number(sale.numberSold);
      }, 0)
    : 0;

  const totalIncomeGeneratedFromAnimalSales = animalSales?.length
    ? animalSales.reduce((acc, sale) => {
        return acc + Number(Object.values(sale.totalCost)[0]);
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
        return acc + Number(Object.values(revenue.totalCost)[0]);
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
    Number(initialPurchased) +
    Number(totalAmountSpentOnFeeds) +
    Number(totalAmountSpentOnDrugs) +
    Number(totalAmountSpentOnHousing) +
    Number(totalAmountSpentOnOtherExpenses);

  const formattedTotalBatchExpenses = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(totalBatchExpenses);

  //TOTAL REVENUE GENERATED
  const totalBatchRevenues =
    Number(totalIncomeGeneratedFromAnimalSales) +
    Number(totalIncomeGeneratedFromOtherSales);

  const formattedTotalBatchRevenues = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(totalBatchRevenues);

  //PROFIT OR LOSS EVALUATION
  const profitOrLoss = totalBatchRevenues - totalBatchExpenses;

  const formattedProfitOrLoss = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stateBatch?.currency ?? "USD",
  }).format(profitOrLoss);

  return (
    <>
      {isSuccess && Object.keys(stateBatch)?.length ? (
        <>
          <BatchSummaryPageExcerpt
            batch={stateBatch}
            totalDeadAnimals={totalDeadAnimals}
            costPerUnit={costPerUnit}
            totalPurchaseCost={totalPurchaseCost}
            createdDate={createdDate}
            purchasedDate={purchasedDate}
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
            profitOrLoss={profitOrLoss}
            formattedProfitOrLoss={formattedProfitOrLoss}
            singleUserDetail={singleUserDetail}
          />
        </>
      ) : null}
      {isLoading && !isError ? <p>Loading...</p> : null}
      {isError && !isLoading && error ? error?.data.message : null}
    </>
  );
};

export default BatchSummaryPage;
