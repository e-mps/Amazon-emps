var fs = require("graceful-fs");
const fsPromises = require("fs/promises");
const getAmazonCats = require("./api/getAmazonCategories");
const categoryXML = require("./api/GetAmazonXmlAttributes");
const browseNodes = require("./api/getAmazonBrowseNodes");
const {
  Parser,
  transforms: { unwind },
} = require("json2csv");
const { rmSync } = require("fs");

let amazonCategories = async (req, res) => {
  console.log("Arrived");
  const data = await getAmazonCats.getAmazonCategories();
  console.log(data);
  res.status(200).send(data);
};

let categoryXMLAttributes = async (req, res) => {
  
  console.log(req.body);
  const { site, categoryName, subCategory } = req.body;

  //create a csv with categoryName+subCategory
  makeCsv(`${categoryName}-${subCategory}`);
  
  const data = await categoryXML.getAmazonXmlAttributes(
    site,
    categoryName,
    subCategory
  );
  
  console.log(data);
  console.log("starting")
  console.log(data.Site);
  console.log(data.Attributes);
  //write data to csv
  
  console.log(typeof(data.Attributes))
  data.Attributes.foreach((attribute) => {
    // console.log(attribute)
    // console.log(attribute.AttributeId)
    let restrictions = "";
    let validValues = "";
    if (attribute.Restrictions) {
      restrictions = attribute.Restrictions.map((item) => {
        return `${item.Type}:${item.Value}`;
      }).join(";");
    }
    if (attribute.ValidValues) {
      validValues = attribute.ValidValues.map((item) => {
        return `${item.Value}`;
      }).join(";");
     
    }

    let dataToWrite = [
      `"${attribute.DisplayName}"`,
      `"${attribute.Required}"`,
      `"${attribute.Type}"`,
      `"${restrictions}"`,
      `"${validValues}"`,
    ];
    console.log(dataToWrite);

    try {
      fs.writeFileSync(
        `apps/linns/exports/${categoryName}-${subCategory}.csv`,
        dataToWrite + "\n",
        { flag: "a" }
      );
    } catch (err) {
      console.log(err);
    }
  });

  //res.status(200).send(data)
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename=${categoryName}-${subCategory}.csv`,
  });
  fs.createReadStream(
    `apps/linns/exports/${categoryName}-${subCategory}.csv`
  ).pipe(res);
};

function makeCsv(fileName) {
  //`${__dirname}/data/${fileName}.csv`, 'w'
  const stream = fs.openSync(`apps/linns/exports/${fileName}.csv`, "w");
  var headers = ["Name", "Required", "Type", "Restrictions", "Valid Values"];
  try {
    fs.writeFileSync(stream, headers + "\n");
  } catch (err) {
    console.log(err);
  }
}

let getAmazonBrowseNodes = async (req, res) => {
  console.log(req.body);
  const { site, category } = req.body;
  const data = await browseNodes.getAmazonBrowseNodes(site, category);
  console.log(data);

  const fields = [
    {
      label: "Node Id",
      value: "NodeId",
    },
    {
      label: "Node Path",
      value: "NodePath",
    },
    {
      label: "Item Type",
      value: "ItemType",
    },
    {
      label: "Department Name",
      value: "DepartmentName",
    },
  ];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(data);
  fsPromises
    .writeFile(`apps/linns/exports/nodes/${category}-Nodes-${site}.csv`, csv, {
      encoding: "utf8",
    })
    .then(() => {
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${category}-Nodes-${site}.csv`,
      });
      fs.createReadStream(
        `apps/linns/exports/nodes/${category}-Nodes-${site}.csv`
      ).pipe(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  amazonCategories,
  categoryXMLAttributes,
  getAmazonBrowseNodes,
};
