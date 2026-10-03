let memberCard = "";
let memberRank = "";
let isValidMember = false;
let materialLog = "";

let towelQuantity = 0;
let lockQuantity = 0;

let towelPrice = 20000;
let lockPrice = 15000;
let deposit = 0;

do {
    console.log("\n========================================");
    console.log("       GYM FITNESS - QUẢN LÝ TỦ ĐỒ");
    console.log("========================================");
    console.log("1. Tiếp nhận và xác thực thẻ hội viên");
    console.log("2. Ghi nhận vật tư mượn thêm");
    console.log("3. In phiếu bàn giao");
    console.log("4. Đóng ca và thoát");
    console.log("========================================");

    let choice = prompt("Nhập lựa chọn: ");

    switch (choice) {
        case "1":
            memberCard = prompt("Nhập mã thẻ hội viên: ");

            memberCard = memberCard.trim().toUpperCase();

            if (!memberCard.startsWith("GYM-")) {
                console.log("Thẻ hội viên không hợp lệ!");
                isValidMember = false;
                break;
            }

            let vipIndex = memberCard.indexOf("VIP");
            let standardIndex = memberCard.indexOf("STANDARD");

            if (vipIndex !== -1) {
                memberRank = "VIP";
                isValidMember = true;
            }

            if (standardIndex !== -1) {
                memberRank = "STANDARD";
                isValidMember = true;
            }

            if (!isValidMember) {
                console.log("Không xác định được hạng hội viên!");
                break;
            }

            console.log("\nXÁC THỰC THÀNH CÔNG!");
            console.log("Mã thẻ: " + memberCard);
            console.log("Hạng hội viên: " + memberRank);

            if (memberRank === "VIP") {
                console.log("Khu vực tủ: ZONE-A");
                console.log("Được miễn phí 1 khăn tắm lớn.");
            }

            if (memberRank === "STANDARD") {
                console.log("Khu vực tủ: ZONE-B");
                console.log("Vật tư mượn thêm sẽ tính phí.");
            }

            break;

        case "2":
            if (!isValidMember) {
                console.log(
                    "Vui lòng xác thực thẻ hội viên trước!"
                );
                break;
            }

            materialLog = prompt(
                'Nhập vật tư, ví dụ: "TOWEL:2|LOCK:1"'
            );

            materialLog = materialLog.trim().toUpperCase();

            towelQuantity = 0;
            lockQuantity = 0;

            let data = materialLog;

            while (data.length > 0) {
                let separatorIndex = data.indexOf("|");

                let item = "";

                if (separatorIndex === -1) {
                    item = data;
                    data = "";
                } else {
                    item = data.slice(0, separatorIndex);
                    data = data.slice(separatorIndex + 1);
                }

                let colonIndex = item.indexOf(":");

                if (colonIndex === -1) {
                    console.log("Dữ liệu không hợp lệ: " + item);
                    continue;
                }

                let itemName = item.slice(0, colonIndex);
                let quantity = Number(
                    item.slice(colonIndex + 1)
                );

                if (itemName === "TOWEL") {
                    towelQuantity += quantity;
                }

                if (itemName === "LOCK") {
                    lockQuantity += quantity;
                }
            }

            if (memberRank === "VIP" && towelQuantity > 0) {
                if (towelQuantity >= 1) {
                    towelQuantity = towelQuantity - 1;
                }
            }

            deposit =
                (towelQuantity + lockQuantity) * 50000;

            console.log("\nĐÃ GHI NHẬN VẬT TƯ!");
            console.log("Khăn tắm thêm: " + towelQuantity);
            console.log("Khóa tủ phụ: " + lockQuantity);
            console.log(
                "Tiền đặt cọc: " +
                deposit.toLocaleString("vi-VN") +
                " VNĐ"
            );

            break;

        case "3":
            if (!isValidMember) {
                console.log(
                    "Vui lòng xác thực thẻ hội viên trước!"
                );
                break;
            }

            let towelFee = towelQuantity * towelPrice;
            let lockFee = lockQuantity * lockPrice;
            let totalFee = towelFee + lockFee;

            let lockerZone = "";

            if (memberRank === "VIP") {
                lockerZone = "ZONE-A";
            }

            if (memberRank === "STANDARD") {
                lockerZone = "ZONE-B";
            }

            console.log("\n" + "-".repeat(45));
            console.log("        PHIẾU BÀN GIAO TỦ & VẬT TƯ");
            console.log("-".repeat(45));

            console.log("Mã thẻ:".padEnd(20) + memberCard);
            console.log("Hạng:".padEnd(20) + memberRank);
            console.log("Khu vực tủ:".padEnd(20) + lockerZone);

            console.log("-".repeat(45));

            console.log(
                "Khăn tắm".padEnd(20) +
                towelQuantity.toString().padStart(5) +
                towelFee.toLocaleString("vi-VN").padStart(15)
            );

            console.log(
                "Khóa tủ phụ".padEnd(20) +
                lockQuantity.toString().padStart(5) +
                lockFee.toLocaleString("vi-VN").padStart(15)
            );

            console.log("-".repeat(45));

            console.log(
                "Phụ phí vật tư:".padEnd(25) +
                totalFee.toLocaleString("vi-VN") +
                " VNĐ"
            );

            console.log(
                "Tiền đặt cọc:".padEnd(25) +
                deposit.toLocaleString("vi-VN") +
                " VNĐ"
            );

            console.log("-".repeat(45));

            if (memberRank === "VIP") {
                console.log("VIP: Miễn phí 1 khăn tắm lớn.");
            }

            console.log("Tiền cọc được hoàn lại khi trả vật tư.");
            console.log("-".repeat(45));

            break;

        case "4":
            console.log("\n========================================");
            console.log("        ĐÓNG CA LÀM VIỆC");
            console.log("========================================");
            console.log("Đã kết thúc quản lý tủ đồ và vật tư.");
            console.log("Hẹn gặp lại!");
            console.log("========================================");

            break;

        default:
            console.log(
                "Lựa chọn không hợp lệ! Vui lòng chọn từ 1 đến 4."
            );
    }

} while (choice !== "4");