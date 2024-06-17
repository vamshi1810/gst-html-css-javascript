const form = document.querySelector("#customer-bill-form");

const customer_name = document.querySelector("#customer-name");
console.log(customer_name);
const last_name = document.querySelector("#last-name");

const mobile_number = document.querySelector("#mobile-number");

const receipt_info = document.querySelector("#recipet-no");
const gst_value = document.querySelector("#GST");
console.log(gst_value)

const inputs = document.querySelectorAll(
  'input[type="text"], input[type="number"], input[type="email"]'
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("clicked");
  console.log(customer_name.value);
  const customer_name_data = customer_name.value;

  const phone_number_data = mobile_number.value;
  const last_name_data = last_name.value;

  const receipt_info_data = receipt_info.value
  const gst_value_data = parseInt(gst_value.value);
  console.log(gst_value_data)

  
  const invoiceContainer = document.getElementById("invoice-container");
   
  const logo_part = document.createElement("div");
  logo_part.className = "logo_part";

  const res_logo = document.createElement("img");
  res_logo.className = "res-logo";

  res_logo.src = "./assets/res-logo-removebg-preview.png";

  logo_part.appendChild(res_logo);

  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var formattedDate = day + "/" + month + "/" + year;

  const header = document.createElement("div");
  header.className = "invoice-header";

  const customer_info = document.createElement("div");
  customer_info.classList = "customer_info";
  const toInvoice = document.createElement("h2");
  toInvoice.innerHTML = "Invoice To:";
  let customer_name_part = document.createElement("h1");
  customer_name_part.className = "customer_name_part";
  customer_name_part.innerHTML = customer_name_data+" "+last_name_data;

  let customer_address_part = document.createElement("h5");
  customer_address_part.className = "customer_address_part";
  customer_address_part.innerHTML = phone_number_data;
  console.log(phone_number_data);
  customer_info.appendChild(toInvoice);

  customer_info.appendChild(customer_name_part);
  customer_info.appendChild(customer_address_part);

  let invoiceInfoDates = document.createElement("div");
  invoiceInfoDates.classList = "customer_info";

  let invoice_date = document.createElement("h4");
  invoice_date.innerHTML = `<p><strong>Date:</strong>${formattedDate}</p>`;

  let invoice_number = document.createElement("h4");

  invoice_number.innerHTML = `<p><strong>Invoice No:</strong>${receipt_info_data}</p>`;

  invoiceInfoDates.appendChild(invoice_date);

  invoiceInfoDates.appendChild(invoice_number);
  header.appendChild(customer_info);
  header.appendChild(invoiceInfoDates);

  // invoice name

  const invoice_name = document.createElement("h1");
  invoice_name.className = "invoice_name";
  invoice_name.innerHTML = "Invoice";

  const invoice = document.createElement("div");
  invoice.appendChild(logo_part)

  invoice.appendChild(header);
  invoice.appendChild(invoice_name);

  let products = [];
  var productDivs = document.querySelectorAll(".items-info");
  productDivs.forEach(function (productDiv) {
    var product = {};
    var inputFields = productDiv.querySelectorAll(
      "input[type='text'], input[type='number']"
    ); // Add other input types if necessary
    var allFieldsFilled = true;

    inputFields.forEach(function (inputField) {
      var fieldName = inputField.name;
      var fieldValue = inputField.value;

      if (fieldValue === "") {
        allFieldsFilled = false;
      } else {
        if (inputField.type === "number") {
          product[fieldName] = parseInt(fieldValue); // Use parseInt if you need integers
        } else {
          product[fieldName] = fieldValue;
        }
      }
    });

    if (allFieldsFilled) {
      products.push(product);
    }
  });

  let sub_total = 0;
  products.forEach((item) => {
    sub_total += item.qty * item.price;
  });
  let gst = ((sub_total*gst_value_data)/100)

  let total = 0;
  
  total =  sub_total+gst;

 

  const items = document.createElement("div");
  items.className = "invoice-items";
  const itemsTable = document.createElement("table");
  itemsTable.innerHTML = `
    <thead>
        <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        ${products
          .map(
            (item) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.qty * item.price).toFixed(2)}</td>
            </tr>
        `
          )
          .join("")}
    </tbody>
`;
  items.appendChild(itemsTable);
  invoice.appendChild(items);

  const middle_content = document.createElement('div')
  middle_content.className = "middle_content"

  const middle_content_info = document.createElement('div');
  middle_content_info.className = "middle_content_info"

  const para_info = document.createElement('h5');
  para_info.className = "para_info"
  para_info.innerHTML = "Thank You So Much!"

  middle_content_info.appendChild(para_info);


  const total_table = document.createElement("div");
  total_table.className = "invoice-total";

  const total_cal = document.createElement("table");

  total_cal.innerHTML = `
   <tbody>
     
            <tr>
                <th>Sub Total</th>
                <td> ${sub_total.toFixed(2)}</td>
            </tr>
            <tr>
            <th>GST (${gst_value_data}%)</th>
            <td> ${gst.toFixed(2)}</td>
        </tr>
        <tr>
        <th>Total</th>
        <td> ${total.toFixed(2)}</td>
    </tr>
     
    </tbody>
`;
total_table.appendChild(total_cal)
middle_content.appendChild(middle_content_info)
middle_content.appendChild(total_table);

invoice.appendChild(middle_content);
  invoiceContainer.appendChild(invoice);
});
