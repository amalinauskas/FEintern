//
const getData = async () => {
  let data = [];
  const f1_data = await fetch("https://picsum.photos/v2/list");
  const f1_data_json = await f1_data.json();
  data = f1_data_json;
  console.log(data);

  // linkai
  for (const image of f1_data_json) {
    console.log(image.download_url);
  }

  const list_element = document.getElementById("list");
  const pagination_element = document.getElementById("pagination");

  let current_page = 1;
  let rows = 5;

  function DisplayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];

      let item_element = document.createElement("img");
      item_element.src = item.download_url;
      item_element.classList.add("item");
      item_element.setAttribute("id", `${item.id}`);
      item_element.innerText = item.download_url;

      wrapper.appendChild(item_element);
    }
  }

  function SetupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = PaginationButton(i, items);
      wrapper.appendChild(btn);
    }
  }

  function PaginationButton(page, items) {
    let button = document.createElement("button");
    button.innerText = page;

    if (current_page == page) button.classList.add("active");

    button.addEventListener("click", function () {
      current_page = page;
      DisplayList(items, list_element, rows, current_page);

      let current_btn = document.querySelector(".pagenumbers button.active");
      current_btn.classList.remove("active");

      button.classList.add("active");
    });

    return button;
  }

  DisplayList(data, list_element, rows, current_page);
  SetupPagination(data, pagination_element, rows);
};

getData();
