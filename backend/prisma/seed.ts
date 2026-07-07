import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.trackRecord.deleteMany();
  await prisma.agency.deleteMany();
  await prisma.sale.deleteMany();

  await prisma.sale.create({
    data: {
      name: 'Nguyen Minh Anh',
      phone: '0901000001',
      email: 'minhanh@saletrack.ai',
      status: 'ACTIVE',
      agencies: {
        create: [
          {
            name: 'Dai ly Phu Nhuan',
            address: '25 Nguyen Van Troi, Phu Nhuan, TP.HCM',
            area: 'TP.HCM',
            trackRecords: {
              create: [
                {
                  customerName: 'Cong ty Minh Long',
                  expectedRevenue: 45000000,
                  status: 'NEW',
                  note: 'Khach hang moi tu kenh Facebook.',
                },
                {
                  customerName: 'Cua hang Gia Bao',
                  expectedRevenue: 28000000,
                  status: 'CONTACTED',
                  note: 'Da goi lan 1, hen gui bao gia.',
                },
              ],
            },
          },
          {
            name: 'Dai ly Thu Duc',
            address: '112 Vo Van Ngan, Thu Duc, TP.HCM',
            area: 'TP.HCM',
            trackRecords: {
              create: [
                {
                  customerName: 'Nha phan phoi Sao Viet',
                  expectedRevenue: 78000000,
                  status: 'POTENTIAL',
                  note: 'Quan tam goi hop dong quy.',
                },
                {
                  customerName: 'Shop An Tam',
                  expectedRevenue: 16000000,
                  status: 'LOST',
                  note: 'Khach chon nha cung cap khac.',
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.sale.create({
    data: {
      name: 'Tran Quoc Bao',
      phone: '0901000002',
      email: 'quocbao@saletrack.ai',
      status: 'ACTIVE',
      agencies: {
        create: [
          {
            name: 'Dai ly Hai Chau',
            address: '68 Bach Dang, Hai Chau, Da Nang',
            area: 'Da Nang',
            trackRecords: {
              create: [
                {
                  customerName: 'Cong ty Bien Xanh',
                  expectedRevenue: 62000000,
                  status: 'CLOSED',
                  note: 'Da chot hop dong thang dau.',
                },
                {
                  customerName: 'Sieu thi Mini Hoa Binh',
                  expectedRevenue: 35000000,
                  status: 'CONTACTED',
                  note: 'Can demo san pham trong tuan.',
                },
              ],
            },
          },
          {
            name: 'Dai ly Cam Le',
            address: '19 Ong Ich Duong, Cam Le, Da Nang',
            area: 'Da Nang',
            trackRecords: {
              create: [
                {
                  customerName: 'Ho kinh doanh Tan Phat',
                  expectedRevenue: 22000000,
                  status: 'NEW',
                  note: 'Can xac minh nhu cau.',
                },
                {
                  customerName: 'Cong ty Van Tai Song Han',
                  expectedRevenue: 51000000,
                  status: 'POTENTIAL',
                  note: 'Dang so sanh 2 goi dich vu.',
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.sale.create({
    data: {
      name: 'Le Hoang Linh',
      phone: '0901000003',
      email: 'hoanglinh@saletrack.ai',
      status: 'INACTIVE',
      agencies: {
        create: [
          {
            name: 'Dai ly Cau Giay',
            address: '88 Duy Tan, Cau Giay, Ha Noi',
            area: 'Ha Noi',
            trackRecords: {
              create: [
                {
                  customerName: 'Cong ty Bach Khoa',
                  expectedRevenue: 89000000,
                  status: 'CLOSED',
                  note: 'Da thanh toan dot 1.',
                },
                {
                  customerName: 'Trung tam Anh Ngu Sunrise',
                  expectedRevenue: 31000000,
                  status: 'CONTACTED',
                  note: 'Hen gap truc tiep vao thu sau.',
                },
              ],
            },
          },
        ],
      },
    },
  });

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
