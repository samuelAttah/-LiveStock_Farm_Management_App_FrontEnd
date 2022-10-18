import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const DocumentationPage = () => {
  return (
    <Grid item xs={12} md={12} mt={1} padding={4}>
      <Typography component="h6" variant="h6" color="gray">
        Documentaion and Usage
      </Typography>
      <hr />
      <Typography component="p" textAlign={"justify"} mt={3}>
        Farm animals are reared in groups or batches. A Batch refers to farm
        animals purchased or produced within a particular period. Usually,
        animals in a batch are just about the same age.
      </Typography>
      <Typography component="p" textAlign={"justify"} mt={3}>
        To create a batch, you need to fill up the initial information on the
        number of animals purchased and the price as well. It is assumed that
        the animals were bought, however, if the animals were birthed by other
        animals on the farm, you can fill the cost of purchase as 0. A batch
        title could be the month in which the animals were purchased, for
        example, “December Batch”.
      </Typography>
      <Typography component="p" textAlign={"justify"} mt={3} mb={3}>
        This Application documents expenses in a batch under four categories:
        Mortalities, Purchase of drugs/Health Care, Purchase of Feeds, Purchase
        of Properties (lands, buildings, etc.), and other miscellaneous
        expenses. However, revenues are generated in a batch firstly, through
        the sales of farm animals. Secondly, through selling other items such as
        milk, eggs, etc., landed properties, buildings, or any other item from
        the farm during a batch. The picture below depicts what a batch page
        looks like.
      </Typography>
      <img
        alt="Batch Page"
        src="../../Batch Page.jpg"
        height={500}
        width={700}
      />
      <Typography component="p" textAlign={"justify"} mt={3}>
        A batch page has footer navigation that can be used to view expenses and
        revenues. All expenses are highlighted in red, while revenues generated
        for a batch are highlighted in green. New expense or revenue entries can
        be made and existing entries can be updated as well.
      </Typography>

      <Typography component="p" textAlign={"justify"} mt={3}>
        A batch page has footer navigation that can be used to view expenses and
        revenues. All expenses are highlighted in red, while revenues generated
        for a batch are highlighted in green. New expense or revenue entries can
        be made and existing entries can be updated as well.
      </Typography>

      <Typography component="p" textAlign={"justify"} mt={3} mb={3}>
        Several batches can run simultaneously. A batch could be deleted if no
        further reference is to be made to it. However, a batch can be ended if
        references will be made to the batch in the future. Ending a Batch means
        making the batch inactive. In that case, no new entries or updates could
        be made to it. Below is a picture of the dashboard showing active and
        inactive batches.
      </Typography>
      <img
        alt="Dashboard Page"
        src="../../Dashboard Page.jpg"
        height={500}
        width={700}
      />

      <Typography component="p" textAlign={"justify"} mt={3} mb={3}>
        A batch summary page highlights all expenditures and revenues, thus
        analyzing if the farmer is making profits or running losses. The summary
        page can as well be downloaded as a PDF. The picture below shows a Batch
        summary Page.
      </Typography>
      <img
        alt="Summary Page"
        src="../../Batch_Summary.jpg"
        height={700}
        width={300}
      />
    </Grid>
  );
};

export default DocumentationPage;
