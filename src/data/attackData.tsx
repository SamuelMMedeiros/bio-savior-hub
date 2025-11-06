// src/data/attackData.ts

export interface AttackData {
    id: number;
    bairro: string;
    ataques: number;
    lat: number;
    lng: number;
    zoom: number;
    fill: string;
}

export const ATTACK_DATA: AttackData[] = [
    {
        id: 1,
        bairro: "Centro",
        ataques: 12,
        lat: -18.59,
        lng: -46.516,
        zoom: 14,
        fill: "#4f46e5",
    },
    {
        id: 2,
        bairro: "Alto Caiçaras",
        ataques: 10,
        lat: -18.5905,
        lng: -46.505,
        zoom: 15,
        fill: "#4f46e5",
    },
    {
        id: 3,
        bairro: "Caiçaras",
        ataques: 9,
        lat: -18.58,
        lng: -46.52,
        zoom: 14,
        fill: "#4f46e5",
    },
    {
        id: 4,
        bairro: "Lagoinha",
        ataques: 3,
        lat: -18.58,
        lng: -46.508,
        zoom: 15,
        fill: "#4f46e5",
    },
    {
        id: 5,
        bairro: "Vila Nova",
        ataques: 3,
        lat: -18.577,
        lng: -46.528,
        zoom: 15,
        fill: "#4f46e5",
    },
    {
        id: 6,
        bairro: "Abner Afonso",
        ataques: 3,
        lat: -18.585,
        lng: -46.535,
        zoom: 15,
        fill: "#4f46e5",
    },
    {
        id: 7,
        bairro: "Santo Antônio",
        ataques: 2,
        lat: -18.575,
        lng: -46.512,
        zoom: 15,
        fill: "#4f46e5",
    },
    {
        id: 8,
        bairro: "Cristo Redentor",
        ataques: 2,
        lat: -18.585,
        lng: -46.51,
        zoom: 15,
        fill: "#4f46e5",
    },
    {
        id: 9,
        bairro: "Nossa Senhora de Fátima",
        ataques: 2,
        lat: -18.573,
        lng: -46.505,
        zoom: 15,
        fill: "#4f46e5",
    },
];

export const CITY_PATOS = {
    lat: -18.5789,
    lng: -46.5178,
    zoom: 13
};
