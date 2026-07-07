import { PrismaClient, type SaleStatus, type TrackStatus } from '@prisma/client';

const prisma = new PrismaClient();

const sales: Array<{
  email: string;
  name: string;
  phone: string;
  status: SaleStatus;
}> = [
  { name: 'Nguyễn Minh Anh', phone: '0901000001', email: 'minhanh@saletrack.ai', status: 'ACTIVE' },
  { name: 'Trần Quốc Bảo', phone: '0901000002', email: 'quocbao@saletrack.ai', status: 'ACTIVE' },
  { name: 'Lê Hoàng Linh', phone: '0901000003', email: 'hoanglinh@saletrack.ai', status: 'ACTIVE' },
  { name: 'Phạm Thu Hà', phone: '0901000004', email: 'thuha@saletrack.ai', status: 'ACTIVE' },
  { name: 'Võ Đức Huy', phone: '0901000005', email: 'duchuy@saletrack.ai', status: 'ACTIVE' },
  { name: 'Đặng Ngọc Mai', phone: '0901000006', email: 'ngocmai@saletrack.ai', status: 'ACTIVE' },
  { name: 'Bùi Gia Khánh', phone: '0901000007', email: 'giakhanh@saletrack.ai', status: 'ACTIVE' },
  { name: 'Hoàng Thanh Tú', phone: '0901000008', email: 'thanhtu@saletrack.ai', status: 'ACTIVE' },
  { name: 'Đỗ Hải Yến', phone: '0901000009', email: 'haiyen@saletrack.ai', status: 'ACTIVE' },
  { name: 'Ngô Nhật Nam', phone: '0901000010', email: 'nhatnam@saletrack.ai', status: 'ACTIVE' },
  { name: 'Tạ Phương Nhi', phone: '0901000011', email: 'phuongnhi@saletrack.ai', status: 'INACTIVE' },
  { name: 'Cao Việt Long', phone: '0901000012', email: 'vietlong@saletrack.ai', status: 'INACTIVE' },
];

const agencies = [
  ['Đại lý Minh Phát Sài Gòn', '25 Nguyễn Văn Trỗi, Phú Nhuận, TP.HCM', 'TP.HCM'],
  ['Đại lý An Khang Thủ Đức', '112 Võ Văn Ngân, Thủ Đức, TP.HCM', 'TP.HCM'],
  ['Đại lý Gia Định', '48 Lê Quang Định, Bình Thạnh, TP.HCM', 'TP.HCM'],
  ['Đại lý Bình Tây', '19 Hậu Giang, Quận 6, TP.HCM', 'TP.HCM'],
  ['Đại lý Cầu Giấy', '88 Duy Tân, Cầu Giấy, Hà Nội', 'Hà Nội'],
  ['Đại lý Hoàn Kiếm', '12 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội', 'Hà Nội'],
  ['Đại lý Long Biên', '45 Nguyễn Văn Cừ, Long Biên, Hà Nội', 'Hà Nội'],
  ['Đại lý Hà Đông', '77 Quang Trung, Hà Đông, Hà Nội', 'Hà Nội'],
  ['Đại lý Hải Châu', '68 Bạch Đằng, Hải Châu, Đà Nẵng', 'Đà Nẵng'],
  ['Đại lý Cẩm Lệ', '19 Ông Ích Đường, Cẩm Lệ, Đà Nẵng', 'Đà Nẵng'],
  ['Đại lý Sơn Trà', '34 Ngô Quyền, Sơn Trà, Đà Nẵng', 'Đà Nẵng'],
  ['Đại lý Ninh Kiều', '15 Nguyễn Trãi, Ninh Kiều, Cần Thơ', 'Cần Thơ'],
  ['Đại lý Cái Răng', '90 Võ Nguyên Giáp, Cái Răng, Cần Thơ', 'Cần Thơ'],
  ['Đại lý Lê Chân', '51 Tô Hiệu, Lê Chân, Hải Phòng', 'Hải Phòng'],
  ['Đại lý Hồng Bàng', '28 Trần Hưng Đạo, Hồng Bàng, Hải Phòng', 'Hải Phòng'],
  ['Đại lý Biên Hòa', '101 Đồng Khởi, Biên Hòa, Đồng Nai', 'Đồng Nai'],
  ['Đại lý Long Khánh', '22 Hùng Vương, Long Khánh, Đồng Nai', 'Đồng Nai'],
  ['Đại lý Thủ Dầu Một', '36 Cách Mạng Tháng Tám, Thủ Dầu Một, Bình Dương', 'Bình Dương'],
  ['Đại lý Dĩ An', '59 Nguyễn An Ninh, Dĩ An, Bình Dương', 'Bình Dương'],
  ['Đại lý Vũng Tàu', '74 Lê Hồng Phong, Vũng Tàu, Bà Rịa - Vũng Tàu', 'Bà Rịa - Vũng Tàu'],
  ['Đại lý Bà Rịa', '31 Nguyễn Hữu Thọ, Bà Rịa, Bà Rịa - Vũng Tàu', 'Bà Rịa - Vũng Tàu'],
  ['Đại lý Quy Nhơn', '17 Nguyễn Tất Thành, Quy Nhơn, Bình Định', 'Bình Định'],
  ['Đại lý Nha Trang', '85 Trần Phú, Nha Trang, Khánh Hòa', 'Khánh Hòa'],
  ['Đại lý Cam Ranh', '42 Nguyễn Thái Học, Cam Ranh, Khánh Hòa', 'Khánh Hòa'],
  ['Đại lý Đà Lạt', '16 Phan Đình Phùng, Đà Lạt, Lâm Đồng', 'Lâm Đồng'],
  ['Đại lý Bảo Lộc', '63 Trần Phú, Bảo Lộc, Lâm Đồng', 'Lâm Đồng'],
  ['Đại lý Huế', '29 Hùng Vương, TP. Huế, Thừa Thiên Huế', 'Thừa Thiên Huế'],
  ['Đại lý Đông Hà', '73 Lê Duẩn, Đông Hà, Quảng Trị', 'Quảng Trị'],
  ['Đại lý Vinh', '66 Lê Lợi, Vinh, Nghệ An', 'Nghệ An'],
  ['Đại lý Thanh Hóa', '91 Đại lộ Lê Lợi, Thanh Hóa', 'Thanh Hóa'],
  ['Đại lý Hạ Long', '24 Trần Quốc Nghiễn, Hạ Long, Quảng Ninh', 'Quảng Ninh'],
  ['Đại lý Móng Cái', '10 Hùng Vương, Móng Cái, Quảng Ninh', 'Quảng Ninh'],
  ['Đại lý Việt Trì', '37 Nguyễn Tất Thành, Việt Trì, Phú Thọ', 'Phú Thọ'],
  ['Đại lý Thái Nguyên', '58 Hoàng Văn Thụ, Thái Nguyên', 'Thái Nguyên'],
  ['Đại lý Bắc Ninh', '21 Lý Thái Tổ, Bắc Ninh', 'Bắc Ninh'],
  ['Đại lý Nam Định', '44 Trần Hưng Đạo, Nam Định', 'Nam Định'],
  ['Đại lý Buôn Ma Thuột', '70 Lê Duẩn, Buôn Ma Thuột, Đắk Lắk', 'Đắk Lắk'],
  ['Đại lý Pleiku', '35 Phan Đình Phùng, Pleiku, Gia Lai', 'Gia Lai'],
  ['Đại lý Rạch Giá', '11 Trần Phú, Rạch Giá, Kiên Giang', 'Kiên Giang'],
  ['Đại lý Phú Quốc', '52 Nguyễn Trung Trực, Phú Quốc, Kiên Giang', 'Kiên Giang'],
  ['Đại lý Mỹ Tho', '47 Ấp Bắc, Mỹ Tho, Tiền Giang', 'Tiền Giang'],
  ['Đại lý Bến Tre', '39 Đồng Khởi, Bến Tre', 'Bến Tre'],
] as const;

const customers = [
  'Công ty TNHH Sao Việt',
  'Cửa hàng Gia Bảo',
  'Nhà phân phối An Tâm',
  'Siêu thị Mini Hòa Bình',
  'Công ty Vận tải Sông Hàn',
  'Chuỗi bán lẻ Phúc An',
  'Hộ kinh doanh Tân Phát',
  'Công ty Thương mại Việt Hưng',
  'Trung tâm Anh ngữ Sunrise',
  'Công ty Nội thất Mộc Việt',
  'Nhà thuốc Minh Châu',
  'Cửa hàng điện máy Hưng Thịnh',
  'Công ty May An Phước',
  'Đại lý vật tư Hoàng Gia',
  'Công ty Logistics Nam Việt',
  'Cửa hàng mẹ và bé Sen Hồng',
  'Công ty Nông sản Mekong',
  'Quán cà phê Làng Việt',
  'Khách sạn Biển Xanh',
  'Công ty Dịch vụ Hoa Sen',
];

const statuses: TrackStatus[] = ['NEW', 'CONTACTED', 'POTENTIAL', 'CLOSED', 'LOST'];

const notes: Record<TrackStatus, string> = {
  NEW: 'Lead mới, cần xác minh nhu cầu và người phụ trách.',
  CONTACTED: 'Đã liên hệ lần đầu, khách hàng hẹn trao đổi thêm.',
  POTENTIAL: 'Khách quan tâm, có khả năng chốt trong kỳ này.',
  CLOSED: 'Đã chốt đơn và chuyển thông tin triển khai.',
  LOST: 'Khách tạm dừng vì ngân sách hoặc chọn nhà cung cấp khác.',
};

function revenueFor(agencyIndex: number, recordIndex: number) {
  return 8000000 + ((agencyIndex * 7 + recordIndex * 5) % 28) * 3500000;
}

async function main() {
  await prisma.trackRecord.deleteMany();
  await prisma.agency.deleteMany();
  await prisma.sale.deleteMany();

  const createdSales = [];
  for (const sale of sales) {
    createdSales.push(await prisma.sale.create({ data: sale }));
  }

  const createdAgencies = [];
  for (const [index, agency] of agencies.entries()) {
    createdAgencies.push(
      await prisma.agency.create({
        data: {
          name: agency[0],
          address: agency[1],
          area: agency[2],
          saleId: createdSales[index % createdSales.length].id,
        },
      }),
    );
  }

  for (const [agencyIndex, agency] of createdAgencies.entries()) {
    const records = Array.from({ length: 5 }, (_, recordIndex) => {
      const status = statuses[(agencyIndex + recordIndex) % statuses.length];
      const customer = customers[(agencyIndex * 2 + recordIndex) % customers.length];

      return {
        customerName: `${customer} ${String(agencyIndex + 1).padStart(2, '0')}-${recordIndex + 1}`,
        expectedRevenue: revenueFor(agencyIndex, recordIndex),
        status,
        note: notes[status],
        agencyId: agency.id,
      };
    });

    await prisma.trackRecord.createMany({ data: records });
  }

  const [saleCount, agencyCount, trackRecordCount] = await Promise.all([
    prisma.sale.count(),
    prisma.agency.count(),
    prisma.trackRecord.count(),
  ]);

  console.log(`Seed completed: ${saleCount} sales, ${agencyCount} agencies, ${trackRecordCount} track records.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
