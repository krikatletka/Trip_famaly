import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoBhC_ZvYRpgKhrOcMzB319Bb3u6AKP5U",
    authDomain: "nice-family-trip.firebaseapp.com",
    projectId: "nice-family-trip",
    storageBucket: "nice-family-trip.firebasestorage.app",
    messagingSenderId: "801930147309",
    appId: "1:801930147309:web:0f1b5ca488546ca84ce3e4",
    measurementId: "G-DPVRW9S3FX"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const tripRef = doc(db, "trips", "nice-family-trip");
const STORAGE_KEY = "nice-family-trip-planner";

const defaultData = {
    selectedDay: "day1",

    days: [
        {
            id: "day1",
            tab: "30 июня",
            title: "День прилёта",
            cards: [
                {
                    id: "arrival",
                    icon: "✈️",
                    title: "Прилёт в Ниццу",
                    time: "16:30",
                    description: "Прилетаем в аэропорт Nice Côte d’Azur, забираем багаж и выходим к транспорту.",
                    done: false
                },
                {
                    id: "tram",
                    icon: "🚋",
                    title: "Трамвай L2 до отеля",
                    time: "17:15",
                    description: "Едем на Tram L2 от аэропорта в сторону города. Адрес отеля: 161 Promenade des Anglais.",
                    done: false
                },
                {
                    id: "checkin",
                    icon: "🏨",
                    title: "Заселение",
                    time: "17:45",
                    description: "Заселяемся, оставляем вещи, немного отдыхаем.",
                    done: false
                },
                {
                    id: "shop",
                    icon: "🛒",
                    title: "Магазин",
                    time: "18:30",
                    description: "Купить воду, еду, снеки, шампунь и всё необходимое.",
                    done: false
                },
                {
                    id: "dinner",
                    icon: "🍽️",
                    title: "Ужин",
                    time: "20:00",
                    description: "Ресторан пока под вопросом. Нужно выбрать и забронировать.",
                    done: false
                },
                {
                    id: "walk",
                    icon: "🌅",
                    title: "Прогулка по морю",
                    time: "21:30",
                    description: "Гуляем по Promenade des Anglais, пляж, закат, фотографии.",
                    done: false
                }
            ]
        },
        {
            id: "day2",
            tab: "1 июля",
            title: "Пляж и Старый город",
            cards: [
                {
                    id: "beach1",
                    icon: "🏖️",
                    title: "Утренний пляж",
                    time: "08:30",
                    description: "Купаемся утром, пока не слишком жарко. Взять SPF, полотенце и воду.",
                    done: false
                },
                {
                    id: "breakfast1",
                    icon: "☕",
                    title: "Завтрак / кафе",
                    time: "10:30",
                    description: "Выбрать красивое кафе рядом с морем или по дороге.",
                    done: false
                },
                {
                    id: "plongeoir",
                    icon: "📍",
                    title: "Le Plongeoir",
                    time: "12:00",
                    description: "Красивое место у моря. Можно пообедать или просто посмотреть и сделать фото.",
                    done: false
                },
                {
                    id: "rest",
                    icon: "❄️",
                    title: "Отдых в жару",
                    time: "14:00",
                    description: "В самое жаркое время лучше не ходить по солнцу. Отдохнуть, зайти в кафе или вернуться в отель.",
                    done: false
                },
                {
                    id: "oldtown",
                    icon: "🏛️",
                    title: "Старый город",
                    time: "17:00",
                    description: "Vieux Nice, Cours Saleya, Place Masséna, красивые улочки и фото.",
                    done: false
                },
                {
                    id: "dinner2",
                    icon: "🍽️",
                    title: "Ужин",
                    time: "20:30",
                    description: "Ресторан нужно выбрать. Лучше обычная одежда, без строгого дресс-кода.",
                    done: false
                }
            ]
        },
        {
            id: "day3",
            tab: "2 июля",
            title: "Монако",
            cards: [
                {
                    id: "train-monaco",
                    icon: "🚆",
                    title: "Поездка в Монако",
                    time: "09:30",
                    description: "Выезд утром. Нужно уточнить транспорт и время.",
                    done: false
                },
                {
                    id: "casino",
                    icon: "🎰",
                    title: "Казино Монте-Карло",
                    time: "11:00",
                    description: "Посмотреть красивую площадь, сделать фото, прогуляться рядом.",
                    done: false
                },
                {
                    id: "port",
                    icon: "🛥️",
                    title: "Порт Hercules",
                    time: "12:30",
                    description: "Прогулка у яхт, красивые виды и фото.",
                    done: false
                },
                {
                    id: "lunch-monaco",
                    icon: "🍽️",
                    title: "Обед",
                    time: "13:30",
                    description: "Ресторан под вопросом. Нужно выбрать место.",
                    done: false
                },
                {
                    id: "shopping-monaco",
                    icon: "🛍️",
                    title: "Шопинг",
                    time: "15:30",
                    description: "Магазины одежды. Нужно решить, где именно.",
                    done: false
                },
                {
                    id: "back-nice",
                    icon: "🌙",
                    title: "Возвращение в Ниццу",
                    time: "19:00",
                    description: "Время возвращения нужно обсудить.",
                    done: false
                }
            ]
        },
        {
            id: "day4",
            tab: "3 июля",
            title: "Пляж, шопинг и отдых",
            cards: [
                {
                    id: "beach3",
                    icon: "🏖️",
                    title: "Пляж утром",
                    time: "09:00",
                    description: "Море, отдых, спокойное утро.",
                    done: false
                },
                {
                    id: "shopping-nice",
                    icon: "🛍️",
                    title: "Шопинг в Ницце",
                    time: "12:00",
                    description: "Nice Étoile, Galeries Lafayette, Avenue Jean Médecin или CAP3000.",
                    done: false
                },
                {
                    id: "lunch3",
                    icon: "🍽️",
                    title: "Обед",
                    time: "14:00",
                    description: "Выбрать кафе или ресторан.",
                    done: false
                },
                {
                    id: "free-time",
                    icon: "✨",
                    title: "Свободное время",
                    time: "16:00",
                    description: "Можно добавить достопримечательность, кафе, прогулку или морскую активность.",
                    done: false
                },
                {
                    id: "sunset3",
                    icon: "🌅",
                    title: "Закат и прогулка",
                    time: "20:30",
                    description: "Прогулка вдоль моря, фото, спокойный вечер.",
                    done: false
                }
            ]
        },
        {
            id: "day5",
            tab: "4 июля",
            title: "День отъезда",
            cards: [
                {
                    id: "breakfast-last",
                    icon: "☕",
                    title: "Завтрак",
                    time: "09:00",
                    description: "Последнее утро в Ницце.",
                    done: false
                },
                {
                    id: "last-walk",
                    icon: "🌊",
                    title: "Последняя прогулка у моря",
                    time: "10:00",
                    description: "Если будет время — пройтись по Promenade des Anglais.",
                    done: false
                },
                {
                    id: "packing",
                    icon: "🎒",
                    title: "Собрать вещи",
                    time: "11:00",
                    description: "Проверить документы, зарядки, косметику, покупки.",
                    done: false
                },
                {
                    id: "airport",
                    icon: "✈️",
                    title: "Поездка в аэропорт",
                    time: "12:00",
                    description: "Транспорт и точное время нужно уточнить.",
                    done: false
                }
            ]
        }
    ]
};

let data = structuredClone(defaultData);
let currentDayId = data.selectedDay;
let editingCardId = null;
let draggedCardId = null;

const tabs = document.getElementById("tabs");
const board = document.getElementById("board");
const dayTitle = document.getElementById("dayTitle");
const addCardBtn = document.getElementById("addCardBtn");

const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalTime = document.getElementById("modalTime");
const modalDescription = document.getElementById("modalDescription");
const modalLink = document.getElementById("modalLink");
const modalDone = document.getElementById("modalDone");
const saveCard = document.getElementById("saveCard");
const deleteCard = document.getElementById("deleteCard");

async function loadData() {
    const savedLocal = localStorage.getItem(STORAGE_KEY);

    try {
        const snapshot = await getDoc(tripRef);

        if (snapshot.exists()) {
            return snapshot.data();
        }

        await setDoc(tripRef, defaultData);
        return structuredClone(defaultData);
    } catch (error) {
        console.error("Firebase load error:", error);

        if (savedLocal) {
            return JSON.parse(savedLocal);
        }

        return structuredClone(defaultData);
    }
}

async function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    try {
        await setDoc(tripRef, data);
    } catch (error) {
        console.error("Firebase save error:", error);
    }
}
function sortCardsByTime(day) {
    day.cards.sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;

        return a.time.localeCompare(b.time);
    });
}

function getCurrentDay() {
    return data.days.find(day => day.id === currentDayId);
}

function getCard(cardId) {
    const day = getCurrentDay();
    return day.cards.find(card => card.id === cardId);
}

function renderTabs() {
    tabs.innerHTML = "";

    data.days.forEach(day => {
        const button = document.createElement("button");

        button.className = `tab ${day.id === currentDayId ? "active" : ""}`;
        button.textContent = day.tab;

        button.addEventListener("click", () => {
            currentDayId = day.id;
            data.selectedDay = day.id;
            saveData();
            render();
        });

        tabs.appendChild(button);
    });
}

function renderBoard() {
    const day = getCurrentDay();

    dayTitle.textContent = day.title;
    board.innerHTML = "";

    day.cards.forEach(card => {
        const cardElement = document.createElement("article");

        cardElement.className = `trip-card ${card.done ? "done" : ""}`;
        cardElement.draggable = true;
        cardElement.dataset.id = card.id;

        cardElement.innerHTML = `
            <div class="card-icon">${card.icon}</div>

            <div class="card-main">
                <h3>${escapeHTML(card.title)}</h3>
                <p>${escapeHTML(card.description || "Нажми, чтобы добавить описание.")}</p>

                ${
                    card.link
                        ? `<a class="map-link" href="${escapeHTML(card.link)}" target="_blank">📍 Открыть</a>`
                        : ""
                }
            </div>

            <div class="card-time">${card.time || "?"}</div>
        `;
        const link = cardElement.querySelector(".map-link");

if (link) {
    link.addEventListener("click", event => {
        event.stopPropagation();
    });
}

        cardElement.addEventListener("click", () => {
            openModal(card.id);
        });

        cardElement.addEventListener("dragstart", () => {
            draggedCardId = card.id;
            cardElement.classList.add("dragging");
        });

        cardElement.addEventListener("dragend", () => {
            draggedCardId = null;
            cardElement.classList.remove("dragging");
        });

        cardElement.addEventListener("dragover", event => {
            event.preventDefault();
        });

        cardElement.addEventListener("drop", event => {
            event.preventDefault();

            const targetCardId = cardElement.dataset.id;

            if (draggedCardId && draggedCardId !== targetCardId) {
                reorderCards(draggedCardId, targetCardId);
            }
        });

        board.appendChild(cardElement);
    });
}

function reorderCards(fromId, toId) {
    const day = getCurrentDay();

    const fromIndex = day.cards.findIndex(card => card.id === fromId);
    const toIndex = day.cards.findIndex(card => card.id === toId);

    const [movedCard] = day.cards.splice(fromIndex, 1);

    day.cards.splice(toIndex, 0, movedCard);

    saveData();
    renderBoard();
}

function openModal(cardId) {
    editingCardId = cardId;

    const card = getCard(cardId);
    modalLink.value = card.link || "";
    modalTitle.value = card.title;
    modalTime.value = card.time || "";
    modalDescription.value = card.description || "";
    modalDone.checked = Boolean(card.done);

    modal.classList.remove("hidden");
}

function closeModalWindow() {
    modal.classList.add("hidden");
    editingCardId = null;
}

function saveCurrentCard() {
    const card = getCard(editingCardId);

    if (!card) {
        closeModalWindow();
        render();
        return;
    }

    card.title = modalTitle.value.trim() || "Без названия";
    card.time = modalTime.value;
    card.description = modalDescription.value.trim();
    card.link = modalLink.value.trim();
    card.done = modalDone.checked;

    sortCardsByTime(getCurrentDay());

    saveData();
    closeModalWindow();
    render();
}

function deleteCurrentCard() {
    const day = getCurrentDay();

    day.cards = day.cards.filter(card => card.id !== editingCardId);

    saveData();
    closeModalWindow();
    render();
}

function addCard() {
    const day = getCurrentDay();

    const newCard = {
        id: `card-${Date.now()}`,
        icon: "✨",
        title: "Новая карточка",
        time: "",
        description: "Нажми и добавь описание.",
        done: false,
        link: ""
    };

    day.cards.push(newCard);
    sortCardsByTime(day);

    saveData();
    renderBoard();
    openModal(newCard.id);
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function render() {
    renderTabs();
    renderBoard();
}

addCardBtn.addEventListener("click", addCard);
saveCard.addEventListener("click", saveCurrentCard);
deleteCard.addEventListener("click", deleteCurrentCard);
closeModal.addEventListener("click", closeModalWindow);
modalBackdrop.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModalWindow();
    }
});

async function init() {
    data = await loadData();
    currentDayId = data.selectedDay;

    render();

    onSnapshot(tripRef, snapshot => {
        if (!snapshot.exists()) return;

        const freshData = snapshot.data();

        if (editingCardId) {
            data = freshData;
            return;
        }

        data = freshData;
        currentDayId = data.selectedDay;

        render();
    });
}

init();