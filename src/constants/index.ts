type Road = {
    id: string
    ruas: string
    lokasi: string
    foto: string
    dokumen: string
    unit: string
    status: boolean
  }

export const roads: Road[] = [
    {
        id: "1",
        ruas: "Ruas 1",
        lokasi: "2+200 s/d 22+200",
        foto: "https://picsum.photos/500/300",
        dokumen: "https://picsum.photos/500/300",
        unit: "Unit Kerja 1",
        status: true
    },
    {
        id: "2",
        ruas: "Ruas 2",
        lokasi: "50+000 s/d 60+000",
        foto: "https://picsum.photos/500/301",
        dokumen: "https://picsum.photos/500/302",
        unit: "Unit Kerja 2",
        status: false
    },
    {
        id: "3",
        ruas:"Ruas 3",
        lokasi: "100+300 s/d 150+000",
        foto: "https://picsum.photos/500/303",
        dokumen: "https://picsum.photos/200/303",
        unit: "Unit Kerja 3",
        status: true
    },
];