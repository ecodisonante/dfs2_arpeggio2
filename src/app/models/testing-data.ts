import { Category } from "./category.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export abstract class TestingData {

    public static categoryList = [
        new Category(1, "Guitarras Acúsicas"),
        new Category(2, "Guitarras Eléctricas"),
        new Category(3, "Guitarras Electroacústicas"),
    ];


    public static productList = [
        new Product(180442, "Guitarra acústica Vizcaya ARCG44 - Black", "Vizcaya", this.categoryList[0], 59990, 10, false, 0, true, "/images/gtrs/180442.jpg"),
        new Product(180447, "Guitarra acústica Vizcaya ARCG34 3/4 - Natural", "Vizcaya", this.categoryList[0], 54990, 10, true, 40990, true, "/images/gtrs/180447.jpg"),
        new Product(180467, "Guitarra acústica Vizcaya ARCG44 - Sunburst", "Vizcaya", this.categoryList[0], 59990, 10, true, 49990, true, "/images/gtrs/180467.jpg"),
        new Product(180477, "Guitarra acústica Vizcaya ARCG34 - cuerdas de nylon", "Vizcaya", this.categoryList[0], 54990, 10, false, 0, true, "/images/gtrs/180477.jpg"),
        new Product(174782, "Guitarra acústica Vizcaya con cuerdas de nylon ARCG39-RB", "Vizcaya", this.categoryList[0], 69990, 10, false, 0, true, "/images/gtrs/174782.jpg"),
        new Product(175590, "Guitarra clásica Takamine GC1 - color natural (NAT)", "Takamine", this.categoryList[0], 234990, 10, false, 0, true, "/images/gtrs/175590.jpg"),
        new Product(180432, "Guitarra acústica Vizcaya Castilla - Natural", "Vizcaya", this.categoryList[0], 59990, 10, true, 54990, true, "/images/gtrs/180432.jpg"),
        new Product(173677, "Guitarra acústica Vizcaya ARCG44 - Dark Blue Sunburst", "Vizcaya", this.categoryList[0], 59990, 10, false, 0, true, "/images/gtrs/173677.jpg"),
        new Product(175899, "Guitarra clásica Vizcaya ARCG39 color sunburst (SB)", "Vizcaya", this.categoryList[0], 69990, 10, false, 0, true, "/images/gtrs/175899.jpg"),
        new Product(180437, "Guitarra acústica Vizcaya ARCG44 - Natural", "Vizcaya", this.categoryList[0], 59990, 10, false, 0, true, "/images/gtrs/180437.jpg"),
        new Product(167776, "Guitarra acústica Vizcaya ARCG44 - Dark Red Sunburst", "Vizcaya", this.categoryList[0], 59990, 10, false, 0, true, "/images/gtrs/167776.jpg"),
        new Product(189719, "Pack de guitarra acústica Admira Alba Nylon", "Admira", this.categoryList[0], 179900, 10, true, 152990, true, "/images/gtrs/189719.jpg"),
        new Product(189710, "Guitarra acústica Admira Malaga Nylon", "Admira", this.categoryList[0], 299990, 10, false, 0, true, "/images/gtrs/189710.jpg"),
        new Product(189709, "Guitarra acústica Admira Luna Nylon", "Admira", this.categoryList[0], 239990, 10, false, 0, true, "/images/gtrs/189709.jpg"),
        new Product(189708, "Guitarra acústica Admira Juanita Nylon", "Admira", this.categoryList[0], 219990, 10, false, 0, true, "/images/gtrs/189708.jpg"),
        new Product(189711, "Guitarra acústica Admira Paloma Nylon", "Admira", this.categoryList[0], 199990, 10, false, 0, true, "/images/gtrs/189711.jpg"),
        new Product(189343, "Guitarra acústica Vizcaya FC-36 3/4 - Natural", "Vizcaya", this.categoryList[0], 59990, 10, false, 0, true, "/images/gtrs/189343.jpg"),
        new Product(189346, "Guitarra acústica Vizcaya FC-39 con cutaway 4/4 - Natural", "Vizcaya", this.categoryList[0], 69990, 10, false, 0, true, "/images/gtrs/189346.jpg"),
        new Product(189345, "Guitarra acústica Vizcaya FC39 4/4 con Funda - Natural", "Vizcaya", this.categoryList[0], 69900, 10, false, 0, true, "/images/gtrs/189345.jpg"),
        new Product(167408, "Guitarra acústica Ibanez GA3 - Ámbar", "Ibanez", this.categoryList[0], 169900, 10, false, 0, true, "/images/gtrs/167408.jpg"),
        new Product(167774, "Guitarra clásica Vizcaya ARCG34 3/4 - color violeta", "Vizcaya", this.categoryList[0], 54990, 10, false, 0, true, "/images/gtrs/167774.jpg"),
        new Product(180482, "Guitarra acústica Vizcaya ARCG34 3/4 - Dark Blue Sunburst", "Vizcaya", this.categoryList[0], 54990, 10, false, 0, true, "/images/gtrs/180482.jpg"),
        new Product(189707, "Guitarra acústica Admira A6 Nylon", "Admira", this.categoryList[0], 524990, 10, false, 0, true, "/images/gtrs/189707.jpg"),
        new Product(189706, "Guitarra acústica Admira A1 Nylon", "Admira", this.categoryList[0], 369990, 10, false, 0, true, "/images/gtrs/189706.jpg"),
        new Product(182704, "Guitarra acústica Takamine folk GD11M-NS - color natural", "Takamine", this.categoryList[0], 229900, 10, false, 0, true, "/images/gtrs/182704.jpg"),

        new Product(178528, "Guitarra eléctroacústica Ibanez GA3ECE - Amber", "Ibanez", this.categoryList[1], 209900, 10, false, 0, true, "/images/gtrs/178528.jpg"),
        new Product(176936, "Guitarra eléctroacústica Takamine Folk GLD12E NS - Madera Clara", "Takamine", this.categoryList[1], 349900, 10, false, 0, true, "/images/gtrs/176936.jpg"),
        new Product(176930, "Guitarra eléctroacústica Takamine Folk GLN11E NS - Caoba", "Takamine", this.categoryList[1], 349900, 10, false, 0, true, "/images/gtrs/176930.jpg"),
        new Product(178774, "Guitarra eléctroacústica Ibanez AAD50CE - Gloss Natural Low", "Ibanez", this.categoryList[1], 319990, 10, false, 0, true, "/images/gtrs/178774.jpg"),
        new Product(167741, "Guitarra electroacústica Takamine GC1CE - con cutaway - color natural (NAT)", "Takamine", this.categoryList[1], 339900, 10, false, 0, true, "/images/gtrs/167741.jpg"),
        new Product(169139, "Guitarra eléctroacústica Ibanez TCY10E - Black", "Ibanez", this.categoryList[1], 279990, 10, false, 0, true, "/images/gtrs/169139.jpg"),
        new Product(169141, "Guitarra electroacústica Ibanez GA5TCE - color amber (AM)", "Ibanez", this.categoryList[1], 319900, 10, false, 0, true, "/images/gtrs/169141.jpg"),
        new Product(167743, "Guitarra electroacústica Takamine GC3CE-NAT - con cutaway - color natural (NAT)", "Takamine", this.categoryList[1], 439990, 10, false, 0, true, "/images/gtrs/167743.jpg"),
        new Product(176652, "Guitarra Eléctroacustica PRS SE Parlour P20 - Negro", "Prs", this.categoryList[1], 669900, 10, true, 534990, true, "/images/gtrs/176652.jpg"),
        new Product(177025, "Guitarra eléctroacústica Takamine Folk GLD11E NS - Caoba", "Takamine", this.categoryList[1], 349900, 10, false, 0, true, "/images/gtrs/177025.jpg"),
        new Product(176943, "Guitarra eléctroacústica Takamine Folk GLN12E NS - Madera Clara", "Takamine", this.categoryList[1], 349900, 10, false, 0, true, "/images/gtrs/176943.jpg"),
        new Product(174554, "Pack de guitarra eléctroacústica Freeman Classic EAGLE - Natural", "Freeman", this.categoryList[1], 199990, 10, false, 0, true, "/images/gtrs/174554.jpg"),
        new Product(169656, "Guitarra electroacústica Takamine GD30CE-12 - con cutaway - 12 cuerdas - color negro", "Takamine", this.categoryList[1], 479900, 10, false, 0, true, "/images/gtrs/169656.jpg"),
        new Product(169687, "Guitarra electroacústica Takamine folk GD51CE - color brown sunburst gloss (BSB)", "Takamine", this.categoryList[1], 469900, 10, false, 0, true, "/images/gtrs/169687.jpg"),
        new Product(169705, "Guitarra electroacústica Takamine GN93CE - color natural", "Takamine", this.categoryList[1], 639900, 10, false, 0, true, "/images/gtrs/169705.jpg"),
        new Product(169704, "Guitarra electroacústica Takamine GN75CE - color wine red", "Takamine", this.categoryList[1], 629900, 10, false, 0, true, "/images/gtrs/169704.jpg"),
        new Product(169706, "Guitarra eléctroacústica Takamine GY93E - Natural", "Takamine", this.categoryList[1], 629900, 10, false, 0, true, "/images/gtrs/169706.jpg"),
        new Product(181427, "Guitarra eléctroacústica Freeman FRCG44CEQ - Natural", "Freeman", this.categoryList[1], 99990, 10, true, 79990, true, "/images/gtrs/181427.jpg"),
        new Product(167648, "Pack de guitarra electroacústica Freeman FRCG44EQ - Natural", "Freeman", this.categoryList[1], 199900, 10, true, 159990, true, "/images/gtrs/167648.jpg"),
        new Product(173004, "Guitarra eléctroacústica Ibanez TCM50 - Vintage Brown Sunburst", "Ibanez", this.categoryList[1], 299990, 10, false, 0, true, "/images/gtrs/173004.jpg"),
        new Product(169707, "Guitarra electroacústica Takamine GX18CENS Taka-Mini 3/4 - incluye funda", "Takamine", this.categoryList[1], 399900, 10, false, 0, true, "/images/gtrs/169707.jpg"),
        new Product(167464, "Guitarra electroacústica Freeman FRCG44CEQ - Black", "Freeman", this.categoryList[1], 99990, 10, false, 0, true, "/images/gtrs/167464.jpg"),
        new Product(176204, "Guitarra eléctroacústica Ibanez AEG50N - Black", "Ibanez", this.categoryList[1], 299900, 10, false, 0, true, "/images/gtrs/176204.jpg"),
        new Product(177228, "Guitarra electroacústica Takamine GX11ME-NS NEX - color natural", "Takamine", this.categoryList[1], 379900, 10, false, 0, true, "/images/gtrs/177228.jpg"),

        new Product(179630, "Guitarra eléctrica Gibson Les Paul Standard '50s - Tobacco Burst", "Gibson", this.categoryList[2], 3499900, 10, false, 0, true, "/images/gtrs/179630.jpg"),
        new Product(177446, "Guitarra eléctrica Ibanez SA260FM - Violin Sunburst", "Ibanez", this.categoryList[2], 399900, 10, false, 0, true, "/images/gtrs/177446.jpg"),
        new Product(181605, "Guitarra eléctrica Gibson Les Paul Classic Heritage Cherry Sunburst", "Gibson", this.categoryList[2], 3228990, 10, true, 2999900, true, "/images/gtrs/181605.jpg"),
        new Product(179589, "Guitarra eléctrica Gibson Les Paul Studio - Wine Red", "Gibson", this.categoryList[2], 2199900, 10, false, 0, true, "/images/gtrs/179589.jpg"),
        new Product(167426, "Guitarra eléctrica Ibanez RG350DXZ - White", "Ibanez", this.categoryList[2], 599900, 10, false, 0, true, "/images/gtrs/167426.jpg"),
        new Product(169167, "Guitarra eléctrica Ibanez SA260FM - Transparent Gray Burst", "Ibanez", this.categoryList[2], 399900, 10, false, 0, true, "/images/gtrs/169167.jpg"),
        new Product(169287, "Guitarra eléctrica Ibanez AZES40 - Black", "Ibanez", this.categoryList[2], 329900, 10, false, 0, true, "/images/gtrs/169287.jpg"),
        new Product(176132, "Guitarra eléctrica Ibanez AZES31 - Vermilion", "Ibanez", this.categoryList[2], 319900, 10, false, 0, true, "/images/gtrs/176132.jpg"),
        new Product(172982, "Pack de guitarra eléctrica LTD EC-10 - Blue", "Ltd", this.categoryList[2], 349900, 10, false, 0, true, "/images/gtrs/172982.jpg"),
        new Product(169313, "Guitarra eléctrica Ibanez AZES40 - Purist Blue", "Ibanez", this.categoryList[2], 329900, 10, false, 0, true, "/images/gtrs/169313.jpg"),
        new Product(180183, "Guitarra eléctrica Ibanez JEMJR Signature Steve Vai - White", "Ibanez", this.categoryList[2], 499900, 10, false, 0, true, "/images/gtrs/180183.jpg"),
        new Product(169392, "Guitarra eléctrica Ltd EC1000 (LEC1000) SD color amber sunburst (ASB)", "Ltd", this.categoryList[2], 1239990, 10, false, 0, true, "/images/gtrs/169392.jpg"),
        new Product(176185, "Guitarra eléctrica LTD EC401- Black", "Ltd", this.categoryList[2], 999990, 10, false, 0, true, "/images/gtrs/176185.jpg"),
        new Product(167724, "Guitarra eléctrica LTD EC401 - Olympic White", "Ltd", this.categoryList[2], 999900, 10, false, 0, true, "/images/gtrs/167724.jpg"),
        new Product(181613, "Guitarra eléctrica Gibson Les Paul Tribute Satin Tobacco Burst", "Gibson", this.categoryList[2], 1699900, 10, false, 0, true, "/images/gtrs/181613.jpg"),
        new Product(175752, "Pack de guitarra eléctrica Freeman Full Rock Stratocaster - Black", "Freeman", this.categoryList[2], 199900, 10, true, 179900, true, "/images/gtrs/175752.jpg"),
        new Product(176177, "Guitarra eléctrica LTD EC256 - Black Satin", "Ltd", this.categoryList[2], 549900, 10, false, 0, true, "/images/gtrs/176177.jpg"),
        new Product(177178, "Guitarra eléctrica Ibanez GRG170DX - Black Night", "Ibanez", this.categoryList[2], 289990, 10, false, 0, true, "/images/gtrs/177178.jpg"),
        new Product(176173, "Guitarra eléctrica Ltd EC256 - color See Thru Purple Sunburst", "Ltd", this.categoryList[2], 579900, 10, true, 549900, true, "/images/gtrs/176173.jpg"),
        new Product(182969, "Guitarra eléctrica Ltd EC-256 - color black", "Ltd", this.categoryList[2], 579900, 10, false, 0, true, "/images/gtrs/182969.jpg"),

    ];


    public static userList = [
        new User("admin", "Admin", "", "", "", "admin@email.com", "Secret.123", true, true),
        new User("ecodisonante", "Francisco", "Valdés", "Flores", "Mi casa", "ecodisonante@gmail.com", "Secret.123", true, false),
    ];

}
