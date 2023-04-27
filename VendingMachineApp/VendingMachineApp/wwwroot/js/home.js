$(document).ready(function () {
    const apiUrl = "http://vending.us-east-1.elasticbeanstalk.com/items";
    let totalMoney = 0;
    let selectedItem = null;

    function loadItems() {
        $.get(apiUrl, function (data) {
            let items = data;
            let itemsContainer = $(".items-container");
            itemsContainer.empty();

            items.forEach(function (item, index) {
                let itemElement = $(`<div class="item" data-item-id="${item.id}">
                <div>Slot: ${index + 1}</div>
                <div>${item.name}</div>
                <div>Price: $${item.price.toFixed(2)}</div>
                <div>Quantity: ${item.quantity}</div></div>`);


                itemsContainer.append(itemElement);

                itemElement.click(function () {
                    selectedItem = $(this).data("item-id");
                    $("#selected-item").val(selectedItem);
                });
            });
        });
    }

    loadItems();

    function updateTotalMoney() {
        $("#total-money").val(totalMoney.toFixed(2));
    }

    updateTotalMoney();

    $("#add-dollar").click(function () {
        totalMoney += 1;
        updateTotalMoney();
    });

    $("#add-quarter").click(function () {
        totalMoney += 0.25;
        updateTotalMoney();
    });

    $("#add-dime").click(function () {
        totalMoney += 0.10;
        updateTotalMoney();
    });

    $("#add-nickel").click(function () {
        totalMoney += 0.05;
        updateTotalMoney();
    });

    function formatChange(change) {
        let result = [];

        if (change.quarters && change.quarters > 0) {
            result.push(`${change.quarters} quarters`);
        }

        if (change.dimes && change.dimes > 0) {
            result.push(`${change.dimes} dimes`);
        }

        if (change.nickels && change.nickels > 0) {
            result.push(`${change.nickels} nickels`);
        }

        if (change.pennies && change.pennies > 0) {
            result.push(`${change.pennies} pennies`);
        }

        return result.join(", ");
    }

    $("#make-purchase").click(function () {
        if (selectedItem === null) {
            $("#messages").val("Please make a selection");
            return;
        }

        purchase(totalMoney.toFixed(2), selectedItem);
    });

    function purchase(amount, id) {
        $.ajax({
            url: `http://vending.us-east-1.elasticbeanstalk.com/money/${amount}/item/${id}`,
            method: "POST",
            success: function (data) {
                $("#messages").val("Thank You!!");
                $("#change").val(formatChange(data));

                let totalChangeAmount = (data.quarters * 0.25) + (data.dimes * 0.10) + (data.nickels * 0.05) + (data.pennies * 0.01);
                totalMoney -= totalChangeAmount;
                updateTotalMoney();
                loadItems();
            },
            error: function (xhr) {
                let error = JSON.parse(xhr.responseText);
                $("#messages").val(error.message);
                loadItems();
            },
        });
    }

    $("#change-return").click(function () {
        if (totalMoney === 0) {
            $("#change").val("");
        } else {
            $.get(`${apiUrl}/change/${totalMoney.toFixed(2)}`, function (data) {
                $("#change").val(formatChange(data));
                totalMoney = 0;
                updateTotalMoney();
            });
        }
    });
});