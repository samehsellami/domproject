document.addEventListener("DOMContentLoaded", function() {
    var plusIcons = document.querySelectorAll(".icon-plus");
    var minusIcons = document.querySelectorAll(".icon-minus");
    var trashIcons = document.querySelectorAll(".icon-trash");

    plusIcons.forEach(function(icon) {
        icon.addEventListener("click", function() {
            var gridItem = icon.parentNode;
            var quantityElement = gridItem.querySelector(".item-quantity");

            quantityElement.textContent = parseInt(quantityElement.textContent) + 1;

            updateTotal();
        });
    });

    minusIcons.forEach(function(icon) {
        icon.addEventListener("click", function() {
            var gridItem = icon.parentNode;
            var quantityElement = gridItem.querySelector(".item-quantity");

            var quantity = parseInt(quantityElement.textContent);

            if (quantity > 1) {
                quantityElement.textContent = quantity - 1;
            } else {
                gridItem.parentNode.parentNode.removeChild(gridItem.parentNode);
            }

            updateTotal();
        });
    });

    trashIcons.forEach(function(icon) {
        icon.addEventListener("click", function() {
            var gridItem = icon.parentNode.parentNode;
            gridItem.parentNode.removeChild(gridItem);

            updateTotal();
        });
    });

    function updateTotal() {
        var total = 0;
        var gridItems = document.querySelectorAll(".grid-item");
        var totalTableBody = document.querySelector("#total-table-body");

        totalTableBody.innerHTML = "";

        gridItems.forEach(function(gridItem) {
            var itemName = gridItem.querySelector("h3").textContent;
            var quantityElement = gridItem.querySelector(".item-quantity");
            var priceElement = gridItem.querySelector(".item-price");
            var quantity = parseInt(quantityElement.textContent);
            var price = parseInt(priceElement.textContent);
            var itemTotal = quantity * price;

            total += itemTotal;

            if (quantity > 0) {
                var row = document.createElement("tr");
                var nameCell = document.createElement("td");
                var quantityCell = document.createElement("td");
                var priceCell = document.createElement("td");

                nameCell.textContent = itemName;
                quantityCell.textContent = quantity;
                priceCell.textContent = itemTotal + " DT";

                row.appendChild(nameCell);
                row.appendChild(quantityCell);
                row.appendChild(priceCell);

                totalTableBody.appendChild(row);
            }
        });

        var totalAmountElement = document.querySelector("#total-amount");
        totalAmountElement.textContent = total + " DT";
    }

    var calculateButton = document.getElementById("calculate-btn");
    calculateButton.addEventListener("click", function() {
        var totalTable = document.getElementById("total-table");
        var totalTableBody = document.getElementById("total-table-body");

        totalTable.classList.toggle("show");

        if (totalTable.classList.contains("show")) {
            totalTableBody.innerHTML = "";

            var gridItems = document.querySelectorAll(".grid-item");

            gridItems.forEach(function(gridItem) {
                var itemName = gridItem.querySelector("h3").textContent;
                var quantityElement = gridItem.querySelector(".item-quantity");
                var priceElement = gridItem.querySelector(".item-price");
                var quantity = parseInt(quantityElement.textContent);
                var price = parseInt(priceElement.textContent);
                var itemTotal = quantity * price;

                if (quantity > 0) {
                    var row = document.createElement("tr");
                    var nameCell = document.createElement("td");
                    var quantityCell = document.createElement("td");
                    var priceCell = document.createElement("td");

                    nameCell.textContent = itemName;
                    quantityCell.textContent = quantity;
                    priceCell.textContent = itemTotal + " DT";

                    row.appendChild(nameCell);
                    row.appendChild(quantityCell);
                    row.appendChild(priceCell);

                    totalTableBody.appendChild(row);
                } else {
                    gridItem.parentNode.removeChild(gridItem);
                }
            });

            updateTotal();
        }
    });
});
