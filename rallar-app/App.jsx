import React, { useState, useEffect, useRef } from "react"

const C = {
  bg:"#ffffff",bg2:"#f0f5fb",bg3:"#e3ecf7",
  b:"rgba(21,101,192,.12)",b2:"rgba(21,101,192,.22)",
  tx:"#0d1f35",mu:"#5a7089",ac:"#1565c0",da:"#c62828",ok:"#2e7d32"
}

const AVROP = [
  {id:"1",best:"Trafikverket",proj:"Botniabanans förstärkning etapp 3",plats:"Härnösand–Kramfors",
   startdatum:"2026-07-01",slutdatum:"2026-08-26",tider:"Mån–Fre 06:00–16:00",omf:"8 veckor · 15 man",
   bemanning:[{roll:"Termitsvetsare",antal:6},{roll:"Bangubbar",antal:7},{roll:"Förare",antal:1},{roll:"Arbetsledare",antal:1}],
   uppg:"Rälsbyte, ballastarbeten, spårjustering",
   behov:"Söker erfaret team med termit-svetsare och bangubbar. Erfarenhet av Banverket-projekt ett krav. Ni måste ha BVS-certifierade svetsare och egen mätutrustning. Önskvärt med tidigare arbete på Botniabanan.",
   verktyg:["Termit svetsset","Rälslyftar","Grävmaskin","Befästare 60kg","Mätutrustning"],
   material:"Räls 60E1, ballast och befästningar levereras till plats av Trafikverket.",
   extraInfo:"",
   arbetsledareNamn:"Erik Lindberg",arbetsledareTel:"070-444 11 22",
   kontaktNamn:"Anna Pettersson",kontaktTel:"010-444 55 66",
   arbetsorderRef:"TRV-2026-BOT-12",koordinater:"62.6314, 17.9389",
   deadline:"2026-06-15"},
  {id:"2",best:"Jernhusen AB",proj:"Underhåll Stockholm Central",plats:"Stockholm C",
   startdatum:"2026-06-08",slutdatum:"2026-06-29",tider:"Nattarbete 22:00–05:00",omf:"3 veckor · 6 man",
   bemanning:[{roll:"Signaltekniker",antal:2},{roll:"Spårarbetare",antal:3},{roll:"Arbetsledare",antal:1}],
   uppg:"Växelunderhåll, spårinspektion",
   behov:"Nattjobb med nattillägg. Vi söker BVS-certifierade signaltekniker som har vana av Stockholm C. Lokala leverantörer med kort inställelsetid prioriteras.",
   verktyg:["Svetsutrustning","Mätutrustning","Signalverktyg"],
   material:"",
   extraInfo:"Endast nattskift. Säkerhetsutbildning krävs innan start.",
   arbetsledareNamn:"Henrik Berg",arbetsledareTel:"070-888 11 22",
   kontaktNamn:"Maria Lindqvist",kontaktTel:"08-444 55 66",
   arbetsorderRef:"JH-2026-04",koordinater:"59.3300, 18.0590",
   deadline:"2026-06-01"},
  {id:"3",best:"Region Norrbotten",proj:"Malmbanan etapp 7",plats:"Kiruna–Riksgränsen",
   startdatum:"2026-07-15",slutdatum:"2026-10-07",tider:"Dag- och nattskift",omf:"12 veckor · 20 man",
   bemanning:[{roll:"Spårtekniker",antal:6},{roll:"Maskinförare",antal:4},{roll:"Bangubbar",antal:8},{roll:"Arbetsledare",antal:2}],
   uppg:"Spårförstärkning, dränering, ballasttamping",
   behov:"Stort projekt med förlängningsmöjlighet. Söker stabil underleverantör med egen utrustning. Erfarenhet av Malmbanan och vintertåligt arbete krävs. Ni måste klara av växlande skift.",
   verktyg:["Grävmaskin","Hjullastare","Dumper","Kompressor","Stoppmaskin","Ballastplog"],
   material:"Trafikverket tillhandahåller räls och ballast. Underleverantören ansvarar för småmaterial.",
   extraInfo:"Förlängningsmöjlighet finns vid bra leverans. Sambo-boende kan ordnas för team på 6+ personer.",
   arbetsledareNamn:"Lars Söderström",arbetsledareTel:"070-222 33 44",
   kontaktNamn:"Karl Olofsson",kontaktTel:"0920-44 55 66",
   arbetsorderRef:"RN-2026-MAL-7",koordinater:"67.8558, 20.2253",
   deadline:"2026-07-01"},
]

// ═══════════════════════════════════════════════════════════════════════
// PRIVATA AVROP — riktade till specifika företag, syns inte i öppna marketplace
// Demo: 1 förseedat skickat till co2 (Lindqvist Rail AB — Annas företag).
// ═══════════════════════════════════════════════════════════════════════
const INIT_PRIVATA_AVROP = [
  {
    id:"pa1",
    mottagarforetagIds:["co2"],   // Lindqvist Rail AB
    declinedForetagIds:[],         // Företag som tackat nej — döljs i deras marketplace
    bestallareNamn:"Karl Andersson",
    bestallareForetag:"Spårbygg Norr AB",
    bestallareForetagId:"co3",
    publicerad:"2026-05-24",
    // Avropsfält (matchar AVROP-struktur så AvropDetail kan rendera det)
    best:"Spårbygg Norr AB",
    proj:"Akut räls-reparation Sundsvall norra",
    plats:"Sundsvall norra bangård, spår 4",
    startdatum:"2026-06-08",slutdatum:"2026-06-21",
    tider:"Mån–Fre 06:00–18:00",
    omf:"2 veckor · 6 man",
    bemanning:[{roll:"Termitsvetsare",antal:2},{roll:"Bangubbar",antal:3},{roll:"Arbetsledare",antal:1}],
    uppg:"Snabb reparation av spricka i räls vid km 287+450. Termitsvetsning och ballast-justering.",
    behov:"Vi söker ett företag med BVS-certifierad svetsare som kan starta inom 2 veckor. Egen utrustning krävs. Erfarenhet av termitsvetsning på högtrafikerade spår är en förutsättning. Vi behöver ert svar senast 5 juni.",
    verktyg:["Termitsvets","Termit svetsset","Rälsslip","Mätutrustning"],
    material:"Spårbygg Norr tillhandahåller räls och termit-patroner. Underleverantören ansvarar för förbrukningsmaterial.",
    extraInfo:"Akut ärende — vänligen återkoppla skyndsamt även om ni inte kan ta uppdraget så vi kan gå vidare.",
    arbetsledareNamn:"Per Karlsson",arbetsledareTel:"070-555 66 77",
    kontaktNamn:"Karl Andersson",kontaktTel:"070-200 30 40",
    arbetsorderRef:"SN-2026-AKUT-04",koordinater:"62.3908, 17.3069",
    deadline:"2026-06-05",
  },
  // pa2: Anna skickade till NordRail (co1) — som tackade nej. Demo-data för
  // "Tackat nej"-sektionen i beställarens Mina avrop.
  {
    id:"pa2",
    mottagarforetagIds:["co1"],   // NordRail AB
    declinedForetagIds:["co1"],    // har tackat nej
    bestallareNamn:"Anna Bergström",
    bestallareForetag:"Lindqvist Rail AB",
    bestallareForetagId:"co2",
    publicerad:"2026-05-20",
    best:"Lindqvist Rail AB",
    proj:"Bangårdsupprustning Borlänge spår 5-8",
    plats:"Borlänge bangård",
    startdatum:"2026-07-01",slutdatum:"2026-08-15",
    tider:"Mån–Fre 06:00–16:00",
    omf:"6 veckor · 8 man",
    bemanning:[{roll:"Spårtekniker",antal:3},{roll:"Bangubbar",antal:4},{roll:"Arbetsledare",antal:1}],
    uppg:"Upprustning av spår 5-8 i Borlänge bangård, ballastrensning och växeljustering",
    behov:"Söker erfaret team med BVS-certifiering för bangårdsarbete. Egen mätutrustning krävs.",
    verktyg:["Mätutrustning","Stampar","Hjullastare","Spårjusterare"],
    material:"Vi tillhandahåller ballast och befästningar.",
    extraInfo:"",
    arbetsledareNamn:"Anna Bergström",arbetsledareTel:"070-100 20 30",
    kontaktNamn:"Pia Wikström",kontaktTel:"023-44 55 66",
    arbetsorderRef:"LR-2026-BOR-3",koordinater:"60.4842, 15.4347",
    deadline:"2026-06-10",
  },
]

const INIT_PRIVAT_NOTISER = [
  {
    id:"pn1",
    typ:"privat-avrop-inkommen",   // Action: Öppna avropet / Tacka nej
    avropId:"pa1",
    foretagId:"co2",   // mottagaren — Lindqvist Rail AB
    titel:"🔒 Nytt privat avrop",
    meddelande:"Ni har fått ett privat avrop från Karl Andersson — öppna för att läsa och ansöka.",
    tid:"2026-05-24 14:30",
    sedd:false,
  },
  {
    id:"pn2",
    typ:"tacka-nej-svar",            // Info: bara Markera sedd
    avropId:"pa2",                    // referens till avropet
    foretagId:"co2",                  // Anna (beställaren) får besked
    fromForetagId:"co1",
    fromForetagNamn:"NordRail AB",
    avropProj:"Bangårdsupprustning Borlänge spår 5-8",
    kommentar:"Vi är fullbokade till och med oktober — beklagar att vi inte kan ta uppdraget den här gången.",
    titel:"📭 Företag tackade nej",
    meddelande:"NordRail AB tackade nej till ert privata avrop \"Bangårdsupprustning Borlänge spår 5-8\".",
    tid:"2026-05-24 09:15",
    sedd:false,
  },
]


// ═══════════════════════════════════════════════════════════════════════
// CHATT — konversationer mellan företag (foretag/beställare-rollen)
// Anna (Lindqvist co2) har 2 aktiva konversationer i demon.
// ═══════════════════════════════════════════════════════════════════════
const INIT_KONVERSATIONER = [
  { id:"k1", partnerForetagId:"co3" },   // Anna ↔ Spårbygg Norr (privat avrop pa1)
  { id:"k2", partnerForetagId:"co1" },   // Anna ↔ NordRail
]

// Meddelanden: fran = foretagId | "system". sedd = har motparten sett.
const INIT_CHATT_MEDDELANDEN = [
  // k1: Spårbygg skickade privat avrop till Anna — systemmeddelande + dialog
  {id:"cm1", konvId:"k1", fran:"system", text:"🔒 Spårbygg Norr AB skickade ett privat avrop till er — fortsätt konversationen här.", typ:"system", data:{avropId:"pa1"}, tid:"2026-05-24 14:30", sedd:true},
  {id:"cm2", konvId:"k1", fran:"co3", text:"Hej Anna! Vi har ett brådskande räls-reparation som vi tänkte ni kanske kan hjälpa med.", typ:"text", tid:"2026-05-24 14:35", sedd:true},
  {id:"cm3", konvId:"k1", fran:"co3", text:"Bilagan i avropet beskriver omfattningen — ni har vana av termitsvets på spår 4 sedan tidigare?", typ:"text", tid:"2026-05-24 14:36", sedd:true},
  {id:"cm4", konvId:"k1", fran:"co2", text:"Tack för avropet! Vi tittar på det och återkommer i morgon med tider och bemanning.", typ:"text", tid:"2026-05-24 15:20", sedd:true},
  {id:"cm5", konvId:"k1", fran:"co3", text:"Perfekt, ser fram emot ert svar. Behöver ni mer info om platsen?", typ:"text", tid:"2026-05-24 16:00", sedd:false},
  // k2: NordRail har visat intresse för ett av Annas öppna avrop
  {id:"cm6", konvId:"k2", fran:"co1", text:"Hej! Vi såg att ni publicerat avropet för Falun bangård — vi har ett team som kan starta i juli.", typ:"text", tid:"2026-05-23 10:15", sedd:true},
  {id:"cm7", konvId:"k2", fran:"co1", text:"Bifogar avropet så ni vet vilket jag menar:", typ:"text", tid:"2026-05-23 10:16", sedd:true},
  {id:"cm8", konvId:"k2", fran:"co1", text:"", typ:"avrop", data:{avropId:"m1", proj:"Spårjustering Falun bangård", plats:"Falun Central", deadline:"2026-07-15"}, tid:"2026-05-23 10:17", sedd:true},
  {id:"cm9", konvId:"k2", fran:"co2", text:"Tack Magnus! Skicka gärna in en formell ansökan så återkommer vi efter helgen.", typ:"text", tid:"2026-05-23 11:00", sedd:true},
  {id:"cm10",konvId:"k2", fran:"co1", text:"Gör det idag. Vi skickar också CV på de erfarna spårteknikerna som ingår.", typ:"text", tid:"2026-05-23 11:45", sedd:true},
]

// Avrop publicerade av inloggad användares företag (Lindqvist Rail AB)
const MINA_AVROP = [
  {id:"m1",best:"Lindqvist Rail AB",proj:"Spårjustering Falun bangård",plats:"Falun Central",
   startdatum:"2026-08-03",slutdatum:"2026-08-28",tider:"Mån–Fre 07:00–16:00",omf:"4 veckor · 8 man",
   bemanning:[{roll:"Spårtekniker",antal:3},{roll:"Bangubbar",antal:4},{roll:"Arbetsledare",antal:1}],
   uppg:"Justering av spår och växlar, ballastrensning",
   behov:"Söker team med erfarenhet av bangårdsarbete och egen mätutrustning. Lokalkännedom om Dalarna är ett plus. Vi prioriterar leverantörer med kort inställelsetid.",
   verktyg:["Mätutrustning","Stampar","Hjullastare"],
   material:"Vi tillhandahåller ballast och befästningar.",
   extraInfo:"",
   arbetsledareNamn:"Anna Bergström",arbetsledareTel:"070-100 20 30",
   kontaktNamn:"Pia Wikström",kontaktTel:"023-44 55 66",
   arbetsorderRef:"LR-2026-FAL-1",koordinater:"60.6065, 15.6355",
   deadline:"2026-07-15",publicerad:"2026-05-18"},
  {id:"m2",best:"Lindqvist Rail AB",proj:"Signalunderhåll Borlänge–Hedemora",plats:"Borlänge–Hedemora",
   startdatum:"2026-07-13",slutdatum:"2026-07-26",tider:"Nattarbete 22:00–06:00",omf:"2 veckor · 4 man",
   bemanning:[{roll:"Signaltekniker",antal:3},{roll:"Arbetsledare",antal:1}],
   uppg:"Signalinspektion och periodiskt underhåll",
   behov:"Kräver certifierad signalpersonal med BVS-godkännande. Erfarenhet av Bombardier-system efterfrågas.",
   verktyg:["Mätutrustning","Signalverktyg"],
   material:"",
   extraInfo:"Endast nattskift — säkerhetsutbildning krävs.",
   arbetsledareNamn:"Anna Bergström",arbetsledareTel:"070-100 20 30",
   kontaktNamn:"Pia Wikström",kontaktTel:"023-44 55 66",
   arbetsorderRef:"LR-2026-BHM-2",koordinater:"60.4842, 15.4347",
   deadline:"2026-06-30",publicerad:"2026-05-20"},
]

const ANSTALLDA = [
  {id:"1",name:"Erik Lindqvist",roll:"Termit svetsare",tel:"070-111 22 33"},
  {id:"2",name:"Sara Johansson",roll:"Hudik förare",tel:"070-222 33 44"},
  {id:"3",name:"Marcus Berg",roll:"Bangubbar",tel:"070-333 44 55"},
  {id:"4",name:"Anna Nilsson",roll:"Maskinist",tel:"070-444 55 66"},
]

// ── PLANERING (Företag-flik): hela arbetsstyrkan + projekt + veckobokningar ──
const PLANERING_ANSTALLDA = [
  {id:"u1", name:"Erik Lindqvist",  roll:"Termit svetsare"},
  {id:"u2", name:"Sara Johansson",  roll:"Hudik förare"},
  {id:"u3", name:"Marcus Berg",     roll:"Bangubbar"},
  {id:"u4", name:"Anna Nilsson",    roll:"Maskinist"},
  {id:"u5", name:"Magnus Holm",     roll:"Arbetsledare"},
  {id:"u6", name:"Lars Andersson",  roll:"Spårtekniker"},
  {id:"u7", name:"Henrik Ek",       roll:"Termit svetsare"},
  {id:"u8", name:"Bo Svensson",     roll:"Signaltekniker"},
  {id:"u9", name:"Lena Hagberg",    roll:"Signaltekniker"},
  {id:"u10",name:"Karl Forsberg",   roll:"Maskinist"},
]

const PROJEKT_LIST = [
  {id:"pr1",namn:"Botniabanan etapp 3",   plats:"Härnösand–Kramfors", arbete:"Rälsbyte",       color:0},
  {id:"pr2",namn:"Spårjustering Falun",   plats:"Falun C",            arbete:"Spårjustering",  color:1},
  {id:"pr3",namn:"Signalunderhåll",       plats:"Borlänge–Hedemora",  arbete:"Signaler",       color:2},
  {id:"pr4",namn:"Vegetationsröjning Syd",plats:"Malmö–Ystad",        arbete:"Röjning",        color:3},
  {id:"pr5",namn:"Termitsvets Sthlm",     plats:"Stockholm C",        arbete:"Termitsvets",    color:4},
  {id:"pr6",namn:"Växelrevision Boden",   plats:"Boden",              arbete:"Växelrevision",  color:5},
  {id:"pr7",namn:"Påsvets Gävle",         plats:"Gävle",              arbete:"Påsvets",        color:6},
]

// Pastellpalett: ljus fyllning, tydligare gräns + textfärg för läsbarhet på vit bg
const PROJECT_PALETTE = [
  {bg:"#dbeafe",border:"#93c5fd",text:"#1e40af"}, // blå
  {bg:"#dcfce7",border:"#86efac",text:"#15803d"}, // grön
  {bg:"#fef3c7",border:"#fcd34d",text:"#b45309"}, // gul
  {bg:"#fce7f3",border:"#f9a8d4",text:"#be185d"}, // rosa
  {bg:"#e0e7ff",border:"#a5b4fc",text:"#4338ca"}, // indigo
  {bg:"#cffafe",border:"#67e8f9",text:"#0e7490"}, // cyan
  {bg:"#fed7aa",border:"#fdba74",text:"#c2410c"}, // orange
  {bg:"#e9d5ff",border:"#c4b5fd",text:"#6b21a8"}, // lila
]

const WEEKS = [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]

const INIT_BOKNINGAR = [
  // Erik Lindqvist — Botniabanan + Termitsvets Sthlm
  {id:"bk1", anstalldId:"u1", projektId:"pr1", vecka:18},
  {id:"bk2", anstalldId:"u1", projektId:"pr1", vecka:19},
  {id:"bk3", anstalldId:"u1", projektId:"pr1", vecka:20},
  {id:"bk4", anstalldId:"u1", projektId:"pr5", vecka:22},
  {id:"bk5", anstalldId:"u1", projektId:"pr5", vecka:23},
  // Sara Johansson — Spårjustering Falun
  {id:"bk6", anstalldId:"u2", projektId:"pr2", vecka:19},
  {id:"bk7", anstalldId:"u2", projektId:"pr2", vecka:20},
  {id:"bk8", anstalldId:"u2", projektId:"pr2", vecka:21},
  {id:"bk9", anstalldId:"u2", projektId:"pr2", vecka:22},
  // Marcus Berg — Botniabanan + Växelrevision
  {id:"bk10",anstalldId:"u3", projektId:"pr1", vecka:20},
  {id:"bk11",anstalldId:"u3", projektId:"pr1", vecka:21},
  {id:"bk12",anstalldId:"u3", projektId:"pr1", vecka:22},
  {id:"bk13",anstalldId:"u3", projektId:"pr6", vecka:24},
  {id:"bk14",anstalldId:"u3", projektId:"pr6", vecka:25},
  // Anna Nilsson — Vegetationsröjning
  {id:"bk15",anstalldId:"u4", projektId:"pr4", vecka:18},
  {id:"bk16",anstalldId:"u4", projektId:"pr4", vecka:19},
  {id:"bk17",anstalldId:"u4", projektId:"pr4", vecka:20},
  {id:"bk18",anstalldId:"u4", projektId:"pr4", vecka:22},
  // Magnus Holm — Botniabanan (arbetsledare)
  {id:"bk19",anstalldId:"u5", projektId:"pr1", vecka:19},
  {id:"bk20",anstalldId:"u5", projektId:"pr1", vecka:20},
  {id:"bk21",anstalldId:"u5", projektId:"pr1", vecka:21},
  {id:"bk22",anstalldId:"u5", projektId:"pr1", vecka:22},
  // Lars Andersson — Signalunderhåll
  {id:"bk23",anstalldId:"u6", projektId:"pr3", vecka:21},
  {id:"bk24",anstalldId:"u6", projektId:"pr3", vecka:22},
  // Henrik Ek — Påsvets + Termitsvets
  {id:"bk25",anstalldId:"u7", projektId:"pr7", vecka:22},
  {id:"bk26",anstalldId:"u7", projektId:"pr7", vecka:23},
  {id:"bk27",anstalldId:"u7", projektId:"pr5", vecka:25},
  // Bo Svensson — Signaler
  {id:"bk28",anstalldId:"u8", projektId:"pr3", vecka:22},
  {id:"bk29",anstalldId:"u8", projektId:"pr3", vecka:23},
  // Lena Hagberg — Signaler
  {id:"bk30",anstalldId:"u9", projektId:"pr3", vecka:23},
  {id:"bk31",anstalldId:"u9", projektId:"pr3", vecka:24},
  // Karl Forsberg — Växelrevision
  {id:"bk32",anstalldId:"u10",projektId:"pr6", vecka:24},
  {id:"bk33",anstalldId:"u10",projektId:"pr6", vecka:25},
]

// ═══════════════════════════════════════════════════════════════════════
// PROJEKTERING-modul (Företag) — separat datalager från Planering-fliken
// ═══════════════════════════════════════════════════════════════════════
const PROJEKT_STATUS_LIST = ["Offert","Planering","Pågående","Klar","Fakturerad"]

const PROJEKT_STATUS_STYLE = {
  "Offert":     {bg:"#f3f4f6", text:"#6b7280", border:"#d1d5db"},
  "Planering":  {bg:"#dbeafe", text:"#1e40af", border:"#93c5fd"},
  "Pågående":   {bg:"#fef3c7", text:"#b45309", border:"#fcd34d"},
  "Klar":       {bg:"#dcfce7", text:"#15803d", border:"#86efac"},
  "Fakturerad": {bg:"#e0e7ff", text:"#4338ca", border:"#a5b4fc"},
}

const INIT_PROJEKTERING_PROJEKT = [
  {id:"pj1",nummer:"PRJ-2026-118",namn:"Botniabanan etapp 3",bestallare:"Trafikverket Region Nord",plats:"Härnösand–Kramfors",omfattning:"Rälsbyte 8 km, ballast 2400 ton, termitsvets 24 skarvar",arbetstider:"Mån–Fre 06:00–16:00",arbetsorder:"AO-2026-0118",arbetsledare:"Magnus Holm",kontaktperson:"Eva Lindberg · 070-555 12 34",uppgifter:"Spårförstärkning och rälsbyte mellan km 142–150",extra:"Säkerhetszon 25m. Närhet till bostadsområde — bullernivå begränsad nattetid.",start:"2026-05-04",slut:"2026-07-01",budget:2400,status:"Pågående",farg:0},
  {id:"pj2",nummer:"PRJ-2026-119",namn:"Spårjustering Falun bangård",bestallare:"Lindqvist Rail AB",plats:"Falun Central",omfattning:"Spårjustering 12 spår, ballastrensning, växeljustering",arbetstider:"Mån–Fre 07:00–16:00",arbetsorder:"AO-2026-0119",arbetsledare:"Magnus Holm",kontaktperson:"Anna Bergström · 070-446 78 90",uppgifter:"Justering av spår och växlar, ballastrensning",extra:"BVS-utbildning krävs. Bemanning 8 man.",start:"2026-06-15",slut:"2026-07-12",budget:1280,status:"Planering",farg:1},
  {id:"pj3",nummer:"PRJ-2026-120",namn:"Signalunderhåll Borlänge",bestallare:"Trafikverket Region Mitt",plats:"Borlänge–Hedemora",omfattning:"Signalinspektion 18 signaler, periodiskt underhåll",arbetstider:"Nattarbete 22:00–06:00",arbetsorder:"AO-2026-0120",arbetsledare:"Magnus Holm",kontaktperson:"Per Sandberg · 070-123 45 67",uppgifter:"Signalinspektion och periodiskt underhåll",extra:"Kräver BVS-godkännande för signalpersonal.",start:"2026-06-08",slut:"2026-06-22",budget:320,status:"Pågående",farg:2},
  {id:"pj4",nummer:"PRJ-2026-098",namn:"Vegetationsröjning Syd",bestallare:"Trafikverket Region Syd",plats:"Malmö–Ystad",omfattning:"Röjning 45 km, herbicidbehandling utvalda sträckor",arbetstider:"Mån–Fre 06:00–14:00",arbetsorder:"AO-2026-0098",arbetsledare:"Lars Andersson",kontaktperson:"Bo Jansson · 070-987 65 43",uppgifter:"Vegetationsröjning enligt MaaS-plan",extra:"Kemikalierapportering krävs månadsvis.",start:"2026-04-27",slut:"2026-08-31",budget:1800,status:"Pågående",farg:3},
  {id:"pj5",nummer:"PRJ-2026-101",namn:"Termitsvets Stockholm C",bestallare:"Jernhusen AB",plats:"Stockholm Central, spår 8-12",omfattning:"Termitsvetsning 16 skarvar",arbetstider:"Nattarbete 23:00–05:00",arbetsorder:"AO-2026-0101",arbetsledare:"Henrik Ek",kontaktperson:"Sofia Lund · 070-345 67 89",uppgifter:"Termitsvetsning skarvar spår 8-12",extra:"Trafikfri nattetid. Tunnelbane-spår.",start:"2026-05-25",slut:"2026-06-08",budget:240,status:"Pågående",farg:4},
  {id:"pj6",nummer:"PRJ-2026-067",namn:"Växelrevision Boden",bestallare:"Trafikverket Region Nord",plats:"Boden bangård",omfattning:"Komplett växelrevision 4 växlar",arbetstider:"Mån–Fre 06:00–16:00",arbetsorder:"AO-2026-0067",arbetsledare:"Magnus Holm",kontaktperson:"Eva Lindberg · 070-555 12 34",uppgifter:"Revision av 4 växlar inkl. byte av delar",extra:"",start:"2026-03-08",slut:"2026-04-26",budget:480,status:"Klar",farg:5},
  {id:"pj7",nummer:"PRJ-2026-042",namn:"Påsvets Gävle",bestallare:"Gävle Hamn AB",plats:"Gävle hamnspår",omfattning:"Påsvetsning av 32 skarvar",arbetstider:"Mån–Fre 06:00–14:00",arbetsorder:"AO-2026-0042",arbetsledare:"Henrik Ek",kontaktperson:"Karl Bergman · 070-111 22 33",uppgifter:"Påsvetsning på industrispår",extra:"Stickprovskontroll var 8:e skarv.",start:"2026-02-13",slut:"2026-03-24",budget:360,status:"Fakturerad",farg:6},
  {id:"pj8",nummer:"PRJ-2026-130",namn:"Banunderhåll Mälarbanan",bestallare:"Trafikverket Region Mitt",plats:"Stockholm–Västerås",omfattning:"Periodisk inspektion + småjusteringar",arbetstider:"Helger 08:00–18:00",arbetsorder:"AO-2026-0130",arbetsledare:"Magnus Holm",kontaktperson:"Anna Wikström · 070-234 56 78",uppgifter:"Förebyggande underhåll, kvartalsbas",extra:"Offert insänd 2026-05-20.",start:"",slut:"",budget:600,status:"Offert",farg:7},
]

const INIT_TIDSRAPPORTER = [
  {id:"tr1", projektId:"pj1",anstalldNamn:"Erik Lindqvist", datum:"2026-05-25",timmar:8, typ:"Normal", kommentar:""},
  {id:"tr2", projektId:"pj1",anstalldNamn:"Magnus Holm",    datum:"2026-05-25",timmar:8, typ:"Normal", kommentar:""},
  {id:"tr3", projektId:"pj1",anstalldNamn:"Marcus Berg",    datum:"2026-05-25",timmar:10,typ:"Övertid",kommentar:"Förlängd dag pga sprickbildning vid km 142+120"},
  {id:"tr4", projektId:"pj1",anstalldNamn:"Erik Lindqvist", datum:"2026-05-24",timmar:8, typ:"Normal", kommentar:""},
  {id:"tr5", projektId:"pj1",anstalldNamn:"Magnus Holm",    datum:"2026-05-24",timmar:8, typ:"Normal", kommentar:""},
  {id:"tr6", projektId:"pj1",anstalldNamn:"Marcus Berg",    datum:"2026-05-24",timmar:9, typ:"Normal", kommentar:""},
  {id:"tr7", projektId:"pj3",anstalldNamn:"Bo Svensson",    datum:"2026-05-25",timmar:8, typ:"Normal", kommentar:"Nattskift"},
  {id:"tr8", projektId:"pj3",anstalldNamn:"Lars Andersson", datum:"2026-05-25",timmar:6, typ:"Normal", kommentar:""},
  {id:"tr9", projektId:"pj4",anstalldNamn:"Anna Nilsson",   datum:"2026-05-22",timmar:4, typ:"Restid", kommentar:"Resa Malmö–Ystad"},
  {id:"tr10",projektId:"pj4",anstalldNamn:"Anna Nilsson",   datum:"2026-05-22",timmar:8, typ:"Normal", kommentar:""},
  {id:"tr11",projektId:"pj5",anstalldNamn:"Henrik Ek",      datum:"2026-05-23",timmar:6, typ:"Normal", kommentar:""},
  {id:"tr12",projektId:"pj6",anstalldNamn:"Marcus Berg",    datum:"2026-04-22",timmar:8, typ:"Normal", kommentar:""},
  // Pågående pass — stämplat in men inte ut. Visas i "Pågår nu" på projektsidan.
  {id:"tr_now1",projektId:"pj1",anstalldNamn:"Erik Lindqvist",datum:"2026-05-25",timmar:0,startTid:"06:30",stoppTid:null,startGps:{lat:62.6324,lng:17.9395},stoppGps:null,status:"pågående",typ:"Normal",kommentar:""},
]

// Avvikelser kopplade till specifika projekt (parallellt med befintliga INIT_AVVIKELSER)
const INIT_PROJEKT_AVVIKELSER = [
  {id:"pa1",projektId:"pj1",text:"Sprickbildning i räls vid km 142+120, behöver åtgärdas inom 48h",av:"Marcus Berg",  datum:"2026-05-24",status:"open"},
  {id:"pa2",projektId:"pj1",text:"Säkerhetsavstånd avvek från regulering — ny mätning krävs",      av:"Magnus Holm",  datum:"2026-05-23",status:"closed"},
  {id:"pa3",projektId:"pj3",text:"Signal 3B saknar status-LED — anmält till Trafikverket",         av:"Bo Svensson",  datum:"2026-05-22",status:"open"},
  {id:"pa4",projektId:"pj4",text:"Herbicid-spill rapporterat — sanering klar",                     av:"Anna Nilsson", datum:"2026-05-19",status:"closed"},
]

// Projektering har egna bokningar — separat från Planering-flikens bokningar
const INIT_PROJEKTERING_BOKNINGAR = [
  {id:"pbk1", anstalldId:"u1",projektId:"pj1",vecka:20},
  {id:"pbk2", anstalldId:"u1",projektId:"pj1",vecka:21},
  {id:"pbk3", anstalldId:"u1",projektId:"pj1",vecka:22},
  {id:"pbk4", anstalldId:"u3",projektId:"pj1",vecka:21},
  {id:"pbk5", anstalldId:"u3",projektId:"pj1",vecka:22},
  {id:"pbk6", anstalldId:"u5",projektId:"pj1",vecka:20},
  {id:"pbk7", anstalldId:"u5",projektId:"pj1",vecka:21},
  {id:"pbk8", anstalldId:"u5",projektId:"pj1",vecka:22},
  {id:"pbk9", anstalldId:"u2",projektId:"pj2",vecka:24},
  {id:"pbk10",anstalldId:"u2",projektId:"pj2",vecka:25},
  {id:"pbk11",anstalldId:"u2",projektId:"pj2",vecka:26},
  {id:"pbk12",anstalldId:"u8",projektId:"pj3",vecka:22},
  {id:"pbk13",anstalldId:"u9",projektId:"pj3",vecka:23},
  {id:"pbk14",anstalldId:"u4",projektId:"pj4",vecka:18},
  {id:"pbk15",anstalldId:"u4",projektId:"pj4",vecka:19},
  {id:"pbk16",anstalldId:"u4",projektId:"pj4",vecka:20},
  {id:"pbk17",anstalldId:"u7",projektId:"pj5",vecka:22},
  {id:"pbk18",anstalldId:"u7",projektId:"pj5",vecka:23},
  // Arbetsledar-bokningar — vilket projekt de leder vecka för vecka
  {id:"pbk_a1",  anstalldId:"u5",  projektId:"pj1", vecka:18},
  {id:"pbk_a2",  anstalldId:"u5",  projektId:"pj1", vecka:19},
  {id:"pbk_a3",  anstalldId:"u5",  projektId:"pj1", vecka:20},
  {id:"pbk_a4",  anstalldId:"u5",  projektId:"pj1", vecka:21},
  {id:"pbk_a5",  anstalldId:"u5",  projektId:"pj1", vecka:22},
  {id:"pbk_a6",  anstalldId:"u5",  projektId:"pj4", vecka:24},
  {id:"pbk_a7",  anstalldId:"u5",  projektId:"pj4", vecka:25},
  {id:"pbk_a8",  anstalldId:"u5",  projektId:"pj4", vecka:26},
  {id:"pbk_a9",  anstalldId:"u11", projektId:"pj2", vecka:19},
  {id:"pbk_a10", anstalldId:"u11", projektId:"pj2", vecka:20},
  {id:"pbk_a11", anstalldId:"u11", projektId:"pj2", vecka:21},
  {id:"pbk_a12", anstalldId:"u11", projektId:"pj2", vecka:22},
  {id:"pbk_a13", anstalldId:"u11", projektId:"pj5", vecka:25},
  {id:"pbk_a14", anstalldId:"u11", projektId:"pj5", vecka:26},
  {id:"pbk_a15", anstalldId:"u11", projektId:"pj5", vecka:27},
  {id:"pbk_a16", anstalldId:"u12", projektId:"pj3", vecka:18},
  {id:"pbk_a17", anstalldId:"u12", projektId:"pj3", vecka:19},
  {id:"pbk_a18", anstalldId:"u12", projektId:"pj3", vecka:20},
  {id:"pbk_a19", anstalldId:"u12", projektId:"pj6", vecka:22},
  {id:"pbk_a20", anstalldId:"u12", projektId:"pj6", vecka:23},
  {id:"pbk_a21", anstalldId:"u12", projektId:"pj6", vecka:24},
  {id:"pbk_a22", anstalldId:"u13", projektId:"pj5", vecka:20},
  {id:"pbk_a23", anstalldId:"u13", projektId:"pj5", vecka:21},
  {id:"pbk_a24", anstalldId:"u13", projektId:"pj7", vecka:28},
  {id:"pbk_a25", anstalldId:"u13", projektId:"pj7", vecka:29},
  {id:"pbk_a26", anstalldId:"u13", projektId:"pj7", vecka:30},
]

// När en anställd läggs till på ett projekt skapas en notis. Anställd måste markera sedd.
// kvitteradTid: "ÅÅÅÅ-MM-DD HH:MM" när sedd, annars null
const INIT_PROJEKT_NOTISER = [
  {id:"pn1", projektId:"pj1", anstalldId:"u1", sedd:true,  kvitteradTid:"2026-05-04 07:12"},
  {id:"pn2", projektId:"pj1", anstalldId:"u5", sedd:true,  kvitteradTid:"2026-05-04 06:55"},
  {id:"pn3", projektId:"pj2", anstalldId:"u2", sedd:true,  kvitteradTid:"2026-05-23 14:30"},
  {id:"pn4", projektId:"pj2", anstalldId:"u3", sedd:false, kvitteradTid:null}, // Marcus Berg — kommer se notis vid login
  {id:"pn5", projektId:"pj3", anstalldId:"u8", sedd:true,  kvitteradTid:"2026-06-07 22:00"},
  {id:"pn6", projektId:"pj3", anstalldId:"u9", sedd:false, kvitteradTid:null},
  {id:"pn7", projektId:"pj5", anstalldId:"u7", sedd:false, kvitteradTid:null},
  {id:"pn8", projektId:"pj5", anstalldId:"u5", sedd:false, kvitteradTid:null}, // Magnus Holm — kommer se notis vid login
]

// ═══════════════════════════════════════════════════════════════════════
// INTRANÄT — Nyheter, Säkerhet, Dokument, Kontakter, Meddelanden,
// Checklistor, Utbildning. Mock-data + konstanter.
// ═══════════════════════════════════════════════════════════════════════

// — Nyheter — kritisk:true visas som röd banner på Hem tills kvitterad
const INIT_NYHETER = [
  {id:"ny1", titel:"KRITISKT: Ny rutin för riskbedömning vid termitsvets", text:"Från och med imorgon (26 maj) måste alla termitsvetsare göra en utökad riskbedömning enligt det nya formuläret R-2026-05. Detta gäller alla svetsoperationer oavsett plats. Inga undantag.\n\nFormuläret hittas under Dokument → Mallar.\n\nVid frågor: kontakta arbetsmiljöansvarig Anna Bergström direkt.", bild:null, datum:"2026-05-25 08:00", publiceradAv:"Anna Bergström", kritisk:true, lasningar:{u1:"2026-05-25 08:42", u5:"2026-05-25 09:15"}},
  {id:"ny2", titel:"Sommarsemester — sista chansen att önska", text:"Lägg in dina semesterönskemål senast 5 juni. Klart därefter låses planeringen. Logga in på Planering-fliken.", bild:null, datum:"2026-05-23 14:20", publiceradAv:"Anna Bergström", kritisk:false, lasningar:{u1:"2026-05-23 18:10", u2:"2026-05-23 22:55", u5:"2026-05-24 06:30"}},
  {id:"ny3", titel:"Ny utrustning levererad till Botniabanan", text:"Ny rälsklipp-modell GTR-9000 levererad till förrådet i Härnösand. Genomgång varje morgon kl 06:30 första veckan. Magnus Holm ansvarar för introduktion.", bild:null, datum:"2026-05-20 10:00", publiceradAv:"Anna Bergström", kritisk:false, lasningar:{u1:"2026-05-20 12:00", u5:"2026-05-20 11:45"}},
  {id:"ny4", titel:"Lönerevision september", text:"Årlig lönerevision genomförs i september. Information om processen kommer i augusti.", bild:null, datum:"2026-05-15 09:00", publiceradAv:"Anna Bergström", kritisk:false, lasningar:{u1:"2026-05-15 17:30", u2:"2026-05-16 07:00", u3:"2026-05-15 19:45", u5:"2026-05-15 09:30", u7:"2026-05-15 12:00"}},
  {id:"ny5", titel:"Företagsfest 14 juni i Stockholm", text:"Boka in datumet! Mer info kommer.", bild:null, datum:"2026-05-10 16:00", publiceradAv:"Anna Bergström", kritisk:false, lasningar:{u1:"2026-05-10 16:30", u2:"2026-05-10 18:00", u3:"2026-05-10 20:15", u5:"2026-05-10 16:45", u7:"2026-05-11 07:00", u9:"2026-05-12 14:00"}},
]

// — Säkerhet — kategoriserade regler med kvittenser per anställd
const SAKERHET_KATEGORIER = ["Spårväg", "Maskiner", "PPE", "Kemikalier"]
const INIT_SAKERHET = [
  {id:"s1", kategori:"Spårväg", titel:"Tillträde till spårområde — ALLTID T-tillstånd", beskrivning:"Innan tillträde till spårområde ska tillstånd från trafikledning (T-tillstånd) finnas. Ingen rör sig på spår utan giltigt tillstånd. Vid minsta tveksamhet: stanna och kontakta tla.", version:"2.1", uppdaterad:"2026-05-12", media:"https://www.trafikverket.se/info/sakerhet-spar", kvittenser:{u1:"2026-05-12 08:00", u2:"2026-05-13 07:30", u5:"2026-05-12 08:15"}},
  {id:"s2", kategori:"Spårväg", titel:"Säkerhetsavstånd till tåg", beskrivning:"Minst 2,2 meter från närmaste räl när tåg passerar i normalhastighet. Vid arbete på spår: BSO-/A-skyddsvakt ska finnas på plats.", version:"1.3", uppdaterad:"2026-04-20", media:null, kvittenser:{u1:"2026-04-20 07:15", u2:"2026-04-22 06:45", u5:"2026-04-20 09:30", u3:"2026-04-25 14:00"}},
  {id:"s3", kategori:"Maskiner", titel:"Daglig kontroll av rälsklipp", beskrivning:"Innan användning: kontrollera hydraulik, knivkant, säkerhetsspärr och nödstopp. Notera i checklistan. Vid skada eller slitage: ta ur drift omedelbart.", version:"1.0", uppdaterad:"2026-05-01", media:null, kvittenser:{u3:"2026-05-02 06:15", u9:"2026-05-03 07:00"}},
  {id:"s4", kategori:"Maskiner", titel:"Grävmaskin — utbildningskrav", beskrivning:"Endast certifierad personal får framföra grävmaskin på arbetsplats. Certifikat ska kunna uppvisas vid förfrågan.", version:"2.0", uppdaterad:"2026-03-15", media:null, kvittenser:{u1:"2026-03-15 12:00", u5:"2026-03-15 14:30"}},
  {id:"s5", kategori:"PPE", titel:"Personlig skyddsutrustning — minimikrav", beskrivning:"Skyddssko klass S3, varselväst klass 3, hjälm, hörselskydd vid maskinarbete, skyddsglasögon vid svetsning. Inget undantag.", version:"3.2", uppdaterad:"2026-05-01", media:null, kvittenser:{u1:"2026-05-01 08:00", u2:"2026-05-01 08:15", u3:"2026-05-02 07:00", u5:"2026-05-01 08:05", u7:"2026-05-01 09:30", u9:"2026-05-01 10:00"}},
  {id:"s6", kategori:"PPE", titel:"Vinterutrustning för spårarbete", beskrivning:"Vid temperaturer under -10°C: termoplagg, skyddsstövlar med vinterfoder, halsduk under varselväst, vantar som tillåter greppfunktion.", version:"1.1", uppdaterad:"2026-01-15", media:null, kvittenser:{u1:"2026-01-15 08:00", u5:"2026-01-15 08:30"}},
  {id:"s7", kategori:"Kemikalier", titel:"Hantering av smörjmedel & lösningsmedel", beskrivning:"Använd alltid skyddshandskar och skyddsglasögon. Förvaras i godkända kärl. Spill rapporteras omedelbart. Säkerhetsdatablad finns i förrådet.", version:"2.0", uppdaterad:"2026-04-10", media:null, kvittenser:{u1:"2026-04-10 12:30", u5:"2026-04-10 13:00", u7:"2026-04-11 08:00"}},
  {id:"s8", kategori:"Kemikalier", titel:"Termitsvets — säkerhetshantering", beskrivning:"Reaktionstemperatur 2500°C. Endast utbildad personal hanterar termitform. Brandskydd inom 10m radie. Avspärrning krävs. Vid läckage: utrym och kontakta brandtjänst.", version:"2.5", uppdaterad:"2026-05-12", media:"https://www.youtube.com/watch?v=demo-thermite-safety", kvittenser:{u7:"2026-05-12 14:00"}},
]

// — Dokument — kategoriserade, sökbara, versionerade
const DOKUMENT_KATEGORIER = ["Rutiner", "Certifikat", "Tillstånd", "Mallar", "Avtal"]
const INIT_DOKUMENT = [
  {id:"d1", titel:"Rutin för riskbedömning R-2026-05", kategori:"Rutiner", filtyp:"pdf", version:"2.0", uppdaterad:"2026-05-25", storlek:"1.2 MB"},
  {id:"d2", titel:"Rutin för dagligt arbete på spår", kategori:"Rutiner", filtyp:"pdf", version:"3.1", uppdaterad:"2026-04-10", storlek:"880 kB"},
  {id:"d3", titel:"BAS-U certifikat — Anna Bergström", kategori:"Certifikat", filtyp:"pdf", version:"1.0", uppdaterad:"2026-01-15", storlek:"540 kB"},
  {id:"d4", titel:"Termitsvets-certifikat — Henrik Ek", kategori:"Certifikat", filtyp:"pdf", version:"1.0", uppdaterad:"2026-02-20", storlek:"620 kB"},
  {id:"d5", titel:"Trafikverket ramavtal 2026", kategori:"Avtal", filtyp:"pdf", version:"1.0", uppdaterad:"2026-01-08", storlek:"3.4 MB"},
  {id:"d6", titel:"Avtal Jernhusen 2026-2028", kategori:"Avtal", filtyp:"pdf", version:"1.2", uppdaterad:"2026-03-22", storlek:"2.8 MB"},
  {id:"d7", titel:"T-tillstånd mall", kategori:"Tillstånd", filtyp:"pdf", version:"2.0", uppdaterad:"2026-05-12", storlek:"420 kB"},
  {id:"d8", titel:"A-skydd tillstånd mall", kategori:"Tillstånd", filtyp:"pdf", version:"1.5", uppdaterad:"2026-04-01", storlek:"380 kB"},
  {id:"d9", titel:"Mall — Daglig riskbedömning", kategori:"Mallar", filtyp:"pdf", version:"2.0", uppdaterad:"2026-05-25", storlek:"210 kB"},
  {id:"d10",titel:"Mall — Tidsrapport", kategori:"Mallar", filtyp:"pdf", version:"1.0", uppdaterad:"2026-01-10", storlek:"180 kB"},
  {id:"d11",titel:"Mall — Avvikelserapport", kategori:"Mallar", filtyp:"pdf", version:"2.1", uppdaterad:"2026-03-15", storlek:"250 kB"},
  {id:"d12",titel:"Personalhandbok 2026", kategori:"Rutiner", filtyp:"pdf", version:"1.0", uppdaterad:"2026-01-15", storlek:"4.2 MB"},
]

// — Kontakter — utökar PLANERING_ANSTALLDA med tel/email
const KONTAKT_ROLLER = ["Spårarbetare", "Termitsvetsare", "Förare", "Arbetsledare", "Bangubbe", "Signaltekniker"]
const INIT_KONTAKTER = [
  {id:"u1", name:"Erik Lindqvist",   roll:"Spårarbetare",   tel:"070-123 45 67", email:"erik.l@nordrail.se",   foretag:"NordRail AB"},
  {id:"u2", name:"Anna Pettersson",  roll:"Spårarbetare",   tel:"070-234 56 78", email:"anna.p@nordrail.se",   foretag:"NordRail AB"},
  {id:"u3", name:"Marcus Berg",      roll:"Termitsvetsare", tel:"070-345 67 89", email:"marcus.b@nordrail.se", foretag:"NordRail AB"},
  {id:"u4", name:"Sara Holm",        roll:"Förare",         tel:"070-456 78 90", email:"sara.h@nordrail.se",   foretag:"NordRail AB"},
  {id:"u5", name:"Magnus Holm",      roll:"Arbetsledare",   tel:"070-567 89 01", email:"magnus.h@nordrail.se", foretag:"NordRail AB"},
  {id:"u6", name:"Lars Andersson",   roll:"Bangubbe",       tel:"070-678 90 12", email:"lars.a@nordrail.se",   foretag:"NordRail AB"},
  {id:"u7", name:"Henrik Ek",        roll:"Termitsvetsare", tel:"070-789 01 23", email:"henrik.e@nordrail.se", foretag:"NordRail AB"},
  {id:"u8", name:"Bo Svensson",      roll:"Signaltekniker", tel:"070-890 12 34", email:"bo.s@nordrail.se",     foretag:"NordRail AB"},
  {id:"u9", name:"Anna Nilsson",     roll:"Förare",         tel:"070-901 23 45", email:"anna.n@nordrail.se",   foretag:"NordRail AB"},
  {id:"u10",name:"Karin Strömberg",  roll:"Spårarbetare",   tel:"072-012 34 56", email:"karin.s@nordrail.se",  foretag:"NordRail AB"},
  {id:"u11",name:"Erik Berg",        roll:"Arbetsledare",   tel:"070-321 45 67", email:"erik.b@nordrail.se",   foretag:"NordRail AB"},
  {id:"u12",name:"Lisa Norén",       roll:"Arbetsledare",   tel:"070-432 56 78", email:"lisa.n@nordrail.se",   foretag:"NordRail AB"},
  {id:"u13",name:"Johan Karlsson",   roll:"Arbetsledare",   tel:"070-543 67 89", email:"johan.k@nordrail.se",  foretag:"NordRail AB"},
]

// — Meddelanden — chef→alla/roll/person med kvittenser
const INIT_MEDDELANDEN = [
  {id:"m1", fran:"Anna Bergström", tillTyp:"alla", tillLabel:"Alla anställda", tillFilter:null, text:"Glöm inte att lämna in tidrapport senast fredag kl 17. Tack!", datum:"2026-05-24 15:30", kvittenser:{u1:"2026-05-24 16:00", u2:"2026-05-24 18:30", u5:"2026-05-24 17:00"}},
  {id:"m2", fran:"Anna Bergström", tillTyp:"roll", tillLabel:"Alla Termitsvetsare", tillFilter:"Termitsvetsare", text:"Säkerhetsgenomgång termitsvets imorgon kl 07:00 i Härnösand-förrådet. Obligatoriskt.", datum:"2026-05-24 12:00", kvittenser:{u3:"2026-05-24 13:00", u7:"2026-05-24 14:30"}},
  {id:"m3", fran:"Anna Bergström", tillTyp:"person", tillLabel:"Marcus Berg", tillFilter:"u3", text:"Hej Marcus, kan du ringa mig när du har en stund? Gäller projektet i Falun. Tack!", datum:"2026-05-23 09:15", kvittenser:{u3:"2026-05-23 10:30"}},
  {id:"m4", fran:"Anna Bergström", tillTyp:"alla", tillLabel:"Alla anställda", tillFilter:null, text:"Företagsfest 14 juni i Stockholm! Mer info kommer. Boka in datumet redan nu.", datum:"2026-05-10 16:00", kvittenser:{u1:"2026-05-10 16:30", u2:"2026-05-10 18:00", u3:"2026-05-10 20:15", u5:"2026-05-10 16:45", u7:"2026-05-11 07:00", u9:"2026-05-12 14:00"}},
]

// — Checklistor — mall per roll + dagligt status per anställd
const CHECKLIST_MALLAR = {
  "Förare":          ["Däcktryck OK", "Bromsar testade", "Oljenivå", "Strålkastare/blinkers", "Säkerhetsbälte", "Last säkrad"],
  "Termitsvetsare":  ["Skyddsutrustning på", "Termitform inspekterad", "Brandskydd inom 10m", "Avspärrning på plats", "Säkerhetsdatablad medtaget", "Förstahjälpen finns"],
  "Spårarbetare":    ["Varselväst på", "Hjälm på", "T-tillstånd verifierat", "Skyddsvakt på plats", "Verktyg inspekterade"],
  "Bangubbe":        ["PPE på", "Verktyg fungerar", "Materiel på plats", "Skyddsvakt informerad"],
  "Signaltekniker":  ["Mätinstrument kalibrerade", "Skyddsutrustning", "Tillstånd från trafikledning", "Reservutrustning"],
  "Arbetsledare":    ["Arbetslag samlat", "Dagorder genomgången", "Kontaktuppgifter klara", "Riskbedömning klar"],
}
const INIT_CHECKLIST_STATUS = [
  {id:"cs1", anstalldId:"u1", datum:"2026-05-25", roll:"Spårarbetare",   svar:{0:true,1:true,2:true,3:true,4:true}, klar:true, klarTid:"06:42"},
  {id:"cs2", anstalldId:"u2", datum:"2026-05-25", roll:"Spårarbetare",   svar:{0:true,1:true,2:true,3:false,4:true}, klar:false, klarTid:null},
  {id:"cs3", anstalldId:"u5", datum:"2026-05-25", roll:"Arbetsledare",   svar:{0:true,1:true,2:true,3:true}, klar:true, klarTid:"06:15"},
  {id:"cs4", anstalldId:"u7", datum:"2026-05-25", roll:"Termitsvetsare", svar:{0:true,1:true,2:true,3:true,4:true,5:true}, klar:true, klarTid:"06:55"},
]

// — Utbildning — kurser med beskrivning, video/pdf-länkar, quiz och certifikat
const KURS_KATEGORIER = ["Säkerhet", "Maskin", "Process", "Lag & föreskrifter"]
const INIT_KURSER = [
  {id:"k1", titel:"BAS-P / BAS-U Grunder", kategori:"Lag & föreskrifter", beskrivning:"Lär dig vad det innebär att vara BAS-P eller BAS-U på en arbetsplats, ansvar och dokumentationskrav.", video:"https://www.av.se/film-basp-basu", pdf:"https://www.av.se/pdf/basp-basu.pdf", langd:"45 min",
    quiz:[
      {q:"Vad står BAS-U för?", alts:["Byggarbetsmiljösamordnare Utförande","Byggnadsarbetare Säkerhet Utförande","Bas-Användare"], ratt:0},
      {q:"När ska BAS-U utses?", alts:["Vid alla byggprojekt","Endast vid stora projekt","När risken är hög"], ratt:0},
      {q:"Vem är ytterst ansvarig för arbetsmiljön?", alts:["BAS-U","Byggherren","Entreprenören"], ratt:1},
    ], certifikat:{u1:"2026-02-15", u5:"2026-02-15"}},
  {id:"k2", titel:"Termitsvets — säker hantering", kategori:"Maskin", beskrivning:"Komplett genomgång av säker hantering av termitsvets från förberedelse till slutkontroll.", video:"https://www.exempel.se/termit-video", pdf:null, langd:"60 min",
    quiz:[
      {q:"Vilken reaktionstemperatur når termit?", alts:["1500°C","2000°C","2500°C"], ratt:2},
      {q:"Inom vilken radie krävs brandskydd?", alts:["5m","10m","15m"], ratt:1},
      {q:"Vad gör du vid läckage?", alts:["Försök stoppa","Utrym och kalla brandtjänst","Vänta och se"], ratt:1},
    ], certifikat:{u3:"2025-11-12", u7:"2025-09-20"}},
  {id:"k3", titel:"Spårarbete — grunderna", kategori:"Säkerhet", beskrivning:"Allt du behöver veta innan du arbetar på spår: tillstånd, skyddsavstånd, signaler.", video:"https://www.trafikverket.se/sparmod-video", pdf:"https://www.trafikverket.se/sparmod.pdf", langd:"30 min",
    quiz:[
      {q:"Vilket tillstånd krävs för spårtillträde?", alts:["A-skydd","T-tillstånd","Båda beroende på situation"], ratt:2},
      {q:"Minsta säkerhetsavstånd från räl vid passerande tåg i normalhastighet?", alts:["1,5m","2,2m","3,0m"], ratt:1},
    ], certifikat:{u1:"2026-01-08", u2:"2026-01-10", u3:"2025-12-15", u5:"2026-01-08", u6:"2026-01-12", u9:"2026-01-15"}},
  {id:"k4", titel:"Bedöm risker innan arbete", kategori:"Process", beskrivning:"Steg-för-steg-guide för daglig riskbedömning.", video:null, pdf:"https://www.exempel.se/risk.pdf", langd:"20 min",
    quiz:[
      {q:"När görs riskbedömning?", alts:["Vid behov","Varje morgon","En gång per vecka"], ratt:1},
      {q:"Vem ska kontrasignera?", alts:["Arbetare själv","Arbetsledare","Ingen"], ratt:1},
    ], certifikat:{u1:"2026-03-20", u5:"2026-03-20"}},
  {id:"k5", titel:"Personlig skyddsutrustning", kategori:"Säkerhet", beskrivning:"Vad ska du ha på dig och varför.", video:"https://www.exempel.se/ppe-video", pdf:null, langd:"15 min",
    quiz:[
      {q:"Vilken klass av skyddsväst krävs på spår?", alts:["Klass 1","Klass 2","Klass 3"], ratt:2},
      {q:"När krävs hörselskydd?", alts:["Alltid","Vid maskinarbete","Vid extrema fall"], ratt:1},
    ], certifikat:{u1:"2025-09-15", u2:"2025-09-15", u3:"2025-09-15", u5:"2025-09-15", u6:"2025-09-15", u7:"2025-09-15", u8:"2025-09-15", u9:"2025-09-15", u10:"2025-09-15"}},
]

// ═══════════════════════════════════════════════════════════════════════
// DOKUMENTNAV — komplett dokumentsystem för 6 kategorier.
// Mock-data + konstanter. Kopplad till anstallda, projekt, avvikelser.
// ═══════════════════════════════════════════════════════════════════════

// — ANSTÄLLDA — Kompetensbevis, certifikat, HMS-kort med giltighetsdatum
// Dem som har giltigTill ≤ 30 dagar bort flaggas med röd varning.
const INIT_ANSTALLD_DOKUMENT = [
  // u1 Erik Lindqvist (Spårarbetare)
  {id:"ad1",  anstalldId:"u1", typ:"Kompetensbevis", titel:"Spårtillträde STG",       utfardatDatum:"2024-06-15", giltigTill:"2026-06-15", utfardatAv:"Trafikverket",   filtyp:"pdf", storlek:"420 kB"},
  {id:"ad2",  anstalldId:"u1", typ:"HMS-kort",        titel:"ID06 HMS-kort",          utfardatDatum:"2023-08-20", giltigTill:"2028-08-20", utfardatAv:"BYN",            filtyp:"pdf", storlek:"310 kB"},
  {id:"ad3",  anstalldId:"u1", typ:"Certifikat",      titel:"Säkerhetsutbildning Spår", utfardatDatum:"2024-09-01", giltigTill:"2027-09-01", utfardatAv:"Trafikverket", filtyp:"pdf", storlek:"540 kB"},
  // u2 Anna Pettersson (Spårarbetare)
  {id:"ad4",  anstalldId:"u2", typ:"Kompetensbevis", titel:"Spårtillträde STG",       utfardatDatum:"2024-11-20", giltigTill:"2027-11-20", utfardatAv:"Trafikverket",   filtyp:"pdf", storlek:"420 kB"},
  {id:"ad5",  anstalldId:"u2", typ:"HMS-kort",        titel:"ID06 HMS-kort",          utfardatDatum:"2024-02-08", giltigTill:"2029-02-08", utfardatAv:"BYN",            filtyp:"pdf", storlek:"310 kB"},
  // u3 Marcus Berg (Termitsvetsare)
  {id:"ad6",  anstalldId:"u3", typ:"Kompetensbevis", titel:"Termitsvets certifikat",  utfardatDatum:"2024-02-10", giltigTill:"2027-02-10", utfardatAv:"SIS",            filtyp:"pdf", storlek:"380 kB"},
  {id:"ad7",  anstalldId:"u3", typ:"HMS-kort",        titel:"ID06 HMS-kort",          utfardatDatum:"2024-01-15", giltigTill:"2029-01-15", utfardatAv:"BYN",            filtyp:"pdf", storlek:"310 kB"},
  {id:"ad8",  anstalldId:"u3", typ:"Certifikat",      titel:"Heta arbeten",           utfardatDatum:"2023-06-01", giltigTill:"2026-06-01", utfardatAv:"BFAB",           filtyp:"pdf", storlek:"420 kB"}, // 7 dagar kvar — VARNING
  // u4 Sara Holm (Förare)
  {id:"ad9",  anstalldId:"u4", typ:"Förarbevis",      titel:"Förarbevis B + maskin",  utfardatDatum:"2023-04-20", giltigTill:"2025-12-15", utfardatAv:"Transportstyrelsen", filtyp:"pdf", storlek:"280 kB"}, // UTGÅNGEN
  {id:"ad10", anstalldId:"u4", typ:"HMS-kort",        titel:"ID06 HMS-kort",          utfardatDatum:"2024-04-05", giltigTill:"2029-04-05", utfardatAv:"BYN",            filtyp:"pdf", storlek:"310 kB"},
  // u5 Magnus Holm (Arbetsledare)
  {id:"ad11", anstalldId:"u5", typ:"Kompetensbevis", titel:"BAS-U certifikat",        utfardatDatum:"2024-03-15", giltigTill:"2027-03-15", utfardatAv:"BAS-U-organet",  filtyp:"pdf", storlek:"640 kB"},
  {id:"ad12", anstalldId:"u5", typ:"HMS-kort",        titel:"ID06 HMS-kort",          utfardatDatum:"2023-05-10", giltigTill:"2028-05-10", utfardatAv:"BYN",            filtyp:"pdf", storlek:"310 kB"},
  {id:"ad13", anstalldId:"u5", typ:"Certifikat",      titel:"BAS-P certifikat",       utfardatDatum:"2025-02-15", giltigTill:"2028-02-15", utfardatAv:"BAS-P-organet",  filtyp:"pdf", storlek:"620 kB"},
  // u6 Lars Andersson (Bangubbe)
  {id:"ad14", anstalldId:"u6", typ:"HMS-kort",        titel:"ID06 HMS-kort",          utfardatDatum:"2024-07-15", giltigTill:"2029-07-15", utfardatAv:"BYN",            filtyp:"pdf", storlek:"310 kB"},
  // u7 Henrik Ek (Termitsvetsare)
  {id:"ad15", anstalldId:"u7", typ:"Kompetensbevis", titel:"Termitsvets certifikat",  utfardatDatum:"2024-09-12", giltigTill:"2027-09-12", utfardatAv:"SIS",            filtyp:"pdf", storlek:"380 kB"},
  {id:"ad16", anstalldId:"u7", typ:"Certifikat",      titel:"Heta arbeten",           utfardatDatum:"2024-04-01", giltigTill:"2027-04-01", utfardatAv:"BFAB",           filtyp:"pdf", storlek:"420 kB"},
  // u8 Bo Svensson (Signaltekniker)
  {id:"ad17", anstalldId:"u8", typ:"Certifikat",      titel:"Signalteknikerprov",     utfardatDatum:"2025-01-10", giltigTill:"2030-01-10", utfardatAv:"Trafikverket",   filtyp:"pdf", storlek:"540 kB"},
  // u9 Anna Nilsson (Förare)
  {id:"ad18", anstalldId:"u9", typ:"Förarbevis",      titel:"Förarbevis CE",          utfardatDatum:"2024-03-22", giltigTill:"2026-06-22", utfardatAv:"Transportstyrelsen", filtyp:"pdf", storlek:"280 kB"}, // 28 dagar — VARNING
  // u10 Karin Strömberg (Spårarbetare)
  {id:"ad19", anstalldId:"u10", typ:"Kompetensbevis", titel:"Spårtillträde STG",      utfardatDatum:"2025-01-05", giltigTill:"2028-01-05", utfardatAv:"Trafikverket",   filtyp:"pdf", storlek:"420 kB"},
]

// — FORDON & MASKINER —
const INIT_FORDON = [
  {id:"f1", typ:"Lastbil",    modell:"Volvo FH 540",            regnr:"ABC123", arsmodell:2020, ansvarigId:"u4"},
  {id:"f2", typ:"Grävmaskin", modell:"Caterpillar 320D",        regnr:"GR-456", arsmodell:2018, ansvarigId:"u5"},
  {id:"f3", typ:"Rälsklipp",  modell:"Geismar SC1",             regnr:"GS-789", arsmodell:2022, ansvarigId:"u3"},
  {id:"f4", typ:"Termitform", modell:"Schweißtechnik T-100",    regnr:"TF-012", arsmodell:2023, ansvarigId:"u7"},
  {id:"f5", typ:"Servicebil", modell:"Toyota Hilux",            regnr:"XYZ789", arsmodell:2021, ansvarigId:"u9"},
  {id:"f6", typ:"Spårtramp",  modell:"Plasser & Theurer 09-32", regnr:"SP-345", arsmodell:2019, ansvarigId:"u5"},
]
const INIT_FORDON_DOKUMENT = [
  {id:"fd1", fordonId:"f1", typ:"Besiktningsintyg", titel:"Årlig besiktning 2026",    utfardatDatum:"2025-11-10", giltigTill:"2026-11-10", utfardatAv:"Bilprovningen",      filtyp:"pdf", storlek:"180 kB"},
  {id:"fd2", fordonId:"f1", typ:"Servicedokument",  titel:"Service 200000 km",        utfardatDatum:"2026-03-15", giltigTill:null,         utfardatAv:"Volvo Truck Center", filtyp:"pdf", storlek:"320 kB"},
  {id:"fd3", fordonId:"f2", typ:"Besiktningsintyg", titel:"Maskinbesiktning 2026",    utfardatDatum:"2025-06-01", giltigTill:"2026-06-01", utfardatAv:"Inspecta",           filtyp:"pdf", storlek:"220 kB"}, // 7 dagar — VARNING
  {id:"fd4", fordonId:"f2", typ:"Servicedokument",  titel:"Service 8000h",            utfardatDatum:"2026-02-12", giltigTill:null,         utfardatAv:"Caterpillar Sweden", filtyp:"pdf", storlek:"450 kB"},
  {id:"fd5", fordonId:"f3", typ:"Besiktningsintyg", titel:"Säkerhetsbesiktning 2027", utfardatDatum:"2026-04-20", giltigTill:"2027-04-20", utfardatAv:"Geismar Service",    filtyp:"pdf", storlek:"180 kB"},
  {id:"fd6", fordonId:"f5", typ:"Besiktningsintyg", titel:"Årlig besiktning",         utfardatDatum:"2025-05-20", giltigTill:"2026-05-20", utfardatAv:"Bilprovningen",      filtyp:"pdf", storlek:"180 kB"}, // UTGÅNGEN
  {id:"fd7", fordonId:"f6", typ:"Besiktningsintyg", titel:"Säkerhetsbesiktning",      utfardatDatum:"2025-09-10", giltigTill:"2026-09-10", utfardatAv:"Plasser Service",    filtyp:"pdf", storlek:"260 kB"},
]

// — PROJEKT — arbetsorder, ritningar, tillstånd, BEST-anmälningar, besiktningsprotokoll
const PROJEKT_DOK_TYPER = ["Arbetsorder", "Ritning", "Tillstånd", "BEST-anmälan", "Besiktningsprotokoll"]
const INIT_PROJEKT_DOKUMENT = [
  // pj1 Botniabanan
  {id:"pd1",  projektId:"pj1", typ:"Arbetsorder",          titel:"Arbetsorder Botniabanan V20-26", uppdaterad:"2026-05-12", version:"2.0", filtyp:"pdf", storlek:"680 kB"},
  {id:"pd2",  projektId:"pj1", typ:"Ritning",              titel:"Ritning rälsparti KM45-47",      uppdaterad:"2026-04-20", version:"1.3", filtyp:"pdf", storlek:"2.4 MB"},
  {id:"pd3",  projektId:"pj1", typ:"Tillstånd",            titel:"T-tillstånd 2026-05-20",         uppdaterad:"2026-05-19", version:"1.0", filtyp:"pdf", storlek:"280 kB"},
  {id:"pd4",  projektId:"pj1", typ:"BEST-anmälan",         titel:"BEST-anmälan KM45-47",           uppdaterad:"2026-04-10", version:"1.0", filtyp:"pdf", storlek:"340 kB"},
  // pj2 Falun
  {id:"pd5",  projektId:"pj2", typ:"Arbetsorder",          titel:"Arbetsorder Falun bangård",      uppdaterad:"2026-05-08", version:"1.1", filtyp:"pdf", storlek:"540 kB"},
  {id:"pd6",  projektId:"pj2", typ:"Ritning",              titel:"Ritning bangård norra",          uppdaterad:"2026-03-25", version:"2.0", filtyp:"pdf", storlek:"1.8 MB"},
  {id:"pd7",  projektId:"pj2", typ:"Besiktningsprotokoll", titel:"Besiktning förvecka",            uppdaterad:"2026-05-15", version:"1.0", filtyp:"pdf", storlek:"420 kB"},
  // pj3 Sundsvall
  {id:"pd8",  projektId:"pj3", typ:"Arbetsorder",          titel:"Arbetsorder Sundsvall växel",    uppdaterad:"2026-04-30", version:"1.0", filtyp:"pdf", storlek:"540 kB"},
  {id:"pd9",  projektId:"pj3", typ:"Tillstånd",            titel:"A-skyddstillstånd",              uppdaterad:"2026-04-28", version:"1.0", filtyp:"pdf", storlek:"260 kB"},
  // pj4 Härnösand
  {id:"pd10", projektId:"pj4", typ:"Arbetsorder",          titel:"Arbetsorder Härnösand depot",    uppdaterad:"2026-05-01", version:"1.5", filtyp:"pdf", storlek:"580 kB"},
  {id:"pd11", projektId:"pj4", typ:"Ritning",              titel:"Ritning depotområde",            uppdaterad:"2026-04-15", version:"3.0", filtyp:"pdf", storlek:"3.2 MB"},
  // pj5 Stockholm
  {id:"pd12", projektId:"pj5", typ:"Arbetsorder",          titel:"Arbetsorder Stockholm C",        uppdaterad:"2026-05-18", version:"1.0", filtyp:"pdf", storlek:"620 kB"},
  {id:"pd13", projektId:"pj5", typ:"BEST-anmälan",         titel:"BEST-anmälan central",           uppdaterad:"2026-05-10", version:"1.0", filtyp:"pdf", storlek:"380 kB"},
]

// — HMS — riskbedömningar, incidentrapporter (kopplade till avvikelser), skyddsronder, handlingsplaner
const HMS_TYPER = ["Riskbedömning", "Incidentrapport", "Skyddsrond", "Handlingsplan"]
const INIT_HMS_DOKUMENT = [
  {id:"h1", typ:"Riskbedömning",  titel:"Riskbedömning termitsvets Botniabanan", projektId:"pj1", datum:"2026-05-20", forfattare:"Magnus Holm",    version:"1.0", filtyp:"pdf", storlek:"480 kB"},
  {id:"h2", typ:"Riskbedömning",  titel:"Riskbedömning Falun bangård",          projektId:"pj2", datum:"2026-05-08", forfattare:"Magnus Holm",    version:"1.1", filtyp:"pdf", storlek:"460 kB"},
  {id:"h3", typ:"Riskbedömning",  titel:"Riskbedömning växelarbete Sundsvall",  projektId:"pj3", datum:"2026-04-30", forfattare:"Magnus Holm",    version:"1.0", filtyp:"pdf", storlek:"420 kB"},
  {id:"h4", typ:"Skyddsrond",     titel:"Skyddsrond V21 Härnösand",             projektId:"pj4", datum:"2026-05-19", forfattare:"Anna Bergström", version:"1.0", filtyp:"pdf", storlek:"320 kB"},
  {id:"h5", typ:"Skyddsrond",     titel:"Skyddsrond V20 Botniabanan",           projektId:"pj1", datum:"2026-05-12", forfattare:"Anna Bergström", version:"1.0", filtyp:"pdf", storlek:"320 kB"},
  {id:"h6", typ:"Handlingsplan",  titel:"Handlingsplan termitsvets-säkerhet",   projektId:null,  datum:"2026-05-15", forfattare:"Anna Bergström", version:"2.0", filtyp:"pdf", storlek:"540 kB"},
]

// — FÖRETAG — företagsavtal, försäkringar, policies, organisationsschema
const FORETAG_DOK_TYPER = ["Företagsavtal", "Försäkring", "Policy", "Rutin", "Organisationsschema"]
const INIT_FORETAG_DOKUMENT = [
  {id:"fg1", typ:"Företagsavtal",      titel:"Trafikverket ramavtal 2026",          uppdaterad:"2026-01-08", version:"1.0", filtyp:"pdf", storlek:"3.4 MB"},
  {id:"fg2", typ:"Företagsavtal",      titel:"Avtal Jernhusen 2026-2028",           uppdaterad:"2026-03-22", version:"1.2", filtyp:"pdf", storlek:"2.8 MB"},
  {id:"fg3", typ:"Försäkring",         titel:"Företagsförsäkring 2026",             uppdaterad:"2026-01-10", version:"1.0", filtyp:"pdf", storlek:"680 kB"},
  {id:"fg4", typ:"Försäkring",         titel:"Maskinförsäkring",                    uppdaterad:"2026-02-15", version:"1.0", filtyp:"pdf", storlek:"540 kB"},
  {id:"fg5", typ:"Policy",             titel:"Företagspolicy 2026",                 uppdaterad:"2026-01-15", version:"3.0", filtyp:"pdf", storlek:"1.2 MB"},
  {id:"fg6", typ:"Policy",             titel:"Visselblåsarpolicy",                  uppdaterad:"2025-09-01", version:"1.0", filtyp:"pdf", storlek:"380 kB"},
  {id:"fg7", typ:"Rutin",              titel:"Personalhandbok 2026",                uppdaterad:"2026-01-15", version:"1.0", filtyp:"pdf", storlek:"4.2 MB"},
  {id:"fg8", typ:"Organisationsschema", titel:"Org-schema Lindqvist Rail AB 2026", uppdaterad:"2026-02-01", version:"1.0", filtyp:"pdf", storlek:"540 kB"},
]

// ═══════════════════════════════════════════════════════════════════════
// PERSONALREGISTER — utökade profiler per anställd
// ═══════════════════════════════════════════════════════════════════════
const ERFARENHET_TYPER = [
  "Termitsvetsning", "Rälsbyte", "Sliperbyte", "Spårjustering",
  "Växelarbete", "Signalarbete", "Kontaktledning", "Tunnelarbete",
  "Brobygge", "Underhåll", "Snöröjning", "Besiktning"
]
const MASKIN_TYPER = [
  "Lastbil B", "Lastbil CE", "Grävmaskin", "Hjullastare",
  "Rälsklipp", "Spårtramp", "Termitform", "Mätvagn", "Servicebil"
]
// Per anställd — utökad personalinformation. Nyckel = anstalldId från INIT_KONTAKTER.
const INIT_ANSTALLDA_PROFIL = {
  u1: {
    anstallningsdatum:"2019-08-15", ort:"Härnösand",
    anhorig:{namn:"Karin Lindqvist", tel:"070-111 22 33", relation:"Maka"},
    erfarenheter:[{typ:"Spårjustering",ar:8},{typ:"Rälsbyte",ar:6},{typ:"Underhåll",ar:10},{typ:"Sliperbyte",ar:4}],
    maskiner:["Lastbil B","Grävmaskin"],
  },
  u2: {
    anstallningsdatum:"2022-03-01", ort:"Sundsvall",
    anhorig:{namn:"Per Pettersson", tel:"070-222 33 44", relation:"Make"},
    erfarenheter:[{typ:"Rälsbyte",ar:3},{typ:"Spårjustering",ar:4}],
    maskiner:["Lastbil B"],
  },
  u3: {
    anstallningsdatum:"2014-05-12", ort:"Falun",
    anhorig:{namn:"Lisa Berg", tel:"070-333 44 55", relation:"Sambo"},
    erfarenheter:[{typ:"Termitsvetsning",ar:12},{typ:"Underhåll",ar:8},{typ:"Rälsbyte",ar:5},{typ:"Besiktning",ar:3}],
    maskiner:["Lastbil B","Termitform"],
  },
  u4: {
    anstallningsdatum:"2020-09-01", ort:"Stockholm",
    anhorig:{namn:"Tomas Holm", tel:"070-444 55 66", relation:"Far"},
    erfarenheter:[{typ:"Underhåll",ar:4},{typ:"Snöröjning",ar:5}],
    maskiner:["Lastbil B","Lastbil CE","Grävmaskin","Servicebil"],
  },
  u5: {
    anstallningsdatum:"2010-01-15", ort:"Sundsvall",
    anhorig:{namn:"Eva Holm", tel:"070-555 66 77", relation:"Maka"},
    erfarenheter:[{typ:"Underhåll",ar:15},{typ:"Rälsbyte",ar:12},{typ:"Spårjustering",ar:10},{typ:"Besiktning",ar:8},{typ:"Växelarbete",ar:6}],
    maskiner:["Lastbil B","Grävmaskin","Rälsklipp","Hjullastare"],
  },
  u6: {
    anstallningsdatum:"2023-06-01", ort:"Kramfors",
    anhorig:{namn:"Stina Andersson", tel:"070-666 77 88", relation:"Maka"},
    erfarenheter:[{typ:"Underhåll",ar:2},{typ:"Rälsbyte",ar:2}],
    maskiner:["Lastbil B"],
  },
  u7: {
    anstallningsdatum:"2017-11-20", ort:"Falun",
    anhorig:{namn:"Maria Ek", tel:"070-777 88 99", relation:"Maka"},
    erfarenheter:[{typ:"Termitsvetsning",ar:8},{typ:"Rälsbyte",ar:5},{typ:"Underhåll",ar:6}],
    maskiner:["Lastbil B","Termitform"],
  },
  u8: {
    anstallningsdatum:"2015-04-10", ort:"Härnösand",
    anhorig:{namn:"Bengt Svensson", tel:"070-888 99 00", relation:"Bror"},
    erfarenheter:[{typ:"Signalarbete",ar:11},{typ:"Kontaktledning",ar:7},{typ:"Besiktning",ar:9}],
    maskiner:["Lastbil B","Mätvagn"],
  },
  u9: {
    anstallningsdatum:"2021-08-15", ort:"Stockholm",
    anhorig:{namn:"Olle Nilsson", tel:"070-999 00 11", relation:"Make"},
    erfarenheter:[{typ:"Snöröjning",ar:4},{typ:"Underhåll",ar:3}],
    maskiner:["Lastbil B","Lastbil CE","Hjullastare","Servicebil"],
  },
  u10: {
    anstallningsdatum:"2024-09-01", ort:"Sundsvall",
    anhorig:{namn:"Anders Strömberg", tel:"072-100 22 33", relation:"Far"},
    erfarenheter:[{typ:"Rälsbyte",ar:1},{typ:"Spårjustering",ar:1}],
    maskiner:["Lastbil B"],
  },
}

// ═══════════════════════════════════════════════════════════════════════
// INVENTARIE — maskiner, fordon, verktyg, skydd, övrigt
// ═══════════════════════════════════════════════════════════════════════
const INVENTARIE_KATEGORIER = ["Maskiner", "Fordon", "Verktyg", "Skyddsutrustning", "Övrigt"]
const INVENTARIE_STATUS = ["Tillgänglig", "Ute på projekt", "Service", "Trasig"]

const INIT_INVENTARIE = [
  // Maskiner
  {id:"inv1", namn:"Plasser & Theurer Stopptopp 09-32", kategori:"Maskiner", serienr:"PT-001-2019", emoji:"🚂", farg:"#1565c0",
   status:"Ute på projekt", aktivProjektId:"pj1", ansvarigId:"u5", senasteService:"2026-03-15", nastaService:"2026-09-15",
   historik:[{projektId:"pj3", fran:"2025-09-01", till:"2026-03-31"}]},
  {id:"inv2", namn:"Geismar Ballastplog GP-500", kategori:"Maskiner", serienr:"BP-002-2021", emoji:"⛏", farg:"#2e7d32",
   status:"Tillgänglig", aktivProjektId:null, ansvarigId:"u5", senasteService:"2026-02-10", nastaService:"2026-08-10",
   historik:[{projektId:"pj2", fran:"2026-01-15", till:"2026-04-01"}]},
  {id:"inv3", namn:"ESAB Svetsaggregat Mig-400", kategori:"Maskiner", serienr:"SV-003-2022", emoji:"⚡", farg:"#b88a00",
   status:"Service", aktivProjektId:null, ansvarigId:"u7", senasteService:"2026-05-20", nastaService:"2026-06-20",
   historik:[]},
  {id:"inv4", namn:"Robel Rälslyftare RM-7000", kategori:"Maskiner", serienr:"RL-004-2020", emoji:"🏗", farg:"#5a7089",
   status:"Trasig", aktivProjektId:null, ansvarigId:"u5", senasteService:"2026-01-10", nastaService:"2026-04-10",
   trasigtSedan:"2026-05-23", trasigtAv:"Magnus Holm", trasigtKommentar:"Hydraulikläckage vid lyftarmen.",
   historik:[{projektId:"pj1", fran:"2026-02-01", till:"2026-04-15"}]},
  // Fordon
  {id:"inv5", namn:"Mercedes Unimog Tvåvägs", kategori:"Fordon", serienr:"TV-005-2018", emoji:"🚛", farg:"#c62828",
   status:"Ute på projekt", aktivProjektId:"pj4", ansvarigId:"u4", senasteService:"2026-04-05", nastaService:"2026-10-05",
   historik:[]},
  {id:"inv6", namn:"Liebherr Rälsvagn LR-1100", kategori:"Fordon", serienr:"RV-006-2021", emoji:"🚊", farg:"#1565c0",
   status:"Tillgänglig", aktivProjektId:null, ansvarigId:"u9", senasteService:"2026-03-20", nastaService:"2026-09-20",
   historik:[]},
  {id:"inv7", namn:"Caterpillar 320D Grävmaskin", kategori:"Fordon", serienr:"GR-007-2018", emoji:"🚜", farg:"#b88a00",
   status:"Ute på projekt", aktivProjektId:"pj2", ansvarigId:"u5", senasteService:"2026-02-12", nastaService:"2026-08-12",
   historik:[]},
  // Verktyg
  {id:"inv8", namn:"Befästare 45 kg #1", kategori:"Verktyg", serienr:"VB45-008", emoji:"🔨", farg:"#5a7089",
   status:"Tillgänglig", aktivProjektId:null, ansvarigId:"u3", senasteService:"2026-04-10", nastaService:"2026-10-10",
   historik:[]},
  {id:"inv9", namn:"Befästare 60 kg #1", kategori:"Verktyg", serienr:"VB60-009", emoji:"🔨", farg:"#5a7089",
   status:"Ute på projekt", aktivProjektId:"pj1", ansvarigId:"u3", senasteService:"2026-04-10", nastaService:"2026-10-10",
   historik:[]},
  {id:"inv10", namn:"Atlas Copco Hydraulhammare", kategori:"Verktyg", serienr:"HH-010", emoji:"💥", farg:"#c62828",
   status:"Tillgänglig", aktivProjektId:null, ansvarigId:"u5", senasteService:"2026-02-15", nastaService:"2026-05-15", // Service försenad
   historik:[]},
  {id:"inv11", namn:"Robel Rälsspikslägga RS-26", kategori:"Verktyg", serienr:"RS-011", emoji:"🔧", farg:"#2e7d32",
   status:"Ute på projekt", aktivProjektId:"pj2", ansvarigId:"u5", senasteService:"2026-04-25", nastaService:"2026-10-25",
   historik:[]},
  // Skyddsutrustning
  {id:"inv12", namn:"Skyddshjälmar (lager 20 st)", kategori:"Skyddsutrustning", serienr:"PPE-012", emoji:"⛑", farg:"#b88a00",
   status:"Tillgänglig", aktivProjektId:null, ansvarigId:"u5", senasteService:"2026-01-20", nastaService:"2027-01-20",
   historik:[]},
  {id:"inv13", namn:"Varselvästar klass 3 (lager 30 st)", kategori:"Skyddsutrustning", serienr:"PPE-013", emoji:"🦺", farg:"#b88a00",
   status:"Tillgänglig", aktivProjektId:null, ansvarigId:"u5", senasteService:null, nastaService:null,
   historik:[]},
  {id:"inv14", namn:"Gasdetektorer Dräger (5 st)", kategori:"Skyddsutrustning", serienr:"GD-014", emoji:"📡", farg:"#1565c0",
   status:"Ute på projekt", aktivProjektId:"pj1", ansvarigId:"u7", senasteService:"2026-04-15", nastaService:"2026-10-15",
   historik:[]},
  // Övrigt
  {id:"inv15", namn:"Honda EU22i Generator", kategori:"Övrigt", serienr:"GE-015", emoji:"⚙", farg:"#5a7089",
   status:"Tillgänglig", aktivProjektId:null, ansvarigId:"u4", senasteService:"2026-03-01", nastaService:"2026-09-01",
   historik:[]},
  {id:"inv16", namn:"Arbetstält 6×3 m", kategori:"Övrigt", serienr:"TL-016", emoji:"⛺", farg:"#2e7d32",
   status:"Ute på projekt", aktivProjektId:"pj2", ansvarigId:"u5", senasteService:null, nastaService:null,
   historik:[]},
]

// ═══════════════════════════════════════════════════════════════════════
// PUBLIK FÖRETAGSPROFIL — företagslistan + recensioner + tidigare jobb
// ═══════════════════════════════════════════════════════════════════════
const INIT_FORETAG = [
  {id:"co1", namn:"NordRail AB", typ:"Entreprenör", orgNr:"556789-1234",
   logoEmoji:"🚂", logoBg:"#1565c0", ort:"Härnösand",
   kontaktNamn:"Magnus Holm", kontaktTel:"070-567 89 01", kontaktEmail:"info@nordrail.se",
   beskrivning:"NordRail AB är en ledande entreprenör inom järnvägsinfrastruktur i mellersta och norra Sverige. Vi specialiserar oss på spårarbete, termitsvetsning, signalarbete och underhåll av järnvägsinfrastruktur. Med över 15 års erfarenhet och certifierad personal levererar vi högkvalitativa lösningar — alltid i tid.",
   grundat:2010, antalAnstallda:13},
  {id:"co2", namn:"Lindqvist Rail AB", typ:"Entreprenör & Beställare", orgNr:"556123-4567",
   logoEmoji:"🛤", logoBg:"#2e7d32", ort:"Stockholm",
   kontaktNamn:"Anna Bergström", kontaktTel:"070-100 20 30", kontaktEmail:"anna.b@lindqvistrail.se",
   beskrivning:"Lindqvist Rail AB är ett heltäckande järnvägsbolag som både utför entreprenadarbeten och köper in tjänster från underleverantörer. Vi specialiserar oss på storskalig spårförnyelse, växelarbete och projektledning.",
   grundat:2005, antalAnstallda:42},
  {id:"co3", namn:"Spårbygg Norr AB", typ:"Entreprenör", orgNr:"556456-7890",
   logoEmoji:"🚊", logoBg:"#c62828", ort:"Luleå",
   kontaktNamn:"Karl Andersson", kontaktTel:"070-200 30 40", kontaktEmail:"info@sparbygg.se",
   beskrivning:"Spårbygg Norr fokuserar på rälsbyte och underhåll i norra Sverige. Med moderna maskiner och lokal förankring levererar vi effektiva lösningar.",
   grundat:2015, antalAnstallda:18},
  {id:"co4", namn:"Banservice Mitt AB", typ:"Entreprenör", orgNr:"556321-9876",
   logoEmoji:"🔧", logoBg:"#b88a00", ort:"Örebro",
   kontaktNamn:"Lisa Eriksson", kontaktTel:"070-300 40 50", kontaktEmail:"lisa@banservice.se",
   beskrivning:"Banservice Mitt erbjuder järnvägsunderhåll, besiktningar och småjobb. Snabb respons och flexibla lösningar för Mellansverige.",
   grundat:2018, antalAnstallda:9},
]

// Anställda → företag-mappning. Anställda u1-u13 tillhör NordRail (co1).
function foretagForAnstalld(anstalldId) { return "co1" }

// Recensioner per företag — från beställare efter avslutade projekt.
const INIT_RECENSIONER = [
  {id:"r1", foretagId:"co1", forfattareNamn:"Trafikverket — Norra Mellansverige", projektNamn:"Botniabanan etapp 3", datum:"2026-04-20", betyg:{kvalitet:5, punktlighet:5, kommunikation:4}, kommentar:"NordRail levererade exakt enligt plan. Termitsvetsningarna höll hög kvalitet och teamet visade stort engagemang under hela projektet. Rekommenderas varmt."},
  {id:"r2", foretagId:"co1", forfattareNamn:"Jernhusen AB", projektNamn:"Sundsvall växel-renovering", datum:"2026-02-15", betyg:{kvalitet:5, punktlighet:4, kommunikation:5}, kommentar:"Mycket professionellt utfört arbete. Magnus och hans team var tydliga i kommunikationen och löste oväntade problem effektivt."},
  {id:"r3", foretagId:"co1", forfattareNamn:"Region Västernorrland", projektNamn:"Härnösand depot-spår", datum:"2025-11-10", betyg:{kvalitet:4, punktlighet:5, kommunikation:4}, kommentar:"Bra entreprenör med kompetent personal. Hade gärna kunnat få fler statusuppdateringar under projektets gång."},
  {id:"r4", foretagId:"co1", forfattareNamn:"Trafikverket — Östra Sverige", projektNamn:"Bergslagen sliperbyte", datum:"2025-08-22", betyg:{kvalitet:5, punktlighet:5, kommunikation:5}, kommentar:"Toppenjobb. Snabbt och prisvärt."},
  {id:"r5", foretagId:"co2", forfattareNamn:"Trafikverket — Östra Sverige", projektNamn:"Stockholm C växelarbete", datum:"2026-03-01", betyg:{kvalitet:5, punktlighet:4, kommunikation:5}, kommentar:"Lindqvist har bra projektledning och håller deadlines. Stark organisation."},
  {id:"r6", foretagId:"co2", forfattareNamn:"SJ Fastigheter", projektNamn:"Stockholm C perrong-renovering", datum:"2025-12-05", betyg:{kvalitet:4, punktlighet:4, kommunikation:4}, kommentar:"Allt enligt plan, inga större problem."},
  {id:"r7", foretagId:"co3", forfattareNamn:"Trafikverket — Norra Norrland", projektNamn:"Luleå växelarbete", datum:"2026-01-20", betyg:{kvalitet:4, punktlighet:5, kommunikation:4}, kommentar:"Effektivt utförande och bra koll på säkerhet. Vi anlitar dem gärna igen."},
  {id:"r8", foretagId:"co4", forfattareNamn:"Trafikverket — Östra Mellansverige", projektNamn:"Småjobb V12 Örebro", datum:"2026-03-22", betyg:{kvalitet:4, punktlighet:4, kommunikation:4}, kommentar:"Snabb leverans, godtagbar kvalitet."},
]

// Tidigare avslutade projekt per företag — visas i publik profil
const INIT_FORETAG_PROJEKT = {
  co1:[
    {namn:"Sundsvall växel-renovering",   plats:"Sundsvall C",       typ:"Växelarbete + signalarbete",   period:"2025-09 — 2026-02"},
    {namn:"Härnösand depot-spår",         plats:"Härnösand depot",   typ:"Sliperbyte",                   period:"2025-05 — 2025-10"},
    {namn:"Bergslagen sliperbyte",        plats:"Bergslagen",        typ:"Sliperbyte + ballast",         period:"2025-03 — 2025-08"},
    {namn:"Luleå-Boden vinterunderhåll",  plats:"Luleå/Boden",       typ:"Snöröjning + underhåll",       period:"2024-11 — 2025-03"},
    {namn:"Östersund växelarbete",        plats:"Östersund",         typ:"Växelarbete",                  period:"2024-06 — 2024-09"},
  ],
  co2:[
    {namn:"Stockholm C växelarbete",      plats:"Stockholm Central", typ:"Växelarbete",                  period:"2025-11 — 2026-02"},
    {namn:"Stockholm C perrong",          plats:"Stockholm Central", typ:"Perrongrenovering",            period:"2025-08 — 2025-11"},
    {namn:"Mälardalsbanan etapp 2",       plats:"Stockholm/Västerås", typ:"Spårförnyelse",                period:"2025-01 — 2025-07"},
    {namn:"Uppsala bangård",              plats:"Uppsala",           typ:"Bangårdsarbete",               period:"2024-09 — 2024-12"},
  ],
  co3:[
    {namn:"Luleå växelarbete",            plats:"Luleå",             typ:"Växelarbete",                  period:"2025-10 — 2026-01"},
    {namn:"Kiruna järnmalmsspår",         plats:"Kiruna",            typ:"Rälsbyte",                     period:"2025-04 — 2025-08"},
  ],
  co4:[
    {namn:"Småjobb V12 Örebro",           plats:"Örebro",            typ:"Underhåll",                    period:"2026-03 — 2026-03"},
    {namn:"Hallsberg-Mjölby underhåll",   plats:"Hallsberg/Mjölby",  typ:"Generellt underhåll",          period:"2025-09 — 2026-01"},
  ],
}

const ARBETEN = [
  {id:"1",plats:"Härnösand station",uppg:"Termitsvetsning spår 3",tid:"06:00–16:00",mat:"Termitpatroner x4, skyddshandskar",status:"pagaende"},
  {id:"2",plats:"Kramfors depot",uppg:"Rälsbyte nordvästra spåret",tid:"07:00–15:00",mat:"Räls 60E1, klammer x20",status:"kommande"},
  {id:"3",plats:"Sundsvall C",uppg:"Spårjustering perrong 2",tid:"06:00–14:00",mat:"Ballast 2t, stampar",status:"klar"},
]

const DAGORDER_INIT = {proj:"Botniabanan etapp 3",plats:"Härnösand station, spår 3",uppg:"Termitsvetsning av rälsskarv vid km 142+450",tid:"06:00–16:00 (lunch 10:00–10:30)",mat:"Termitpatroner x4, formar 60E1, tändare, propan",coords:"62.6324,17.9395",datum:"2026-05-25"}

const INIT_AVVIKELSER = [
  {id:"1",projektId:"pj1",text:"Sprickbildning i räls vid km 142+120, behöver åtgärdas inom 48h",av:"Marcus Berg",datum:"2026-05-24",status:"open"},
  {id:"2",projektId:"pj4",text:"Saknad skyddsutrustning (hjälm) hos extern leverantör",av:"Erik Lindqvist",datum:"2026-05-25",status:"open"},
  {id:"3",projektId:"pj2",text:"Vattenskada i förrådscontainer, material blött",av:"Sara Johansson",datum:"2026-05-22",status:"closed"},
  // Demo-data för avvikelsesflödet — delegerade till arbetare av arbetsledare
  // #4: Inkommen → Delegerad. Marcus ska markera sedd härnäst.
  {id:"4",projektId:"pj3",text:"Felaktig signalering vid växel 23, sporadiskt växelproblem som kan orsaka driftstopp",av:"Anna Pettersson",datum:"2026-05-23",status:"open",ansvarigId:"u3",ansvarigNamn:"Marcus Berg",delegeradAv:"Magnus Holm",delegeradTid:"2026-05-23 16:00",km:"K142+450",gps:{lat:62.6324,lng:17.9395}},
  // #5: Inkommen → Delegerad → Sedd. Erik L ska markera klar härnäst.
  {id:"5",projektId:"pj1",text:"Skadad spårsläde vid km 89, riskerar avspårning vid hög hastighet",av:"Marcus Berg",datum:"2026-05-24",status:"open",ansvarigId:"u1",ansvarigNamn:"Erik Lindqvist",delegeradAv:"Magnus Holm",delegeradTid:"2026-05-24 09:30",seddTid:"2026-05-24 11:00",km:"K89+200"},
  // #6: Komplett flöde — Inkommen → Delegerad → Sedd → Klar.
  {id:"6",projektId:"pj1",text:"Avbrott i kontaktledning vid Sundsvall C, åtgärdat av nattskift",av:"Bo Svensson",datum:"2026-05-20",status:"closed",ansvarigId:"u3",ansvarigNamn:"Marcus Berg",delegeradAv:"Magnus Holm",delegeradTid:"2026-05-20 11:00",seddTid:"2026-05-20 13:00",atgardadAv:"Marcus Berg",atgardadTid:"2026-05-21 14:30",km:"K0+050"},
]

const INIT_ANSOKNINGAR = [
  {id:"a1",avropId:"m1",foretag:"NordRail AB",arbetsledare:"Magnus Holm",tel:"070-555 66 77",msg:"Vi har ett 8-mans team med två erfarna spårtekniker som jobbat med liknande bangårdsarbeten i Borlänge förra året. Tillgängliga från 2026-06-15. Egen mätutrustning och stamputrustning.",team:["Erik Lindqvist","Sara Johansson","Marcus Berg","Anna Nilsson"],datum:"2026-05-22",status:"open"},
  {id:"a2",avropId:"m1",foretag:"BanService Norr AB",arbetsledare:"Lars Andersson",tel:"070-666 77 88",msg:"Specialiserade på bangårdsarbete med egen mätutrustning. Kan starta omgående med 6 mans team. Referenser från Trafikverket finns.",team:["Per Olsson","Karin Berg","Tom Lindholm"],datum:"2026-05-23",status:"open"},
  {id:"a3",avropId:"m1",foretag:"Mid-Sweden Rail",arbetsledare:"Henrik Ek",tel:"070-888 99 00",msg:"Lokala från Falun, snabba inställelsetider. Gjorde spårjustering på samma bangård 2024.",team:["Johan Lind","Eva Persson","Tom Karlsson"],datum:"2026-05-24",status:"open"},
  {id:"a4",avropId:"m2",foretag:"NordRail AB",arbetsledare:"Magnus Holm",tel:"070-555 66 77",msg:"BVS-certifierade signaltekniker tillgängliga. 4-mans team specialiserade på nattskift och signalanläggningar.",team:["Bo Svensson","Lena Hagberg","Karl Forsberg","Maria Sjögren"],datum:"2026-05-25",status:"open"},
]

// Ändringar som arbetsledare publicerar till dagordern
// kvittenser-mappen: { [anstalldId]: { sedd: boolean, tid?: "HH:MM" } } — visas i Projektkoll under "Kvitterade ändringar"
const INIT_ANDRINGAR = [
  {id:"1",text:"Ny säkerhetszon gäller från idag — 25m istf 15m",datum:"2026-05-25",av:"Magnus Holm",sedd:false,
   kvittenser:{"1":{sedd:false},"2":{sedd:true,tid:"07:11"},"3":{sedd:true,tid:"06:23"},"4":{sedd:false}}},
]

// — Demo-notiser för arbetsledare som inte kan deriveras ur befintlig data —
// (kan-ej-utfora kommer från arbetare som rapporterat ej-utförbart jobb,
//  nytt-dokument kommer från företaget som publicerat ett dokument-kvitto)
const INIT_ARBETSLEDARE_EXTRA_NOTISER = [
  {
    id:"alex1",
    typ:"kan-ej-utfora",
    titel:"💼 Arbetare kan ej utföra jobb",
    meddelande:"Marcus Berg har anmält att han inte kan utföra termitsvetsning vid km 142+450 imorgon på grund av sjukdom. Bekräftat sjukintyg insänt. Behöver omfördelas.",
    av:"Marcus Berg",
    tid:"2026-05-25 08:42",
    kommentar:"Förkylning sedan i lördags, läkarintyg bifogat i HR-systemet.",
  },
  {
    id:"alex2",
    typ:"nytt-dokument",
    titel:"📄 Nytt dokument kräver kvittering",
    meddelande:"Reviderad säkerhetspolicy v3.2 publicerad — kvittering krävs av alla arbetsledare senast 2026-05-31. Ändringar gäller säkerhetszon vid spårnära arbete.",
    av:"NordRail AB · HR",
    tid:"2026-05-23 10:00",
    dokumentId:"hms-3",
  },
]

// Kompetenser per roll (visas på Profil för Ute på spåret-roller)
const KOMPETENSER = {
  arbetare:    ["Bangubbar (grundutbildning)","Termitsvetsning","BVS-certifierad","Säkerhet på väg","Halkbana lastbil","Heta arbeten"],
  arbetsledare:["Arbetsledning järnvägsarbete","Spårjustering & växlar","Säkerhetschef BVS","BVS-godkänd handledare","Maskinförarbevis","HLR & första hjälpen"],
}

const TIDIGARE_JOBB = {
  arbetare: [
    {proj:"Botniabanan etapp 2",          plats:"Härnösand",            period:"2025-03 → 2025-06", roll:"Bangubbar"},
    {proj:"Stockholm C nattunderhåll",    plats:"Stockholm",            period:"2024-11 → 2025-02", roll:"Bangubbar"},
    {proj:"Malmbanan vinterunderhåll",    plats:"Kiruna",               period:"2024-01 → 2024-03", roll:"Bangubbar"},
  ],
  arbetsledare: [
    {proj:"Botniabanan etapp 2",          plats:"Härnösand–Kramfors",   period:"2025-03 → 2025-06", roll:"Arbetsledare"},
    {proj:"Mälarbanan utbyte",            plats:"Sundbyberg",           period:"2024-08 → 2024-12", roll:"Arbetsledare"},
    {proj:"Citybanan slutförande",        plats:"Stockholm",            period:"2024-01 → 2024-07", roll:"Arbetsledare"},
  ],
}

const DEMO_USERS = {
  foretag:         {name:"Anna Bergström", role:"foretag",       company:"Lindqvist Rail AB"},
  arbetsledare:    {name:"Magnus Holm",    role:"arbetsledare",  company:"NordRail AB"},
  arbetare:        {name:"Marcus Berg",    role:"arbetare",      company:"NordRail AB"},
}

const DEFAULT_SCREEN = {foretag:"hem",arbetsledare:"dagorder",arbetare:"dagorder"}

// ── Styles ──────────────────────────────────────────────────
const card = {background:C.bg2,border:`1px solid ${C.b}`,borderRadius:14,padding:"16px 18px"}
const inp = {background:C.bg3,border:`1px solid ${C.b}`,borderRadius:8,color:C.tx,padding:"13px 15px",width:"100%",fontSize:15,outline:"none",fontFamily:"inherit"}
const btnP = {display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"15px",borderRadius:8,fontSize:15,fontWeight:500,cursor:"pointer",border:"none",background:C.ac,color:"#ffffff",fontFamily:"inherit"}
const btnG = {display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"14px",borderRadius:8,fontSize:15,cursor:"pointer",border:`1px solid ${C.b}`,background:"transparent",color:C.mu,fontFamily:"inherit"}
const lbl = {fontSize:13,color:C.mu,display:"block",marginBottom:6}
const hdr = {padding:"14px 20px 12px",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid ${C.b}`,background:C.bg,position:"sticky",top:0,zIndex:10}

// ── Tids-hjälpare (används av RapporteraTid + ProjektDetalj "Pågår nu") ──
function pad2(n) { return String(n).padStart(2, "0") }
function nowToHHMM(d) { return `${pad2(d.getHours())}:${pad2(d.getMinutes())}` }
function elapsedSeconds(startTidStr, nowDate) {
  if (!startTidStr) return 0
  const [sh, sm] = startTidStr.split(":").map(Number)
  const startSec = sh * 3600 + sm * 60
  const nowSec = nowDate.getHours() * 3600 + nowDate.getMinutes() * 60 + nowDate.getSeconds()
  return Math.max(0, nowSec - startSec)
}
function formatSeconds(s) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60)
  return `${pad2(h)}:${pad2(m)}:${pad2(sec)}`
}
function formatHM(totalMinutes) {
  if (totalMinutes <= 0) return "0h 0m"
  const h = Math.floor(totalMinutes / 60), m = Math.floor(totalMinutes % 60)
  return `${h}h ${m}m`
}
function timmarMellan(startTid, stoppTid) {
  if (!startTid || !stoppTid) return 0
  const [sh, sm] = startTid.split(":").map(Number)
  const [eh, em] = stoppTid.split(":").map(Number)
  return Math.max(0, ((eh * 60 + em) - (sh * 60 + sm)) / 60)
}
// GPS med kort timeout. Avbryter sig själv om geolocation hänger.
function hamtaGPS() {
  return new Promise(resolve => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return resolve(null)
    let klar = false
    const t = setTimeout(() => { if (!klar) { klar = true; resolve(null) } }, 4000)
    navigator.geolocation.getCurrentPosition(
      p => { if (!klar) { klar = true; clearTimeout(t); resolve({lat: p.coords.latitude, lng: p.coords.longitude}) } },
      () => { if (!klar) { klar = true; clearTimeout(t); resolve(null) } },
      {enableHighAccuracy: true, timeout: 3500}
    )
  })
}

// ── Badge ────────────────────────────────────────────────────
function Badge({status}) {
  const m={publicerad:["#1D9E75","rgba(29,158,117,.15)","Publicerad"],tillsatt:["#5b9cf6","rgba(91,156,246,.15)","Tillsatt"],pagaende:[C.ac,"rgba(232,184,75,.15)","Pågående"],kommande:[C.mu,"rgba(255,255,255,.08)","Kommande"],klar:["#1D9E75","rgba(29,158,117,.15)","Klar"],open:[C.da,"rgba(224,82,82,.15)","Öppen"],closed:[C.mu,"rgba(255,255,255,.08)","Stängd"],accepted:[C.ok,"rgba(46,125,50,.12)","Accepterad"],rejected:[C.mu,"rgba(255,255,255,.08)","Avslagen"]}
  const [col,bg,lbl] = m[status]||[C.mu,"rgba(255,255,255,.08)",status]
  return <span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:bg,color:col}}>{lbl}</span>
}

// ── Login ────────────────────────────────────────────────────
function LoginScreen({onLogin}) {
  const [cat, setCat] = useState(null)

  const Logo = () => (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:40}}>
      <div style={{width:36,height:36,background:C.ac,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:"#ffffff",lineHeight:1}}>R</div>
      <span style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Rallar</span>
    </div>
  )

  if (cat === "spar") {
    const roles = [
      {v:"arbetsledare", l:"Arbetsledare", d:"Full tillgång — dagorder, projektkoll, avvikelser"},
      {v:"arbetare",     l:"Arbetare",     d:"Dagorder, mina arbeten, rapportera avvikelser"},
    ]
    return (
      <div style={{padding:"52px 24px 40px",display:"flex",flexDirection:"column",minHeight:"100%"}}>
        <Logo/>
        <button onClick={()=>setCat(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:C.mu,fontSize:14,padding:0,marginBottom:20}}>← Tillbaka</button>
        <div style={{background:"#0d47a1",borderRadius:12,padding:"14px 18px",marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:600,color:"#ffffff",marginBottom:2}}>Ute på spåret</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.75)"}}>Dagorder, avvikelser och projektöversikt</div>
        </div>
        <p style={{color:C.mu,fontSize:14,marginBottom:16}}>Vem är du?</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {roles.map(r => (
            <button key={r.v} onClick={() => onLogin(r.v)} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"16px 18px",textAlign:"left",cursor:"pointer",color:C.tx,transition:"border-color .15s"}}
              onMouseOver={e=>e.currentTarget.style.borderColor=C.ac}
              onMouseOut={e=>e.currentTarget.style.borderColor=C.b}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{fontWeight:500,fontSize:15}}>{r.l}</div>
                {r.v==="arbetsledare" && <span style={{fontSize:11,background:"rgba(21,101,192,.1)",color:C.ac,padding:"2px 8px",borderRadius:10,border:`1px solid ${C.b2}`}}>Full behörighet</span>}
              </div>
              <div style={{color:C.mu,fontSize:13,marginTop:3}}>{r.d}</div>
            </button>
          ))}
        </div>
        <div style={{marginTop:20,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",fontSize:13,color:C.mu}}>
          🔒 Arbetsledarens funktioner är låsta för vanliga arbetare
        </div>
        <p style={{textAlign:"center",color:C.mu,fontSize:12,marginTop:"auto",paddingTop:40}}>Demo — ingen inloggning krävs</p>
      </div>
    )
  }

  return (
    <div style={{padding:"64px 24px 40px",display:"flex",flexDirection:"column",minHeight:"100%"}}>
      <Logo/>
      <h1 style={{fontSize:26,fontWeight:600,letterSpacing:"-.4px",marginBottom:8}}>Välkommen till Rallar</h1>
      <p style={{color:C.mu,fontSize:15,marginBottom:32}}>Välj din kategori för att fortsätta</p>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <button onClick={()=>onLogin("foretag")} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:14,padding:"22px 20px",textAlign:"left",cursor:"pointer",color:C.tx,transition:"all .15s"}}
          onMouseOver={e=>{e.currentTarget.style.borderColor=C.ac;e.currentTarget.style.background=C.bg3}}
          onMouseOut={e=>{e.currentTarget.style.borderColor=C.b;e.currentTarget.style.background=C.bg2}}>
          <div style={{fontSize:24,marginBottom:10}}>🏢</div>
          <div style={{fontWeight:600,fontSize:17,marginBottom:6}}>Företag & Beställare</div>
          <div style={{color:C.mu,fontSize:13,lineHeight:1.5}}>Beställare · Projektledare · Underleverantör</div>
          <div style={{marginTop:12,fontSize:12,color:C.ac,fontWeight:500}}>Marketplace · Avrop · Projekthantering →</div>
        </button>
        <button onClick={()=>setCat("spar")} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:14,padding:"22px 20px",textAlign:"left",cursor:"pointer",color:C.tx,transition:"all .15s"}}
          onMouseOver={e=>{e.currentTarget.style.borderColor=C.ac;e.currentTarget.style.background=C.bg3}}
          onMouseOut={e=>{e.currentTarget.style.borderColor=C.b;e.currentTarget.style.background=C.bg2}}>
          <div style={{fontSize:24,marginBottom:10}}>🚦</div>
          <div style={{fontWeight:600,fontSize:17,marginBottom:6}}>Ute på spåret</div>
          <div style={{color:C.mu,fontSize:13,lineHeight:1.5}}>Arbetsledare · Arbetare</div>
          <div style={{marginTop:12,fontSize:12,color:C.ac,fontWeight:500}}>Dagorder · Avvikelser · Projektkoll →</div>
        </button>
      </div>
      <p style={{textAlign:"center",color:C.mu,fontSize:12,marginTop:"auto",paddingTop:40}}>Demo — ingen inloggning krävs</p>
    </div>
  )
}

// ── Marketplace ──────────────────────────────────────────────
function Marketplace({user, navigate, privataAvrop, privatNotiser, onMarkNotisSedd, onMarkAllaSedd, onTackaNej}) {
  // Hitta inloggad användares foretagId via namn-matchning
  const minForetagId = INIT_FORETAG?.find?.(c => c.namn === user?.company)?.id

  // Privata avrop riktade till mitt företag — exkludera avrop vi tackat nej till
  const minaPrivata = (privataAvrop || []).filter(a =>
    a.mottagarforetagIds.includes(minForetagId) &&
    !(a.declinedForetagIds || []).includes(minForetagId)
  )
  // Notiser för mitt företag — sortera senaste först
  const minaNotiser = (privatNotiser || [])
    .filter(n => n.foretagId === minForetagId)
    .sort((a, b) => (b.tid || "").localeCompare(a.tid || ""))
  const olasta = minaNotiser.filter(n => !n.sedd)
  const olastaCount = olasta.length
  const krAction = olasta.filter(n => notisKraverAction(n.typ)).length

  const [notisOpen, setNotisOpen] = useState(false)
  const [tackaNejNotis, setTackaNejNotis] = useState(null)

  function oppnaPrivat(avropId) {
    const avrop = minaPrivata.find(a => a.id === avropId)
    if (!avrop) return
    // Markera alla notiser för detta avrop som sedda när användaren öppnar det
    minaNotiser.filter(n => n.avropId === avropId && !n.sedd).forEach(n => onMarkNotisSedd && onMarkNotisSedd(n.id))
    setNotisOpen(false)
    navigate("avrop", avrop)
  }

  // Returnerar rätt action-knappar baserat på notis-typ
  function notisActions(n) {
    if (n.sedd) return []
    switch (n.typ) {
      case "privat-avrop-inkommen":
        return [
          {label:"✅ Öppna avropet", primary:true, onClick: () => oppnaPrivat(n.avropId)},
          {label:"❌ Tacka nej",     danger:true,  onClick: () => setTackaNejNotis(n)},
        ]
      case "tacka-nej-svar":
        return [{label:"⚪ Markera sedd", primary:true, onClick: () => onMarkNotisSedd && onMarkNotisSedd(n.id)}]
      case "ansokan-inkommen":
        return [{label:"✅ Granska ansökan", primary:true, onClick: () => { onMarkNotisSedd && onMarkNotisSedd(n.id); navigate("ansokningar", n) }}]
      default:
        return [{label:"Markera sedd", primary:true, onClick: () => onMarkNotisSedd && onMarkNotisSedd(n.id)}]
    }
  }

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Marketplace</h1>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {/* Notis-knapp med röd badge för olästa */}
            {minaNotiser.length > 0 && (
              <button onClick={() => setNotisOpen(o => !o)} style={{position:"relative",background:notisOpen?C.bg3:C.bg2,border:`1px solid ${notisOpen?C.b2:C.b}`,borderRadius:18,padding:"5px 11px 5px 9px",cursor:"pointer",fontFamily:"inherit",fontSize:13,display:"flex",alignItems:"center",gap:5,color:C.tx}}>
                <span style={{fontSize:14}}>🔔</span>
                <span style={{fontWeight:500}}>Notiser</span>
                {olastaCount > 0 && (
                  <span style={{position:"absolute",top:-4,right:-4,minWidth:18,height:18,padding:"0 5px",borderRadius:9,background:C.da,color:"#fff",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${C.bg}`}}>{olastaCount}</span>
                )}
              </button>
            )}
            <span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,color:C.ac,background:"rgba(232,184,75,.15)"}}>{AVROP.length} avrop</span>
          </div>
        </div>
      </div>

      {/* Inline notis-panel — utfälld från notis-knappen */}
      {notisOpen && minaNotiser.length > 0 && (
        <div style={{margin:"0 20px 14px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:12,padding:"12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,padding:"0 4px"}}>
            <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px"}}>
              NOTISER ({minaNotiser.length})
              {krAction > 0 && <span style={{color:C.da,marginLeft:6}}>· {krAction} kräver action</span>}
            </div>
            {olastaCount > 0 && (
              <button onClick={() => onMarkAllaSedd && onMarkAllaSedd(minForetagId)} style={{background:"none",border:"none",color:C.ac,fontSize:11.5,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Markera alla sedda</button>
            )}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {minaNotiser.slice(0,8).map(n => (
              <NotisRad key={n.id} notis={n} actions={notisActions(n)}/>
            ))}
          </div>
        </div>
      )}

      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>

        {/* Banner — synlig så länge det finns olästa privata avrop */}
        {olastaCount > 0 && (
          <button onClick={() => { const f = minaPrivata[0]; if (f) oppnaPrivat(f.id) }} style={{display:"flex",alignItems:"center",gap:12,background:"linear-gradient(135deg, rgba(21,101,192,.08), rgba(91,156,246,.04))",border:`1.5px solid ${C.ac}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",width:"100%"}}>
            <span style={{fontSize:24,flexShrink:0}}>🔒</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13.5,fontWeight:600,color:C.ac,letterSpacing:".2px"}}>{olastaCount === 1 ? "Du har ett privat avrop" : `Du har ${olastaCount} privata avrop`}</div>
              <div style={{fontSize:11.5,color:C.mu,marginTop:2}}>Tryck för att se det</div>
            </div>
            <div style={{fontSize:18,color:C.ac,flexShrink:0}}>›</div>
          </button>
        )}

        {/* Privata avrop — separat sektion högst upp */}
        {minaPrivata.length > 0 && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4,marginBottom:-2}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.ac}}>🔒 PRIVATA — RIKTADE TILL ER</span>
              <span style={{flex:1,height:1,background:`linear-gradient(90deg, ${C.ac}40, transparent)`}}/>
            </div>
            {minaPrivata.map(a => {
              const ohardd = minaNotiser.some(n => n.avropId === a.id && !n.sedd)
              return <AvropKort key={a.id} avrop={a} privat olast={ohardd} onClick={() => oppnaPrivat(a.id)}/>
            })}
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8,marginBottom:-2}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.mu}}>ÖPPNA AVROP</span>
              <span style={{flex:1,height:1,background:C.b}}/>
            </div>
          </>
        )}

        {/* Befintliga öppna marketplace-avrop */}
        {AVROP.map(a => <AvropKort key={a.id} avrop={a} onClick={() => navigate("avrop", a)}/>)}
      </div>

      {/* Bekräftelse-modal för Tacka nej */}
      {tackaNejNotis && <TackaNejModal
        notis={tackaNejNotis}
        onConfirm={kommentar => { onTackaNej && onTackaNej(tackaNejNotis.avropId, tackaNejNotis.foretagId, kommentar); setTackaNejNotis(null) }}
        onClose={() => setTackaNejNotis(null)}
      />}
    </div>
  )
}

// ── Avrop detail ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
// AvropKort + AvropDetail — rikt informativ marketplace + detaljvy
// ═══════════════════════════════════════════════════════════════════════

// — Sammanfatta bemanning till kort textsträng —
function bemanningTotalt(b) { return (b || []).reduce((s, r) => s + (Number(r.antal) || 0), 0) }
function bemanningRoller(b) { return (b || []).map(r => r.roll).join(" + ") }

// — Beräkna dagar kvar till deadline (positivt = framåt i tid) —
function dagarKvar(datumStr) {
  if (!datumStr) return null
  const m = String(datumStr).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  const idag = new Date("2026-05-25")
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return Math.ceil((d - idag) / (1000 * 60 * 60 * 24))
}

// — Marketplace-kort med all viktig info synlig direkt —
function AvropKort({avrop, privat, olast, onClick}) {
  const dagar = dagarKvar(avrop.deadline)
  const dlBrad = dagar !== null && dagar < 5
  const totalt = bemanningTotalt(avrop.bemanning)
  const roller = bemanningRoller(avrop.bemanning)
  return (
    <button onClick={onClick} style={{
      ...card,
      textAlign:"left",cursor:"pointer",width:"100%",
      border: privat ? (olast ? `1.5px solid ${C.ac}` : "1.5px solid rgba(21,101,192,.3)") : `1px solid ${C.b}`,
      background: privat && olast ? "rgba(21,101,192,.03)" : C.bg2,
      padding:"14px 16px",
      transition:"border-color .15s"
    }}>
      {/* Badge-rad om privat eller olast */}
      {(privat || olast) && (
        <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
          {privat && <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:10.5,padding:"3px 9px",borderRadius:10,background:"rgba(21,101,192,.12)",color:C.ac,fontWeight:700,letterSpacing:".4px"}}>🔒 PRIVAT — RIKTAT TILL ER</span>}
          {olast && <span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:C.da,color:"#fff",fontWeight:700,letterSpacing:".3px"}}>● OLÄST</span>}
        </div>
      )}

      {/* Beställare + projektnamn */}
      <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".5px",marginBottom:4}}>{(avrop.best || "").toUpperCase()}</div>
      <div style={{fontWeight:600,fontSize:16,marginBottom:12,letterSpacing:"-.2px",lineHeight:1.3}}>{avrop.proj}</div>

      {/* Info-rader med ikoner */}
      <div style={{display:"flex",flexDirection:"column",gap:6,fontSize:12.5,color:C.tx,lineHeight:1.5}}>
        <div><span style={{color:C.mu,marginRight:6}}>📍</span>{avrop.plats}</div>
        {(avrop.startdatum || avrop.slutdatum) && (
          <div><span style={{color:C.mu,marginRight:6}}>📅</span>{avrop.startdatum || "?"} → {avrop.slutdatum || "?"}</div>
        )}
        {avrop.tider && <div><span style={{color:C.mu,marginRight:6}}>⏰</span>{avrop.tider}</div>}
        {totalt > 0 && (
          <div><span style={{color:C.mu,marginRight:6}}>👷</span><strong style={{fontWeight:600}}>{totalt} man</strong>{roller && <span style={{color:C.mu}}> — {roller}</span>}</div>
        )}
        {avrop.verktyg?.length > 0 && (
          <div style={{display:"flex",gap:6,alignItems:"flex-start"}}>
            <span style={{color:C.mu,flexShrink:0}}>⚒️</span>
            <span style={{color:C.mu,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{avrop.verktyg.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Deadline-rad */}
      <div style={{marginTop:12,paddingTop:10,borderTop:`1px solid ${C.b}`,display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:14}}>⏳</span>
        <span style={{fontSize:12,fontWeight:dlBrad?700:500,color:dlBrad?C.da:C.mu}}>
          Deadline {avrop.deadline}
          {dagar !== null && (dagar >= 0
            ? <span style={{marginLeft:6,fontWeight:600}}>· {dagar} {dagar === 1 ? "dag" : "dagar"} kvar</span>
            : <span style={{marginLeft:6,fontWeight:600}}>· passerat</span>
          )}
        </span>
      </div>
    </button>
  )
}

// — Ny AvropDetail med tydliga sektioner —
function AvropDetail({avrop, navigate, role, user, onTackaNej}) {
  const [ansokSent, setAnsokSent] = useState(false)
  const [showAnsok, setShowAnsok] = useState(false)
  const [selected, setSelected] = useState([])
  const [msg, setMsg] = useState("")
  const [tackaNejOpen, setTackaNejOpen] = useState(false)
  const dagar = dagarKvar(avrop?.deadline)
  const dlBrad = dagar !== null && dagar < 5
  const totalt = bemanningTotalt(avrop?.bemanning)

  // Är detta ett privat avrop som mottagaren tittar på?
  const minForetagId = user ? INIT_FORETAG.find(c => c.namn === user.company)?.id : null
  const arPrivat = Array.isArray(avrop?.mottagarforetagIds)
  const arMottagare = arPrivat && minForetagId && avrop.mottagarforetagIds.includes(minForetagId)
  const harTackatNej = arPrivat && minForetagId && (avrop.declinedForetagIds || []).includes(minForetagId)
  const visarTackaNej = role === "foretag" && arMottagare && !harTackatNej

  if (ansokSent) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:500,padding:"0 24px",textAlign:"center"}}>
      <div style={{fontSize:52,marginBottom:20}}>✅</div>
      <h2 style={{fontSize:22,fontWeight:600,marginBottom:8}}>Ansökan skickad!</h2>
      <p style={{color:C.mu,fontSize:15}}>Beställaren granskar och återkommer.</p>
      <button style={{...btnP,maxWidth:280,marginTop:32}} onClick={() => navigate("marketplace")}>Tillbaka till marketplace</button>
    </div>
  )

  if (showAnsok) return (
    <div>
      <div style={hdr}>
        <button onClick={() => setShowAnsok(false)} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{fontWeight:600,fontSize:15}}>Ansök om avrop</div>
      </div>
      <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:14}}>
        <div>
          <label style={lbl}>Meddelande till beställaren</label>
          <textarea style={{...inp,height:90,resize:"none"}} placeholder="Berätta om ert team..." value={msg} onChange={e=>setMsg(e.target.value)}/>
        </div>
        <div>
          <label style={lbl}>Anställda ni tar med</label>
          {ANSTALLDA.map(a => {
            const sel = selected.includes(a.id)
            return (
              <button key={a.id} onClick={() => setSelected(s => sel ? s.filter(x=>x!==a.id) : [...s,a.id])}
                style={{display:"flex",alignItems:"center",gap:12,width:"100%",background:sel?"rgba(232,184,75,.07)":C.bg2,border:`1px solid ${sel?C.ac:C.b}`,borderRadius:10,padding:"12px 14px",marginBottom:8,cursor:"pointer"}}>
                <div style={{width:20,height:20,borderRadius:4,border:`1.5px solid ${sel?C.ac:C.b2}`,background:sel?C.ac:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {sel && <span style={{fontSize:11,color:"#ffffff",fontWeight:700}}>✓</span>}
                </div>
                <div style={{textAlign:"left"}}>
                  <div style={{fontSize:14,fontWeight:500,color:C.tx}}>{a.name}</div>
                  <div style={{fontSize:12,color:C.mu}}>{a.roll}</div>
                </div>
              </button>
            )
          })}
        </div>
        <button style={btnP} onClick={() => setAnsokSent(true)}>Skicka ansökan</button>
      </div>
    </div>
  )

  if (!avrop) return null

  // Arbetsuppgifter som bullets om text innehåller komma — annars hela texten som en bullet
  const arbetspunkter = (avrop.uppg || "").split(/[,;]/).map(s => s.trim()).filter(Boolean)

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("marketplace")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:11,color:C.mu,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{avrop.best}</div>
          <div style={{fontWeight:600,fontSize:15,letterSpacing:"-.2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{avrop.proj}</div>
        </div>
      </div>

      <div style={{padding:"18px 20px 30px",display:"flex",flexDirection:"column",gap:14}}>

        {/* Deadline-räknare överst, stor och tydlig */}
        <div style={{background:dlBrad?"rgba(224,82,82,.06)":"rgba(232,184,75,.06)",border:`1.5px solid ${dlBrad?"rgba(224,82,82,.45)":"rgba(232,184,75,.4)"}`,borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>⏳</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:11,color:dlBrad?C.da:"#b88a00",fontWeight:700,letterSpacing:".4px"}}>DEADLINE FÖR ANSÖKAN</div>
            <div style={{fontSize:18,fontWeight:700,color:dlBrad?C.da:C.tx,marginTop:2,lineHeight:1.2}}>
              {dagar !== null && dagar >= 0
                ? `${dagar} ${dagar === 1 ? "dag" : "dagar"} kvar att ansöka`
                : "Deadline passerad"}
            </div>
            <div style={{fontSize:12,color:C.mu,marginTop:3}}>Sista ansökningsdag: {avrop.deadline}</div>
          </div>
        </div>

        {/* 📋 OM PROJEKTET */}
        <SektDet titel="Om projektet" emoji="📋">
          <DetRad l="Projektnamn" v={avrop.proj}/>
          <DetRad l="Beställare" v={avrop.best}/>
          {avrop.arbetsorderRef && <DetRad l="Arbetsorder / ref" v={avrop.arbetsorderRef}/>}
        </SektDet>

        {/* 📍 PLATS & TID */}
        <SektDet titel="Plats & Tid" emoji="📍">
          <DetRad l="Arbetsplats" v={avrop.plats}/>
          {avrop.koordinater && <DetRad l="Koordinater" v={avrop.koordinater} mono/>}
          {avrop.startdatum && <DetRad l="Startdatum" v={avrop.startdatum}/>}
          {avrop.slutdatum && <DetRad l="Slutdatum" v={avrop.slutdatum}/>}
          {avrop.tider && <DetRad l="Arbetstider" v={avrop.tider}/>}
        </SektDet>

        {/* 👷 VAD VI SÖKER — stor blå callout */}
        {avrop.behov && (
          <div style={{background:"rgba(21,101,192,.05)",border:`2px solid ${C.ac}`,borderRadius:14,padding:"16px 18px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:22}}>👷</span>
              <div>
                <div style={{fontSize:11,color:C.ac,fontWeight:700,letterSpacing:".4px"}}>VI SÖKER FRÅN UNDERLEVERANTÖREN</div>
                <div style={{fontSize:14.5,fontWeight:600,color:C.tx,marginTop:1}}>Detta söker vi — läs noga</div>
              </div>
            </div>
            <div style={{fontSize:14,color:C.tx,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{avrop.behov}</div>
          </div>
        )}

        {/* 🔢 BEMANNING */}
        {avrop.bemanning && avrop.bemanning.length > 0 && (
          <SektDet titel="Bemanning" emoji="🔢">
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {avrop.bemanning.map((b, i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:8}}>
                  <div style={{width:34,height:30,borderRadius:6,background:"rgba(21,101,192,.1)",color:C.ac,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,flexShrink:0}}>{b.antal}×</div>
                  <div style={{fontSize:14,color:C.tx,fontWeight:500}}>{b.roll}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.b}`,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
              <span style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px"}}>TOTALT</span>
              <span style={{fontSize:16,fontWeight:700,color:C.tx}}>{totalt} personer</span>
            </div>
          </SektDet>
        )}

        {/* ⚒️ VERKTYG & MATERIAL */}
        <SektDet titel="Verktyg & Material" emoji="⚒️">
          <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".3px",marginBottom:8}}>VERKTYG NI TAR MED</div>
          {avrop.verktyg && avrop.verktyg.length > 0 ? (
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:avrop.material?14:0}}>
              {avrop.verktyg.map(v => <span key={v} style={{fontSize:12.5,background:"rgba(232,184,75,.12)",color:C.ac,padding:"5px 10px",borderRadius:8,border:"1px solid rgba(232,184,75,.25)"}}>{v}</span>)}
            </div>
          ) : (
            <div style={{fontSize:13,color:C.mu,marginBottom:avrop.material?14:0}}>Inga specifika verktyg angivna</div>
          )}
          {avrop.material && (
            <>
              <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".3px",marginBottom:6,paddingTop:4,borderTop:`1px solid ${C.b}`,marginTop:4}}>MATERIAL BESTÄLLAREN TILLHANDAHÅLLER</div>
              <div style={{fontSize:13.5,color:C.tx,lineHeight:1.55,whiteSpace:"pre-wrap"}}>{avrop.material}</div>
            </>
          )}
        </SektDet>

        {/* 📝 ARBETSUPPGIFTER */}
        {arbetspunkter.length > 0 && (
          <SektDet titel="Arbetsuppgifter" emoji="📝">
            <ul style={{margin:0,paddingLeft:18,display:"flex",flexDirection:"column",gap:5}}>
              {arbetspunkter.map((p, i) => <li key={i} style={{fontSize:13.5,color:C.tx,lineHeight:1.55}}>{p}</li>)}
            </ul>
          </SektDet>
        )}

        {/* ⚠️ EXTRA ATT TÄNKA PÅ — gul callout */}
        {avrop.extraInfo && (
          <div style={{background:"rgba(232,184,75,.08)",border:"1.5px solid rgba(232,184,75,.45)",borderRadius:12,padding:"14px 16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:18}}>⚠️</span>
              <div style={{fontSize:11,color:"#b88a00",fontWeight:700,letterSpacing:".4px"}}>EXTRA ATT TÄNKA PÅ</div>
            </div>
            <div style={{fontSize:13.5,color:C.tx,lineHeight:1.55,whiteSpace:"pre-wrap"}}>{avrop.extraInfo}</div>
          </div>
        )}

        {/* 👤 KONTAKT */}
        <SektDet titel="Kontakt" emoji="👤">
          {avrop.arbetsledareNamn && (
            <>
              <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".3px",marginBottom:6}}>ARBETSLEDARE PÅ PLATS</div>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:10,marginBottom:avrop.kontaktNamn?10:0}}>
                <IniAvatar name={avrop.arbetsledareNamn} size={36}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13.5,fontWeight:500,color:C.tx}}>{avrop.arbetsledareNamn}</div>
                  {avrop.arbetsledareTel && <a href={`tel:${avrop.arbetsledareTel.replace(/\s/g,"")}`} style={{fontSize:12,color:C.ac,textDecoration:"none",fontWeight:500,marginTop:1,display:"inline-block"}}>📞 {avrop.arbetsledareTel}</a>}
                </div>
              </div>
            </>
          )}
          {avrop.kontaktNamn && (
            <>
              <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".3px",marginBottom:6}}>BESTÄLLARKONTAKT</div>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:10}}>
                <IniAvatar name={avrop.kontaktNamn} size={36}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13.5,fontWeight:500,color:C.tx}}>{avrop.kontaktNamn}</div>
                  {avrop.kontaktTel && <a href={`tel:${avrop.kontaktTel.replace(/\s/g,"")}`} style={{fontSize:12,color:C.ac,textDecoration:"none",fontWeight:500,marginTop:1,display:"inline-block"}}>📞 {avrop.kontaktTel}</a>}
                </div>
              </div>
            </>
          )}
        </SektDet>

        {/* Status-banner om man redan tackat nej */}
        {harTackatNej && (
          <div style={{background:"rgba(224,82,82,.06)",border:"1.5px solid rgba(224,82,82,.4)",borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:24}}>❌</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700,color:C.da,letterSpacing:".3px"}}>NI HAR TACKAT NEJ TILL DETTA AVROP</div>
              <div style={{fontSize:12,color:C.mu,marginTop:3,lineHeight:1.5}}>Beställaren har fått besked. Detta går inte att ångra — men beställaren kan skicka en ny förfrågan om de vill.</div>
            </div>
          </div>
        )}

        {/* Ansökningsknapp + Tacka nej-knapp */}
        {role === "foretag" && !harTackatNej && (
          <div style={{display:"flex",gap:8,marginTop:6}}>
            <button
              style={{...btnP,padding:"15px",fontSize:15,fontWeight:500,flex: visarTackaNej ? 2 : 1}}
              onClick={() => setShowAnsok(true)}
            >Ansök på detta avrop</button>
            {visarTackaNej && (
              <button
                style={{flex:1,padding:"15px",fontSize:14,fontWeight:500,background:"rgba(224,82,82,.08)",color:C.da,border:`1.5px solid rgba(224,82,82,.4)`,borderRadius:10,cursor:"pointer",fontFamily:"inherit"}}
                onClick={() => setTackaNejOpen(true)}
              >❌ Tacka nej</button>
            )}
          </div>
        )}
      </div>

      {/* Tacka nej-bekräftelsemodal */}
      {tackaNejOpen && (
        <TackaNejModal
          avropProj={avrop.proj}
          onConfirm={kommentar => {
            if (onTackaNej) onTackaNej(avrop.id, minForetagId, kommentar)
            setTackaNejOpen(false)
            navigate("marketplace")
          }}
          onClose={() => setTackaNejOpen(false)}
        />
      )}
    </div>
  )
}

// — Sektionsblock med emoji + titel —
function SektDet({titel, emoji, children}) {
  return (
    <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <span style={{fontSize:18}}>{emoji}</span>
        <div style={{fontSize:14,fontWeight:600,color:C.tx,letterSpacing:"-.1px"}}>{titel}</div>
      </div>
      {children}
    </div>
  )
}
function DetRad({l, v, mono}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:10,padding:"4px 0"}}>
      <span style={{fontSize:11.5,color:C.mu,fontWeight:500,letterSpacing:".2px",flexShrink:0}}>{l}</span>
      <span style={{fontSize:13.5,color:C.tx,textAlign:"right",fontFamily:mono?"monospace":"inherit",fontVariantNumeric:mono?"tabular-nums":undefined,lineHeight:1.4}}>{v}</span>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
// ROLLER — dropdown-alternativ för Bemanningsbehov i Steg 2
// ═══════════════════════════════════════════════════════════════════════
const ROLLER = [
  "Termitsvetsare", "Bangubbar", "Spårarbetare", "Spårtekniker",
  "Förare", "Maskinförare", "Arbetsledare", "Signaltekniker",
  "Elektriker", "Mätningsingenjör", "Säkerhetschef", "Sliperbytare",
  "Förman", "Lärling",
]

// ═══════════════════════════════════════════════════════════════════════
// VERKTYG_TAGGAR — fördefinierade verktyg som klickbara taggar i Steg 2
// ═══════════════════════════════════════════════════════════════════════
const VERKTYG_TAGGAR = [
  "Stoppmaskin", "Ballastplog", "Rälslyftare", "Rälsklipp",
  "Termitsvets", "Svetsaggregat", "Hydraulhammare",
  "Befästare 45kg", "Befästare 60kg", "Rälsspikslägga", "Spårjusteringsverktyg",
  "Grävmaskin", "Tvåvägsfordon", "Lastbil", "Dumper",
  "Kompressor", "Generator", "Mätutrustning", "Mätvagn",
  "Vinkelslip", "Borrmaskin", "Skruvdragare", "Termit svetsset", "Rälsslip",
]

// ═══════════════════════════════════════════════════════════════════════
// SkapaAvrop — AI-upload + 4-stegs wizard. Helt ombyggd.
// ═══════════════════════════════════════════════════════════════════════
function SkapaAvrop({navigate, user, onSkickaPrivat}) {
  // steg: -1 = mottagare-val, 0 = upload-skärm, 1-4 = formstegen, 5 = bekräftelse
  const [steg, setSteg] = useState(-1)
  const [mottagare, setMottagare] = useState(null)        // "marketplace" | "specifik" | null
  const [valdaForetag, setValdaForetag] = useState([])    // ["co1", "co3", ...]
  const [foretagSok, setForetagSok] = useState("")
  const [aiKor, setAiKor] = useState(false)              // AI processar bilden
  const [aiKlar, setAiKlar] = useState(false)            // AI har analyserat
  const [bild, setBild] = useState(null)                 // dataURL av uppladdad bild
  const [aiFilled, setAiFilled] = useState({})           // {fält:true} = AI fyllde
  const [aiManuell, setAiManuell] = useState({})         // {fält:true} = AI klarade ej
  const [data, setData] = useState({
    vadSokerNi:"",  // Hero-fält i Steg 2 — fylls alltid manuellt, AI tar inte
    projektnamn:"", bestallare:"", arbetsplats:"", koordinater:"",
    startdatum:"", slutdatum:"", deadline:"",
    arbetsuppgifter:"", antalMan:"", antalVeckor:"", arbetstider:"",
    material:"", verktyg:[], extraInfo:"",
    bemanning:[],   // Array av {roll, antal} — dynamisk lista i Steg 2
    arbetsledareNamn:"", arbetsledareTel:"", kontaktNamn:"", kontaktTel:"", arbetsorderRef:"",
  })
  const [utkast, setUtkast] = useState(false)

  // — Hjälpfunktioner —
  const krav = ["projektnamn","bestallare","arbetsplats","startdatum","slutdatum","deadline",
                "vadSokerNi","arbetsuppgifter","antalMan","antalVeckor","arbetstider",
                "arbetsledareNamn","arbetsledareTel","kontaktNamn","kontaktTel"]
  function arKrav(f) { return krav.includes(f) }
  function tomt(f) {
    const v = data[f]
    if (Array.isArray(v)) return v.length === 0
    return !v || !String(v).trim()
  }
  function stegValid(s) {
    if (s === 1) return ["projektnamn","bestallare","arbetsplats","startdatum","slutdatum","deadline"].every(f => !tomt(f))
    if (s === 2) return ["vadSokerNi","arbetsuppgifter","antalMan","antalVeckor","arbetstider"].every(f => !tomt(f)) && data.verktyg.length > 0
    if (s === 3) return ["arbetsledareNamn","arbetsledareTel","kontaktNamn","kontaktTel"].every(f => !tomt(f))
    return true
  }
  function alltValid() { return [1,2,3].every(stegValid) }
  function saknadeRequired() {
    return krav.filter(tomt).concat(data.verktyg.length === 0 ? ["verktyg"] : [])
  }

  // — Bilduppladdning —
  function valdBild(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = ev => { setBild(ev.target.result); aiKor && setAiKor(false); kortAI() }
    r.readAsDataURL(f)
  }
  function kortAI() {
    setAiKor(true)
    setTimeout(() => {
      // Simulerad AI-utfyllnad — typiskt avropsdokument fyller dessa
      setData({
        vadSokerNi:"",   // AI fyller ALDRIG detta — alltid manuellt
        projektnamn:"Bangårdsupprustning Borlänge spår 5-8",
        bestallare:"Trafikverket",
        arbetsplats:"Borlänge bangård, spår 5-8",
        koordinater:"",   // optional, AI lämnar tom
        startdatum:"2026-08-01",
        slutdatum:"2026-09-15",
        deadline:"2026-07-15",
        arbetsuppgifter:"Spårjustering, ballastrensning och skarvsvetsning på spår 5-8. Inkluderar mätningar före och efter åtgärder samt rapportering till Trafikverket. Arbetet utförs i etapper för att minimera trafikpåverkan.",
        antalMan:"8",
        antalVeckor:"6",
        arbetstider:"Mån-Fre 06:00-16:00",
        material:"",       // optional, AI lämnar tom
        verktyg:["Stoppmaskin", "Termitsvets", "Mätutrustning", "Befästare 60kg", "Ballastplog"],
        extraInfo:"",      // optional
        bemanning:[
          {roll:"Spårtekniker", antal:3},
          {roll:"Bangubbar", antal:4},
          {roll:"Arbetsledare", antal:1},
        ],
        // AI klarar inte arbetsledare-info — det finns sällan på själva avropsdokumentet
        arbetsledareNamn:"",
        arbetsledareTel:"",
        kontaktNamn:"Lars Eriksson",
        kontaktTel:"010-123 45 67",
        arbetsorderRef:"TRV-2026-A1234",
      })
      // Vilka fält AI lyckades fylla i (gröna bockar)
      setAiFilled({
        projektnamn:true, bestallare:true, arbetsplats:true,
        startdatum:true, slutdatum:true, deadline:true,
        arbetsuppgifter:true, antalMan:true, antalVeckor:true, arbetstider:true,
        verktyg:true, bemanning:true,
        kontaktNamn:true, kontaktTel:true, arbetsorderRef:true,
      })
      // Vilka required-fält AI missade (röd "Måste fyllas i manuellt")
      setAiManuell({
        arbetsledareNamn:true, arbetsledareTel:true,
      })
      setAiKor(false)
      setAiKlar(true)
      setSteg(1)
    }, 2200)
  }
  function hoppaOver() { setSteg(1) }

  // — Field-helpers (status och setters) —
  function set(f, v) {
    setData(d => ({...d, [f]: v}))
    if (aiManuell[f]) setAiManuell(m => { const nm = {...m}; delete nm[f]; return nm })
  }
  function toggleVerktyg(v) {
    setData(d => ({...d, verktyg: d.verktyg.includes(v) ? d.verktyg.filter(x => x !== v) : [...d.verktyg, v]}))
  }
  // status: "ok" | "ai" | "manuell" | "tom"
  function fStatus(f) {
    if (aiManuell[f] && tomt(f)) return "manuell"
    if (aiFilled[f] && !tomt(f)) return "ai"
    if (!tomt(f)) return "ok"
    return "tom"
  }

  // ── MOTTAGARE-VAL (steg -1) — välj marketplace eller specifika företag ──
  if (steg === -1) {
    const tillgangligaForetag = INIT_FORETAG.filter(c => !valdaForetag.includes(c.id))
    const filtForetag = tillgangligaForetag.filter(c =>
      !foretagSok.trim() || (c.namn + " " + c.ort).toLowerCase().includes(foretagSok.toLowerCase())
    )
    function toggleForetag(id) {
      setValdaForetag(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
      setForetagSok("")
    }
    function tabortForetag(id) { setValdaForetag(p => p.filter(x => x !== id)) }
    const kanFortsatta = mottagare === "marketplace" || (mottagare === "specifik" && valdaForetag.length > 0)

    return (
      <div>
        <div style={{padding:"24px 20px 0"}}>
          <h1 style={{fontSize:24,fontWeight:600,letterSpacing:"-.3px",marginBottom:6}}>Skapa nytt avrop</h1>
          <p style={{fontSize:14,color:C.mu,marginBottom:22,lineHeight:1.5}}>Välj först hur avropet ska nå underleverantörer.</p>
        </div>

        <div style={{padding:"0 20px 20px",display:"flex",flexDirection:"column",gap:12}}>
          {/* Kort 1: Marketplace */}
          <button onClick={() => setMottagare("marketplace")} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"18px 18px",border:mottagare==="marketplace"?`2px solid ${C.ac}`:`1.5px solid ${C.b}`,background:mottagare==="marketplace"?"rgba(21,101,192,.05)":C.bg2,borderRadius:14,cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%",transition:"all .15s"}}>
            <span style={{fontSize:32,flexShrink:0,lineHeight:1}}>📢</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:16,fontWeight:600,color:C.tx,marginBottom:5}}>Publicera i marketplace</div>
              <div style={{fontSize:13,color:C.mu,lineHeight:1.5}}>Alla underleverantörer på plattformen kan se och ansöka.</div>
            </div>
            {mottagare === "marketplace" && <div style={{fontSize:20,color:C.ac,fontWeight:700,flexShrink:0,marginTop:2}}>✓</div>}
          </button>

          {/* Kort 2: Specifikt företag */}
          <button onClick={() => setMottagare("specifik")} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"18px 18px",border:mottagare==="specifik"?`2px solid ${C.ac}`:`1.5px solid ${C.b}`,background:mottagare==="specifik"?"rgba(21,101,192,.05)":C.bg2,borderRadius:14,cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%",transition:"all .15s"}}>
            <span style={{fontSize:32,flexShrink:0,lineHeight:1}}>🔒</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:16,fontWeight:600,color:C.tx,marginBottom:5}}>Skicka till specifikt företag</div>
              <div style={{fontSize:13,color:C.mu,lineHeight:1.5}}>Bara de du väljer ser avropet — syns inte för andra.</div>
            </div>
            {mottagare === "specifik" && <div style={{fontSize:20,color:C.ac,fontWeight:700,flexShrink:0,marginTop:2}}>✓</div>}
          </button>

          {/* Företagsväljare expanderas direkt under kortet */}
          {mottagare === "specifik" && (
            <div style={{background:"rgba(91,156,246,.04)",border:"1px solid rgba(91,156,246,.25)",borderRadius:12,padding:"14px 14px 12px",marginTop:-4}}>
              <div style={{fontSize:12,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:10}}>VÄLJ FÖRETAG <span style={{color:C.da,marginLeft:2}}>*</span> · DU KAN VÄLJA FLERA</div>

              {/* Valda företag som taggar */}
              {valdaForetag.length > 0 && (
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                  {valdaForetag.map(id => {
                    const f = INIT_FORETAG.find(c => c.id === id)
                    if (!f) return null
                    return (
                      <span key={id} style={{display:"inline-flex",alignItems:"center",gap:6,background:C.bg,border:`1.5px solid ${C.ac}`,borderRadius:18,padding:"5px 6px 5px 11px",fontSize:13,fontWeight:500,color:C.tx}}>
                        <span style={{fontSize:14}}>{f.logoEmoji}</span>
                        <span>{f.namn}</span>
                        <button onClick={() => tabortForetag(id)} style={{width:20,height:20,borderRadius:"50%",background:"rgba(13,31,53,.08)",border:"none",color:C.mu,cursor:"pointer",fontSize:14,lineHeight:1,padding:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>×</button>
                      </span>
                    )
                  })}
                </div>
              )}

              {/* Sökfält */}
              <input
                type="text"
                value={foretagSok}
                onChange={e => setForetagSok(e.target.value)}
                placeholder="🔍 Sök företag, ort..."
                style={{...inp,marginBottom:8,fontSize:13.5}}
              />

              {/* Lista över ej valda */}
              {filtForetag.length === 0 ? (
                <div style={{padding:"14px",textAlign:"center",fontSize:12,color:C.mu}}>
                  {tillgangligaForetag.length === 0 ? "Alla företag valda" : "Inga företag matchade"}
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:240,overflowY:"auto"}}>
                  {filtForetag.map(f => (
                    <button key={f.id} onClick={() => toggleForetag(f.id)} style={{display:"flex",alignItems:"center",gap:10,background:C.bg,border:`1px solid ${C.b}`,borderRadius:8,padding:"9px 10px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                      <div style={{width:32,height:32,borderRadius:8,background:f.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{f.logoEmoji}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13.5,fontWeight:500,color:C.tx}}>{f.namn}</div>
                        <div style={{fontSize:11,color:C.mu,marginTop:1}}>{f.typ} · {f.ort}</div>
                      </div>
                      <div style={{width:24,height:24,borderRadius:"50%",background:"rgba(21,101,192,.1)",color:C.ac,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:600,flexShrink:0}}>+</div>
                    </button>
                  ))}
                </div>
              )}

              {valdaForetag.length === 0 && (
                <div style={{fontSize:11.5,color:C.da,marginTop:10,fontWeight:500}}>● Välj minst ett företag för att fortsätta</div>
              )}
            </div>
          )}

          {/* Fortsätt-knapp */}
          <button
            onClick={() => kanFortsatta && setSteg(0)}
            disabled={!kanFortsatta}
            style={{...btnP,padding:"14px",fontSize:14,marginTop:10,opacity:kanFortsatta?1:.45,cursor:kanFortsatta?"pointer":"not-allowed"}}
          >
            Fortsätt →
          </button>
        </div>
      </div>
    )
  }

  // ── UPPLADDNINGS-SKÄRM (steg 0) ──
  if (steg === 0) {
    return (
      <div>
        <div style={{padding:"18px 20px 0"}}>
          <button onClick={() => setSteg(-1)} style={{background:"none",border:"none",color:C.mu,fontSize:12.5,cursor:"pointer",padding:"2px 0 8px",fontFamily:"inherit",fontWeight:500}}>← Ändra mottagare</button>
          <h1 style={{fontSize:24,fontWeight:600,letterSpacing:"-.3px",marginBottom:6}}>Skapa nytt avrop</h1>
          <p style={{fontSize:14,color:C.mu,marginBottom:24,lineHeight:1.5}}>Ladda upp en bild på avropet så fyller AI i fälten åt dig — eller fyll i manuellt.</p>
        </div>

        <div style={{padding:"0 20px 24px"}}>
          {/* Stor uppladdningsyta */}
          <label style={{display:"block",cursor:aiKor?"wait":"pointer",marginBottom:14}}>
            <input type="file" accept="image/*" onChange={valdBild} disabled={aiKor} style={{display:"none"}}/>
            <div style={{background:bild?C.bg2:"rgba(91,156,246,.04)",border:`2px dashed ${bild?C.b2:"rgba(91,156,246,.4)"}`,borderRadius:16,padding:bild?"16px":"36px 20px",textAlign:"center",transition:"all .2s"}}>
              {bild ? (
                <div>
                  <img src={bild} alt="" style={{maxHeight:200,maxWidth:"100%",borderRadius:10,marginBottom:14,display:"block",margin:"0 auto 14px"}}/>
                  {aiKor ? (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:"10px"}}>
                      <div style={{width:18,height:18,border:`2.5px solid rgba(21,101,192,.2)`,borderTopColor:C.ac,borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
                      <span style={{fontSize:14,color:C.ac,fontWeight:500}}>AI analyserar bilden...</span>
                    </div>
                  ) : (
                    <div style={{fontSize:13,color:C.mu}}>Klicka för att byta bild</div>
                  )}
                </div>
              ) : (
                <>
                  <div style={{fontSize:48,marginBottom:14}}>📄</div>
                  <div style={{fontSize:17,fontWeight:600,color:C.tx,marginBottom:6}}>Ladda upp bild på avropet</div>
                  <div style={{fontSize:13,color:C.mu,marginBottom:18,lineHeight:1.5,maxWidth:320,margin:"0 auto 18px"}}>AI läser av dokumentet och fyller i fält åt dig i alla 4 steg. Du kan alltid justera efteråt.</div>
                  <div style={{display:"inline-block",background:C.ac,color:"#fff",padding:"12px 22px",borderRadius:10,fontSize:14,fontWeight:500}}>📤 Välj bild</div>
                </>
              )}
            </div>
          </label>

          <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>

          {/* Skiljelinje */}
          <div style={{display:"flex",alignItems:"center",gap:10,margin:"22px 0"}}>
            <div style={{flex:1,height:1,background:C.b}}/>
            <span style={{fontSize:11,color:C.mu,letterSpacing:".4px",fontWeight:500}}>ELLER</span>
            <div style={{flex:1,height:1,background:C.b}}/>
          </div>

          <button onClick={hoppaOver} disabled={aiKor} style={{...btnG,padding:"14px",fontSize:14,cursor:aiKor?"not-allowed":"pointer",opacity:aiKor?.5:1}}>✍ Hoppa över — fyll i manuellt</button>
        </div>
      </div>
    )
  }

  // ── BEKRÄFTELSE-SKÄRM (steg 5) ──
  if (steg === 5) {
    const valdaNamn = valdaForetag.map(id => INIT_FORETAG.find(c => c.id === id)?.namn).filter(Boolean)
    const ikon = utkast ? "📝" : mottagare === "marketplace" ? "📢" : "🔒"
    const rubrik = utkast ? "Sparat som utkast!" : mottagare === "marketplace" ? "Avrop publicerat!" : "Avrop skickat!"
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:500,padding:"0 24px",textAlign:"center"}}>
        <div style={{fontSize:64,marginBottom:20}}>{ikon}</div>
        <h2 style={{fontSize:22,fontWeight:600,marginBottom:10}}>{rubrik}</h2>
        <p style={{color:C.mu,fontSize:14,maxWidth:340,lineHeight:1.55}}>
          {utkast
            ? "Avropet är sparat men inte skickat. Du kan publicera eller skicka senare från Mina avrop."
            : mottagare === "marketplace"
              ? "Alla underleverantörer på plattformen kan nu se och ansöka."
              : `${valdaNamn.length === 1 ? valdaNamn[0] : `${valdaNamn.length} företag`} har fått en notis och kan se avropet i sin lista.`}
        </p>
        {!utkast && mottagare === "specifik" && valdaNamn.length > 0 && (
          <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:14,maxWidth:340,width:"100%"}}>
            {valdaForetag.map(id => {
              const f = INIT_FORETAG.find(c => c.id === id)
              if (!f) return null
              return (
                <div key={id} style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"8px 12px"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:f.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{f.logoEmoji}</div>
                  <div style={{flex:1,minWidth:0,textAlign:"left"}}>
                    <div style={{fontSize:12.5,fontWeight:500,color:C.tx}}>{f.namn}</div>
                    <div style={{fontSize:10.5,color:C.ok,marginTop:1,fontWeight:500}}>● Notis skickad</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <button style={{...btnP,maxWidth:280,marginTop:32}} onClick={() => navigate("mina-avrop")}>Visa mina avrop</button>
      </div>
    )
  }

  // ── FORMSTEG 1-4 ──
  const stegRubriker = ["Projektinfo", "Vad krävs?", "Kontakt & Ansvar", "Granska & Publicera"]
  return (
    <div>
      {/* Progress-bar */}
      <div style={{padding:"20px 20px 0",position:"sticky",top:0,background:C.bg,zIndex:5}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
          <h1 style={{fontSize:20,fontWeight:600,letterSpacing:"-.2px"}}>{stegRubriker[steg-1]}</h1>
          <span style={{fontSize:12,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>STEG {steg} AV 4</span>
        </div>
        <div style={{display:"flex",gap:5,marginBottom:18}}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{flex:1,height:5,borderRadius:3,background:n<=steg?C.ac:C.bg3,transition:"background .2s"}}/>
          ))}
        </div>

        {/* AI-banner ovanför steg 1 om AI användes */}
        {aiKlar && steg === 1 && (
          <div style={{background:"rgba(46,125,50,.06)",border:"1px solid rgba(46,125,50,.3)",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>🤖</span>
            <div style={{flex:1,fontSize:12.5,color:C.tx,lineHeight:1.5}}>
              AI fyllde i <strong>{Object.keys(aiFilled).length}</strong> fält. Fält märkta <span style={{color:C.da,fontWeight:600}}>● måste fyllas manuellt</span>.
            </div>
          </div>
        )}
      </div>

      <div style={{padding:`0 20px ${steg === 4 ? 170 : 100}px`}}>
        {/* STEG 1 — Projektinfo */}
        {steg === 1 && (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <Fld f="projektnamn" l="Projektnamn" req st={fStatus("projektnamn")} set={set} data={data} ph="ex. Bangårdsupprustning Borlänge"/>
            <Fld f="bestallare"  l="Beställare"  req st={fStatus("bestallare")}  set={set} data={data} ph="ex. Trafikverket"/>
            <Fld f="arbetsplats" l="Arbetsplats / plats" req st={fStatus("arbetsplats")} set={set} data={data} ph="ex. Borlänge bangård, spår 5-8"/>
            <Fld f="koordinater" l="Koordinater" st={fStatus("koordinater")} set={set} data={data} ph="ex. 60.4842, 15.4347"/>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1}}><Fld f="startdatum" l="Startdatum" req type="date" st={fStatus("startdatum")} set={set} data={data}/></div>
              <div style={{flex:1}}><Fld f="slutdatum"  l="Slutdatum"  req type="date" st={fStatus("slutdatum")}  set={set} data={data}/></div>
            </div>
            <Fld f="deadline" l="Deadline för ansökan" req type="date" st={fStatus("deadline")} set={set} data={data}/>
          </div>
        )}

        {/* STEG 2 — Vad krävs */}
        {steg === 2 && (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {/* HERO-FÄLT: Vad söker ni från underleverantören? — Alltid manuell, aldrig AI */}
            <div style={{background:"rgba(232,184,75,.05)",border:`1.5px solid ${tomt("vadSokerNi") ? "rgba(224,82,82,.45)" : "rgba(232,184,75,.4)"}`,borderRadius:14,padding:"18px 18px 16px",marginBottom:4}}>
              <h2 style={{fontSize:17.5,fontWeight:600,color:C.tx,marginBottom:6,letterSpacing:"-.2px",lineHeight:1.3}}>
                Vad söker ni från underleverantören? <span style={{color:C.da,marginLeft:2}}>*</span>
              </h2>
              <p style={{fontSize:13,color:C.mu,lineHeight:1.55,marginBottom:14}}>
                Beskriv exakt vad ni behöver — typ av företag, kompetenser, certifikat, erfarenhet, antal personer. Detta är det första underleverantören läser.
              </p>
              <textarea
                value={data.vadSokerNi}
                onChange={e => set("vadSokerNi", e.target.value)}
                placeholder="ex. Vi söker ett BVS-certifierat företag med minst 3 års erfarenhet av termitsvetsning. Teamet ska bestå av minst 6 personer varav 2 erfarna spårtekniker..."
                style={{
                  ...inp,
                  height:160,
                  resize:"vertical",
                  border:`1.5px solid ${tomt("vadSokerNi") ? "rgba(224,82,82,.5)" : "rgba(46,125,50,.4)"}`,
                  background: tomt("vadSokerNi") ? "rgba(224,82,82,.03)" : "rgba(46,125,50,.025)",
                  padding:"12px 14px",
                  fontSize:14,
                  lineHeight:1.55,
                  fontFamily:"inherit",
                }}
              />
              <div style={{fontSize:11,color:C.mu,marginTop:8,fontStyle:"italic",lineHeight:1.5}}>
                Fylls alltid i manuellt — AI kan inte avgöra vad just ni söker
              </div>
              {tomt("vadSokerNi") && (
                <div style={{fontSize:11.5,color:C.da,marginTop:8,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
                  <span>●</span><span>Måste fyllas i manuellt</span>
                </div>
              )}
            </div>

            <Fld f="arbetsuppgifter" l="Huvudsakliga arbetsuppgifter" req type="textarea" st={fStatus("arbetsuppgifter")} set={set} data={data} ph="Beskriv vad arbetet omfattar, vilka åtgärder som ska utföras..."/>

            {/* Bemanningsbehov — dynamisk lista med roll + antal */}
            <div>
              <label style={{...lbl,display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span>👷 Bemanningsbehov</span>
                {fStatus("bemanning") === "ai" && <span style={{fontSize:11,padding:"2px 7px",borderRadius:8,background:"rgba(46,125,50,.12)",color:C.ok,fontWeight:600,letterSpacing:".2px"}}>✓ AI fyllde</span>}
              </label>
              <div style={{fontSize:11.5,color:C.mu,marginBottom:8,lineHeight:1.45}}>
                Lägg till varje roll med antal personer. Detta visas tydligt för underleverantören i marketplace.
              </div>
              {data.bemanning.length > 0 && (
                <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:8}}>
                  {data.bemanning.map((rad, i) => (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:8,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"8px 10px"}}>
                      <select
                        value={rad.roll}
                        onChange={e => setData(d => ({...d, bemanning: d.bemanning.map((r, j) => j === i ? {...r, roll: e.target.value} : r)}))}
                        style={{flex:1,padding:"8px 10px",border:`1px solid ${C.b}`,borderRadius:8,background:C.bg,fontSize:13.5,fontFamily:"inherit",color:C.tx,minWidth:0}}
                      >
                        <option value="">— Välj roll —</option>
                        {ROLLER.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <input
                        type="number"
                        min="1"
                        value={rad.antal}
                        onChange={e => setData(d => ({...d, bemanning: d.bemanning.map((r, j) => j === i ? {...r, antal: Number(e.target.value) || ""} : r)}))}
                        style={{width:72,padding:"8px 10px",border:`1px solid ${C.b}`,borderRadius:8,background:C.bg,fontSize:13.5,fontFamily:"inherit",color:C.tx,textAlign:"center"}}
                        placeholder="Antal"
                      />
                      <button
                        onClick={() => setData(d => ({...d, bemanning: d.bemanning.filter((_, j) => j !== i)}))}
                        style={{width:32,height:32,borderRadius:"50%",background:"rgba(224,82,82,.08)",border:`1px solid rgba(224,82,82,.25)`,color:C.da,cursor:"pointer",fontSize:18,lineHeight:1,padding:0,fontFamily:"inherit",flexShrink:0}}
                        title="Ta bort rad"
                      >×</button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setData(d => ({...d, bemanning: [...d.bemanning, {roll:"", antal:1}]}))}
                style={{...btnG,padding:"10px 14px",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}
              >
                <span style={{fontSize:16,fontWeight:600,lineHeight:1}}>+</span>
                <span>Lägg till roll</span>
              </button>
              {data.bemanning.length > 0 && (
                <div style={{fontSize:11.5,color:C.mu,marginTop:8,textAlign:"right",fontWeight:500}}>
                  Totalt: <strong style={{color:C.tx,fontWeight:600}}>{data.bemanning.reduce((s, r) => s + (Number(r.antal) || 0), 0)} personer</strong> i {data.bemanning.filter(r => r.roll).length} {data.bemanning.filter(r => r.roll).length === 1 ? "roll" : "roller"}
                </div>
              )}
            </div>
            <div>
              <div style={{fontSize:12,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:8}}>OMFATTNING <span style={{color:C.da}}>*</span></div>
              <div style={{display:"flex",gap:10}}>
                <div style={{flex:1}}><Fld f="antalMan"    l="Antal man"    req st={fStatus("antalMan")}    set={set} data={data} ph="ex. 8" hideLbl/></div>
                <div style={{flex:1}}><Fld f="antalVeckor" l="Antal veckor" req st={fStatus("antalVeckor")} set={set} data={data} ph="ex. 6" hideLbl/></div>
              </div>
              <div style={{fontSize:11,color:C.mu,marginTop:4,paddingLeft:2}}>Antal man · Antal veckor</div>
            </div>
            <Fld f="arbetstider" l="Arbetstider" req st={fStatus("arbetstider")} set={set} data={data} ph="ex. Mån-Fre 06:00-16:00"/>
            <Fld f="material" l="Material som behövs" type="textarea" st={fStatus("material")} set={set} data={data} ph="Lista eventuellt material som ska användas eller skaffas..."/>

            <div>
              <label style={{...lbl,display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                Verktyg som krävs <span style={{color:C.da}}>*</span>
                {fStatus("verktyg") === "ai" && <span style={{fontSize:11,padding:"2px 7px",borderRadius:8,background:"rgba(46,125,50,.12)",color:C.ok,fontWeight:600}}>✓ AI</span>}
              </label>
              <div style={{display:"flex",gap:7,flexWrap:"wrap",padding:data.verktyg.length===0?"2px":"0"}}>
                {VERKTYG_TAGGAR.map(v => {
                  const vald = data.verktyg.includes(v)
                  return <button key={v} onClick={() => toggleVerktyg(v)} style={{fontSize:13,padding:"7px 13px",borderRadius:8,border:`1px solid ${vald?C.ac:C.b}`,background:vald?"rgba(21,101,192,.08)":C.bg2,color:vald?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:vald?500:400}}>{vald?"✓ ":""}{v}</button>
                })}
              </div>
              {data.verktyg.length === 0 && <div style={{fontSize:11.5,color:C.da,marginTop:8,fontWeight:500}}>● Välj minst ett verktyg</div>}
            </div>

            <Fld f="extraInfo" l="Extra info / saker att tänka på" type="textarea" st={fStatus("extraInfo")} set={set} data={data} ph="Säkerhetskrav, miljöhänsyn, samordning med andra entreprenörer..."/>
          </div>
        )}

        {/* STEG 3 — Kontakt & Ansvar */}
        {steg === 3 && (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div>
              <div style={{fontSize:12,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:8,textTransform:"uppercase"}}>Arbetsledare på plats <span style={{color:C.da}}>*</span></div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <Fld f="arbetsledareNamn" l="Namn" req st={fStatus("arbetsledareNamn")} set={set} data={data} ph="ex. Magnus Holm" hideLbl/>
                <Fld f="arbetsledareTel"  l="Telefon" req type="tel" st={fStatus("arbetsledareTel")} set={set} data={data} ph="070-123 45 67" hideLbl/>
              </div>
            </div>

            <div>
              <div style={{fontSize:12,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:8,textTransform:"uppercase"}}>Kontaktperson hos beställaren <span style={{color:C.da}}>*</span></div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <Fld f="kontaktNamn" l="Namn" req st={fStatus("kontaktNamn")} set={set} data={data} ph="ex. Lars Eriksson" hideLbl/>
                <Fld f="kontaktTel"  l="Telefon" req type="tel" st={fStatus("kontaktTel")} set={set} data={data} ph="010-123 45 67" hideLbl/>
              </div>
            </div>

            <Fld f="arbetsorderRef" l="Arbetsorder / referensnummer" st={fStatus("arbetsorderRef")} set={set} data={data} ph="ex. TRV-2026-A1234"/>
          </div>
        )}

        {/* STEG 4 — Granska & Publicera */}
        {steg === 4 && (
          <div>
            {saknadeRequired().length > 0 && (
              <div style={{background:"rgba(224,82,82,.06)",border:"1.5px solid rgba(224,82,82,.4)",borderRadius:12,padding:"14px 16px",marginBottom:18,display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:20}}>⚠️</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,color:C.da,fontWeight:700,letterSpacing:".3px",marginBottom:4}}>OBLIGATORISKA FÄLT SAKNAS</div>
                  <div style={{fontSize:12.5,color:C.tx,lineHeight:1.5}}>{saknadeRequired().length} fält måste fyllas i innan publicering.</div>
                </div>
              </div>
            )}
            {saknadeRequired().length === 0 && (
              <div style={{background:"rgba(46,125,50,.06)",border:"1.5px solid rgba(46,125,50,.35)",borderRadius:12,padding:"14px 16px",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>✓</span>
                <div style={{fontSize:13.5,color:C.ok,fontWeight:600}}>Allt är ifyllt och redo att publiceras</div>
              </div>
            )}

            {/* HERO-SAMMANFATTNING: Vad ni söker — egen rubrik, tydligt separerat */}
            <div style={{background:"rgba(232,184,75,.06)",border:`1.5px solid ${tomt("vadSokerNi") ? "rgba(224,82,82,.4)" : "rgba(232,184,75,.4)"}`,borderRadius:14,padding:"16px 18px",marginBottom:22}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:18}}>💡</span>
                <div style={{fontSize:11,color:"#b88a00",fontWeight:700,letterSpacing:".5px"}}>VAD NI SÖKER FRÅN UNDERLEVERANTÖREN</div>
              </div>
              {tomt("vadSokerNi") ? (
                <div style={{fontSize:13.5,color:C.da,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
                  <span>●</span><span>Saknas — måste fyllas i innan publicering</span>
                </div>
              ) : (
                <div style={{fontSize:14,color:C.tx,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{data.vadSokerNi}</div>
              )}
            </div>

            <SammRubrik nr={1} titel="Projektinfo" giltig={stegValid(1)} onEdit={() => setSteg(1)}/>
            <SammKort>
              <SammRad l="Projektnamn" v={data.projektnamn}/>
              <SammRad l="Beställare" v={data.bestallare}/>
              <SammRad l="Arbetsplats" v={data.arbetsplats}/>
              <SammRad l="Koordinater" v={data.koordinater} optional/>
              <SammRad l="Period" v={data.startdatum && data.slutdatum ? `${data.startdatum} → ${data.slutdatum}` : ""}/>
              <SammRad l="Deadline för ansökan" v={data.deadline}/>
            </SammKort>

            <SammRubrik nr={2} titel="Vad krävs?" giltig={stegValid(2)} onEdit={() => setSteg(2)}/>
            <SammKort>
              <SammRad l="Arbetsuppgifter" v={data.arbetsuppgifter} long/>
              <SammRad l="Omfattning" v={data.antalMan && data.antalVeckor ? `${data.antalMan} man · ${data.antalVeckor} veckor` : ""}/>
              <SammRad l="Arbetstider" v={data.arbetstider}/>
              <SammRad l="Material" v={data.material} optional long/>
              <SammRad l="Verktyg" v={data.verktyg.length > 0 ? data.verktyg.join(", ") : ""} long/>
              <SammRad l="Extra info" v={data.extraInfo} optional long/>
            </SammKort>

            <SammRubrik nr={3} titel="Kontakt & Ansvar" giltig={stegValid(3)} onEdit={() => setSteg(3)}/>
            <SammKort>
              <SammRad l="Arbetsledare" v={data.arbetsledareNamn && data.arbetsledareTel ? `${data.arbetsledareNamn} · ${data.arbetsledareTel}` : ""}/>
              <SammRad l="Beställarkontakt" v={data.kontaktNamn && data.kontaktTel ? `${data.kontaktNamn} · ${data.kontaktTel}` : ""}/>
              <SammRad l="Arbetsorder" v={data.arbetsorderRef} optional/>
            </SammKort>
          </div>
        )}
      </div>

      {/* Stickad navigations-bar längst ned */}
      <div style={{position:"fixed",bottom:62,left:0,right:0,background:C.bg,borderTop:`1px solid ${C.b}`,padding:"12px 20px",zIndex:10,maxWidth:430,margin:"0 auto"}}>
        {steg < 4 && (
          <div style={{display:"flex",gap:10}}>
            <button onClick={() => steg === 1 ? setSteg(0) : setSteg(steg - 1)} style={{...btnG,flex:1,padding:"13px",fontSize:14}}>← Tillbaka</button>
            <button onClick={() => stegValid(steg) && setSteg(steg + 1)} disabled={!stegValid(steg)} style={{...btnP,flex:2,padding:"13px",fontSize:14,opacity:stegValid(steg)?1:.45,cursor:stegValid(steg)?"pointer":"not-allowed"}}>Nästa →</button>
          </div>
        )}
        {steg === 4 && (() => {
          const valdaNamn = valdaForetag.map(id => INIT_FORETAG.find(c => c.id === id)?.namn).filter(Boolean)
          const skickaText = valdaNamn.length === 1 ? valdaNamn[0] : `${valdaNamn.length} företag`
          const huvudknappText = mottagare === "marketplace" ? "📢 Publicera i marketplace" : `🔒 Skicka till ${skickaText}`
          return (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{display:"flex",gap:8}}>
                <button onClick={() => setSteg(3)} style={{...btnG,flex:"0 0 auto",padding:"13px 14px",fontSize:13}}>←</button>
                <button onClick={() => {
                  if (!alltValid()) return
                  // Om privat — skapa notiser till mottagande företag
                  if (mottagare === "specifik" && onSkickaPrivat && user) {
                    const avropPayload = {
                      best: user.company,
                      proj: data.projektnamn,
                      plats: data.arbetsplats,
                      tider: data.arbetstider,
                      omf: data.antalMan && data.antalVeckor ? `${data.antalVeckor} veckor · ${data.antalMan} man` : "",
                      uppg: data.arbetsuppgifter,
                      behov: data.vadSokerNi,
                      verktyg: data.verktyg,
                      bemanning: data.bemanning,
                      deadline: data.deadline,
                      startdatum: data.startdatum,
                      slutdatum: data.slutdatum,
                      koordinater: data.koordinater,
                      material: data.material,
                      extraInfo: data.extraInfo,
                      arbetsledareNamn: data.arbetsledareNamn,
                      arbetsledareTel: data.arbetsledareTel,
                      kontaktNamn: data.kontaktNamn,
                      kontaktTel: data.kontaktTel,
                      arbetsorderRef: data.arbetsorderRef,
                    }
                    onSkickaPrivat(avropPayload, valdaForetag, user.name, user.company)
                  }
                  setUtkast(false); setSteg(5)
                }} disabled={!alltValid()} style={{...btnP,flex:1,padding:"14px",fontSize:14.5,fontWeight:500,opacity:alltValid()?1:.45,cursor:alltValid()?"pointer":"not-allowed"}}>{huvudknappText}</button>
              </div>
              <button onClick={() => { setUtkast(true); setSteg(5) }} style={{background:"none",border:"none",color:C.mu,fontSize:11.5,cursor:"pointer",padding:"4px 0 2px",fontFamily:"inherit",textAlign:"center",lineHeight:1.5}}>
                <span style={{fontWeight:500,color:C.tx}}>📝 Spara som utkast istället</span> — sparas men skickas inte till någon. Du kan publicera eller skicka senare.
              </button>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

// — Fld: input-fält med AI-status-indikator —
function Fld({f, l, req, type, st, set, data, ph, hideLbl}) {
  const isArea = type === "textarea"
  const showRed = st === "manuell"
  const showGreen = st === "ai"
  const showFilled = st === "ok"
  const borderColor = showRed ? "rgba(224,82,82,.5)" : showGreen ? "rgba(46,125,50,.4)" : C.b
  const bgColor = showRed ? "rgba(224,82,82,.03)" : showGreen ? "rgba(46,125,50,.025)" : C.bg2
  return (
    <div>
      {!hideLbl && (
        <label style={{...lbl,display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          <span>{l}{req && <span style={{color:C.da,marginLeft:3}}>*</span>}</span>
          {showGreen  && <span style={{fontSize:11,padding:"2px 7px",borderRadius:8,background:"rgba(46,125,50,.12)",color:C.ok,fontWeight:600,letterSpacing:".2px"}}>✓ AI fyllde</span>}
          {showFilled && <span style={{fontSize:11,padding:"2px 7px",borderRadius:8,background:"rgba(46,125,50,.1)",color:C.ok,fontWeight:600,letterSpacing:".2px"}}>✓</span>}
        </label>
      )}
      {isArea ? (
        <textarea
          value={data[f]}
          onChange={e => set(f, e.target.value)}
          placeholder={ph}
          style={{...inp,height:110,resize:"vertical",border:`1.5px solid ${borderColor}`,background:bgColor,padding:"12px 14px",fontSize:14,lineHeight:1.5}}
        />
      ) : (
        <input
          type={type || "text"}
          value={data[f]}
          onChange={e => set(f, e.target.value)}
          placeholder={ph}
          style={{...inp,border:`1.5px solid ${borderColor}`,background:bgColor,padding:"13px 14px",fontSize:14.5,colorScheme:type==="date"?"light":undefined}}
        />
      )}
      {showRed && (
        <div style={{fontSize:11.5,color:C.da,marginTop:6,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
          <span>●</span><span>Måste fyllas i manuellt</span>
        </div>
      )}
    </div>
  )
}

// — Sammanfattnings-komponenter för Steg 4 —
function SammRubrik({nr, titel, giltig, onEdit}) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:18,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:24,height:24,borderRadius:"50%",background:giltig?C.ok:"rgba(224,82,82,.15)",color:giltig?"#fff":C.da,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700}}>{giltig?"✓":nr}</div>
        <div style={{fontSize:14,fontWeight:600}}>{titel}</div>
      </div>
      <button onClick={onEdit} style={{background:"none",border:"none",color:C.ac,fontSize:12.5,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Redigera ›</button>
    </div>
  )
}
function SammKort({children}) {
  return <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"12px 16px",display:"flex",flexDirection:"column",gap:8}}>{children}</div>
}
function SammRad({l, v, optional, long}) {
  const tomt = !v || (typeof v === "string" && !v.trim())
  return (
    <div style={{display:"flex",flexDirection:long?"column":"row",justifyContent:"space-between",alignItems:long?"stretch":"baseline",gap:long?4:8,paddingTop:long?2:0}}>
      <div style={{fontSize:11.5,color:C.mu,fontWeight:500,letterSpacing:".2px",minWidth:long?undefined:130,flexShrink:0}}>{l}</div>
      <div style={{fontSize:13.5,color:tomt?(optional?C.mu:C.da):C.tx,fontWeight:tomt&&!optional?600:400,textAlign:long?"left":"right",lineHeight:1.5,flex:long?1:undefined}}>
        {tomt ? (optional ? "—" : "● Saknas") : v}
      </div>
    </div>
  )
}


// ── Mina avrop (företag) ─────────────────────────────────────
function MinaAvrop({navigate, ansokningar, user, privataAvrop, privatNotiser, onVidareskicka}) {
  const [skickaTillAnnanFor, setSkickaTillAnnanFor] = useState(null)
  const minForetagId = user ? INIT_FORETAG.find(c => c.namn === user.company)?.id : null

  // Mina egna PRIVATA avrop (jag är beställaren)
  const minaPrivataSkickade = (privataAvrop || []).filter(a =>
    a.bestallareForetagId === minForetagId ||
    a.bestallareForetag === user?.company
  )

  // Bygg en lista över mottagare per avrop + deras status
  function mottagareInfo(avrop) {
    return (avrop.mottagarforetagIds || []).map(fId => {
      const foretag = INIT_FORETAG.find(c => c.id === fId)
      const harNekat = (avrop.declinedForetagIds || []).includes(fId)
      // Hitta tacka-nej-svar för detta avrop+företag
      const svarsNotis = harNekat
        ? (privatNotiser || []).find(n => n.typ === "tacka-nej-svar" && n.avropId === avrop.id && n.fromForetagId === fId)
        : null
      return {
        foretagId: fId,
        namn: foretag?.namn || fId,
        emoji: foretag?.logoEmoji || "🏢",
        logoBg: foretag?.logoBg || C.bg3,
        harNekat,
        nekatTid: svarsNotis?.tid,
        kommentar: svarsNotis?.kommentar,
      }
    })
  }

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Mina avrop</h1>
          <span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,color:C.ac,background:"rgba(232,184,75,.15)"}}>{MINA_AVROP.length} aktiva</span>
        </div>
        <div style={{fontSize:13,color:C.mu,marginBottom:18}}>Publicerade avrop och inkomna ansökningar</div>
      </div>

      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>
        {/* Befintliga publika avrop */}
        {MINA_AVROP.map(a => {
          const openAns = ansokningar.filter(x => x.avropId === a.id && x.status === "open").length
          const acceptedAns = ansokningar.filter(x => x.avropId === a.id && x.status === "accepted").length
          return (
            <button key={a.id} onClick={() => navigate("ansokningar", a)} style={{...card,textAlign:"left",cursor:"pointer",width:"100%",transition:"border-color .15s"}}
              onMouseOver={e=>e.currentTarget.style.borderColor=C.b2}
              onMouseOut={e=>e.currentTarget.style.borderColor=C.b}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <span style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".5px"}}>PUBLICERAT {a.publicerad}</span>
                <Badge status={acceptedAns > 0 ? "tillsatt" : "publicerad"}/>
              </div>
              <div style={{fontWeight:600,fontSize:16,marginBottom:6,letterSpacing:"-.2px"}}>{a.proj}</div>
              <div style={{color:C.mu,fontSize:13,marginBottom:10}}>📍 {a.plats}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10,paddingTop:10,borderTop:`1px solid ${C.b}`}}>
                <span style={{fontSize:13,fontWeight:500}}>
                  {openAns > 0 && (
                    <span style={{display:"inline-flex",alignItems:"center",gap:7,color:C.tx}}>
                      <span style={{width:7,height:7,borderRadius:"50%",background:C.da}}/>
                      {openAns} {openAns === 1 ? "ny ansökan" : "nya ansökningar"}
                    </span>
                  )}
                  {openAns === 0 && acceptedAns > 0 && <span style={{color:C.ok}}>✓ Tillsatt</span>}
                  {openAns === 0 && acceptedAns === 0 && <span style={{color:C.mu,fontWeight:400}}>Inga ansökningar än</span>}
                </span>
                <span style={{fontSize:12,color:C.da}}>Deadline {a.deadline}</span>
              </div>
            </button>
          )
        })}
        <button onClick={() => navigate("skapa-avrop")} style={{...btnG,marginTop:6,borderStyle:"dashed",color:C.ac}}>+ Skapa nytt avrop</button>
      </div>

      {/* Privata avrop ni skickat — med "Tackat nej"-info */}
      {minaPrivataSkickade.length > 0 && (
        <div style={{padding:"24px 20px 30px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{fontSize:11,fontWeight:600,letterSpacing:".5px",color:C.mu,textTransform:"uppercase"}}>
              🔒 Privata avrop ni skickat
            </span>
            <span style={{fontSize:11,padding:"2px 8px",borderRadius:10,background:"rgba(21,101,192,.1)",color:C.ac,fontWeight:600,letterSpacing:".3px"}}>{minaPrivataSkickade.length}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {minaPrivataSkickade.map(a => {
              const mottagare = mottagareInfo(a)
              const nekade = mottagare.filter(m => m.harNekat)
              const ovriga = mottagare.filter(m => !m.harNekat)
              return (
                <div key={a.id} style={{...card,padding:"14px 16px"}}>
                  {/* Avrop-header */}
                  <button onClick={() => navigate("avrop", a)} style={{display:"block",width:"100%",textAlign:"left",background:"none",border:"none",padding:0,cursor:"pointer",fontFamily:"inherit",marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${C.b}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6,gap:8}}>
                      <span style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".5px"}}>PUBLICERAT {a.publicerad}</span>
                      <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(21,101,192,.12)",color:C.ac,fontWeight:700,letterSpacing:".3px"}}>🔒 PRIVAT</span>
                    </div>
                    <div style={{fontWeight:600,fontSize:15.5,marginBottom:4,letterSpacing:"-.2px",lineHeight:1.3}}>{a.proj}</div>
                    <div style={{color:C.mu,fontSize:12.5}}>📍 {a.plats} · Deadline {a.deadline}</div>
                  </button>

                  {/* Tackat nej-sektion */}
                  {nekade.length > 0 && (
                    <div style={{marginBottom: ovriga.length > 0 ? 12 : 12}}>
                      <div style={{fontSize:10.5,color:C.da,fontWeight:700,letterSpacing:".4px",marginBottom:8}}>❌ TACKAT NEJ ({nekade.length})</div>
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        {nekade.map(m => (
                          <div key={m.foretagId} style={{background:"rgba(224,82,82,.04)",border:"1px solid rgba(224,82,82,.25)",borderRadius:10,padding:"10px 12px"}}>
                            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom: m.kommentar ? 8 : 0}}>
                              <div style={{width:32,height:32,borderRadius:8,background:m.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{m.emoji}</div>
                              <div style={{flex:1,minWidth:0}}>
                                <div style={{fontSize:13.5,fontWeight:600,color:C.tx}}>{m.namn}</div>
                                {m.nekatTid && <div style={{fontSize:11,color:C.mu,marginTop:1}}>Tackade nej · {m.nekatTid}</div>}
                              </div>
                            </div>
                            {m.kommentar && (
                              <div style={{fontSize:12.5,color:C.tx,padding:"8px 10px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:6,fontStyle:"italic",lineHeight:1.5,marginLeft:42}}>
                                "{m.kommentar}"
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inte svarat än */}
                  {ovriga.length > 0 && (
                    <div style={{marginBottom:12}}>
                      <div style={{fontSize:10.5,color:C.mu,fontWeight:700,letterSpacing:".4px",marginBottom:8}}>⏳ INTE SVARAT ÄN ({ovriga.length})</div>
                      <div style={{display:"flex",flexDirection:"column",gap:6}}>
                        {ovriga.map(m => (
                          <div key={m.foretagId} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:8}}>
                            <div style={{width:30,height:30,borderRadius:8,background:m.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{m.emoji}</div>
                            <span style={{fontSize:13,color:C.tx,fontWeight:500}}>{m.namn}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skicka till annat företag-knapp */}
                  <button
                    onClick={() => setSkickaTillAnnanFor(a)}
                    style={{...btnG,width:"100%",padding:"11px",fontSize:13,fontWeight:500,color:C.ac,border:`1.5px dashed rgba(21,101,192,.4)`,background:"rgba(21,101,192,.04)"}}
                  >🔒 Skicka till annat företag</button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Modal för att skicka till annat företag */}
      {skickaTillAnnanFor && (
        <SkickaTillAnnanModal
          avrop={skickaTillAnnanFor}
          onValj={nyttForetagId => {
            if (onVidareskicka) onVidareskicka(skickaTillAnnanFor.id, nyttForetagId)
            setSkickaTillAnnanFor(null)
          }}
          onClose={() => setSkickaTillAnnanFor(null)}
        />
      )}
    </div>
  )
}

// — Modal: välj nytt företag att vidaresending privata avrop till —
function SkickaTillAnnanModal({avrop, onValj, onClose}) {
  const [sok, setSok] = useState("")
  // Exkludera företag som redan är mottagare (oavsett om de svarat eller ej) + egen bestallare
  const exkludera = new Set([
    ...(avrop.mottagarforetagIds || []),
    avrop.bestallareForetagId,
  ])
  const valbara = INIT_FORETAG.filter(c => !exkludera.has(c.id))
  const filt = valbara.filter(c => !sok.trim() || (c.namn + " " + c.ort).toLowerCase().includes(sok.toLowerCase()))

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.ac,letterSpacing:".5px",fontWeight:700,marginBottom:6}}>🔒 SKICKA TILL ANNAT FÖRETAG</div>
        <div style={{textAlign:"center",fontSize:14.5,color:C.tx,fontWeight:600,marginBottom:6,lineHeight:1.3}}>Vidareskicka avropet</div>
        <div style={{textAlign:"center",fontSize:12.5,color:C.mu,marginBottom:14,fontStyle:"italic"}}>"{avrop.proj}"</div>
        <input style={{...inp,marginBottom:12,fontSize:13.5}} placeholder="🔍 Sök företag, ort..." value={sok} onChange={e => setSok(e.target.value)}/>
        {filt.length === 0 ? (
          <div style={{padding:18,textAlign:"center",fontSize:13,color:C.mu}}>
            {valbara.length === 0 ? "Inga fler företag tillgängliga — avropet är redan skickat till alla i registret." : "Inga företag matchade sökningen"}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:340,overflowY:"auto",marginBottom:14}}>
            {filt.map(c => (
              <button key={c.id} onClick={() => onValj(c.id)} style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                <div style={{width:38,height:38,borderRadius:10,background:c.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{c.logoEmoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13.5,fontWeight:500,color:C.tx}}>{c.namn}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:1}}>{c.typ} · {c.ort}</div>
                </div>
                <span style={{fontSize:11,color:C.ac,fontWeight:600,letterSpacing:".3px"}}>SKICKA →</span>
              </button>
            ))}
          </div>
        )}
        <button onClick={onClose} style={btnG}>Avbryt</button>
      </div>
    </div>
  )
}

// ── Ansökningar per avrop ────────────────────────────────────
function AvropAnsokningar({avrop, ansokningar, navigate}) {
  const filtered = ansokningar.filter(a => a.avropId === avrop.id)
  const open = filtered.filter(a => a.status === "open")
  const accepted = filtered.filter(a => a.status === "accepted")
  const rejected = filtered.filter(a => a.status === "rejected")

  const Row = ({a, dim}) => (
    <button key={a.id} onClick={() => navigate("ansokan", {ansokan: a, avrop})} style={{...card,textAlign:"left",cursor:"pointer",width:"100%",opacity:dim?.7:1,transition:"border-color .15s"}}
      onMouseOver={e=>e.currentTarget.style.borderColor=C.b2}
      onMouseOut={e=>e.currentTarget.style.borderColor=C.b}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
        <div>
          <div style={{fontSize:15,fontWeight:600}}>{a.foretag}</div>
          <div style={{fontSize:12,color:C.mu,marginTop:2}}>{a.arbetsledare} · {a.team.length} man</div>
        </div>
        <Badge status={a.status}/>
      </div>
      {a.status === "open" && (
        <div style={{fontSize:13,color:C.mu,lineHeight:1.5,marginTop:10,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{a.msg}</div>
      )}
      <div style={{fontSize:11,color:C.mu,marginTop:8}}>{a.datum}</div>
    </button>
  )

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("mina-avrop")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{minWidth:0}}>
          <div style={{fontSize:11,color:C.mu}}>Ansökningar</div>
          <div style={{fontWeight:600,fontSize:15,letterSpacing:"-.2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{avrop.proj}</div>
        </div>
      </div>
      <div style={{padding:"18px 20px",display:"flex",flexDirection:"column",gap:10}}>
        {filtered.length === 0 && (
          <div style={{...card,textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:32,marginBottom:10}}>📭</div>
            <div style={{color:C.mu,fontSize:14}}>Inga ansökningar än</div>
            <div style={{color:C.mu,fontSize:12,marginTop:6}}>Avrop publicerat {avrop.publicerad}</div>
          </div>
        )}
        {open.length > 0 && <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,margin:"4px 0 2px"}}>NYA ({open.length})</div>}
        {open.map(a => <Row key={a.id} a={a}/>)}
        {accepted.length > 0 && <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,margin:"10px 0 2px"}}>ACCEPTERADE ({accepted.length})</div>}
        {accepted.map(a => <Row key={a.id} a={a}/>)}
        {rejected.length > 0 && <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,margin:"10px 0 2px"}}>AVSLAGNA ({rejected.length})</div>}
        {rejected.map(a => <Row key={a.id} a={a} dim/>)}
      </div>
    </div>
  )
}

// ── Ansökan detalj ───────────────────────────────────────────
function AnsokanDetail({ansokan, avrop, navigate, onAction}) {
  const [confirming, setConfirming] = useState(null) // "accept" | "reject" | null

  function handleAccept() { onAction(ansokan.id, "accepted"); navigate("ansokningar", avrop) }
  function handleReject() { onAction(ansokan.id, "rejected"); navigate("ansokningar", avrop) }

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("ansokningar", avrop)} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{minWidth:0}}>
          <div style={{fontSize:11,color:C.mu}}>Ansökan</div>
          <div style={{fontWeight:600,fontSize:15,letterSpacing:"-.2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ansokan.foretag}</div>
        </div>
      </div>
      <div style={{padding:"18px 20px",display:"flex",flexDirection:"column",gap:12}}>
        <div style={card}>
          <div style={{fontSize:11,color:C.mu,marginBottom:8,textTransform:"uppercase",letterSpacing:".5px"}}>Avser avrop</div>
          <div style={{fontSize:14,fontWeight:500}}>{avrop.proj}</div>
          <div style={{fontSize:12,color:C.mu,marginTop:3}}>📍 {avrop.plats}</div>
        </div>
        <div style={card}>
          <div style={{fontSize:11,color:C.mu,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Arbetsledare</div>
          <div style={{fontSize:15,fontWeight:500}}>{ansokan.arbetsledare}</div>
          <div style={{fontSize:13,color:C.mu,marginTop:3}}>📞 {ansokan.tel}</div>
        </div>
        <div style={card}>
          <div style={{fontSize:11,color:C.mu,marginBottom:8,textTransform:"uppercase",letterSpacing:".5px"}}>Meddelande</div>
          <div style={{fontSize:14,lineHeight:1.6}}>{ansokan.msg}</div>
        </div>
        <div style={card}>
          <div style={{fontSize:11,color:C.mu,marginBottom:12,textTransform:"uppercase",letterSpacing:".5px"}}>Team ({ansokan.team.length} man)</div>
          {ansokan.team.map(name => (
            <div key={name} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:C.ac,flexShrink:0}}>{name.split(" ").map(n=>n[0]).join("")}</div>
              <div style={{fontSize:14}}>{name}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:12,color:C.mu,textAlign:"center"}}>Inkommen {ansokan.datum}</div>

        {ansokan.status === "open" && !confirming && (
          <div style={{display:"flex",gap:10,marginTop:4}}>
            <button style={{...btnG,flex:1,borderColor:"rgba(198,40,40,.3)",color:C.da}} onClick={() => setConfirming("reject")}>Avslå</button>
            <button style={{...btnP,flex:1}} onClick={() => setConfirming("accept")}>Acceptera</button>
          </div>
        )}
        {confirming === "accept" && (
          <div style={{...card,borderColor:"rgba(46,125,50,.3)",background:"rgba(46,125,50,.06)"}}>
            <div style={{fontSize:14,marginBottom:12,lineHeight:1.5}}>Acceptera ansökan från <strong>{ansokan.foretag}</strong>? Övriga sökande avslås automatiskt.</div>
            <div style={{display:"flex",gap:10}}>
              <button style={{...btnG,flex:1}} onClick={() => setConfirming(null)}>Avbryt</button>
              <button style={{...btnP,flex:1}} onClick={handleAccept}>Bekräfta</button>
            </div>
          </div>
        )}
        {confirming === "reject" && (
          <div style={{...card,borderColor:"rgba(198,40,40,.3)",background:"rgba(198,40,40,.06)"}}>
            <div style={{fontSize:14,marginBottom:12,lineHeight:1.5}}>Avslå ansökan från <strong>{ansokan.foretag}</strong>?</div>
            <div style={{display:"flex",gap:10}}>
              <button style={{...btnG,flex:1}} onClick={() => setConfirming(null)}>Avbryt</button>
              <button style={{...btnP,flex:1,background:C.da}} onClick={handleReject}>Bekräfta avslag</button>
            </div>
          </div>
        )}
        {ansokan.status === "accepted" && (
          <div style={{...card,borderColor:"rgba(46,125,50,.3)",background:"rgba(46,125,50,.06)",textAlign:"center"}}>
            <div style={{fontSize:14,color:C.ok,fontWeight:500}}>✓ Ansökan accepterad</div>
          </div>
        )}
        {ansokan.status === "rejected" && (
          <div style={{...card,borderColor:"rgba(198,40,40,.25)",background:"rgba(198,40,40,.05)",textAlign:"center"}}>
            <div style={{fontSize:14,color:C.da,fontWeight:500}}>Ansökan avslagen</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Planering (Företag): tre vyer (Veckovy / Per projekt / Per person) ──
// Klick-baserad bokning: tom cell → välj projekt; bokad cell → info + ta bort.
// Bokning = (anstalldId, projektId, vecka). En person kan bara vara på ett projekt per vecka.
function Planering({bokningar, onAdd, onRemove}) {
  const [view, setView] = useState("vecka")
  const [currentWeek, setCurrentWeek] = useState(22) // V22 = 2026-05-25
  const [picker, setPicker] = useState(null) // {mode:"projekt"|"anstalld"|"info", ...kontext}

  const findProjekt  = id => PROJEKT_LIST.find(p => p.id === id)
  const findAnstalld = id => PLANERING_ANSTALLDA.find(a => a.id === id)
  const colorFor     = p  => PROJECT_PALETTE[p.color % PROJECT_PALETTE.length]
  const initialer    = n  => n.split(" ").map(x => x[0]).join("")

  function openPickProjekt(anstalldId, vecka)  { setPicker({mode:"projekt",  anstalldId, vecka}) }
  function openPickAnstalld(projektId, vecka)  { setPicker({mode:"anstalld", projektId,  vecka}) }
  function openBokningInfo(b, a, p)            { setPicker({mode:"info", bokning:b, anstalld:a, projekt:p}) }

  function handleProjektSelect(projektId)      { onAdd({anstalldId:picker.anstalldId, projektId, vecka:picker.vecka}); setPicker(null) }
  function handleAnstalldSelect(anstalldId)    { onAdd({anstalldId, projektId:picker.projektId, vecka:picker.vecka}); setPicker(null) }
  function handleRemove()                      { onRemove(picker.bokning.id); setPicker(null) }

  // ─── VECKOVY ───────────────────────────────────────────────────────────
  function renderVeckoVy() {
    const idx = WEEKS.indexOf(currentWeek)
    const prev = idx > 0 ? WEEKS[idx-1] : null
    const next = idx < WEEKS.length-1 ? WEEKS[idx+1] : null
    const navBtn = (active) => ({width:38,height:38,borderRadius:8,border:`1px solid ${C.b}`,background:active?C.bg2:"transparent",color:active?C.ac:C.mu,fontSize:18,cursor:active?"pointer":"not-allowed",opacity:active?1:.4,fontFamily:"inherit"})

    return (
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",marginBottom:16}}>
          <button onClick={() => prev && setCurrentWeek(prev)} disabled={!prev} style={navBtn(!!prev)}>←</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".8px"}}>VECKA</div>
            <div style={{fontSize:26,fontWeight:600,lineHeight:1.1}}>V{currentWeek}</div>
          </div>
          <button onClick={() => next && setCurrentWeek(next)} disabled={!next} style={navBtn(!!next)}>→</button>
        </div>
        <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:8}}>
          {PLANERING_ANSTALLDA.map(a => {
            const b = bokningar.find(b => b.anstalldId === a.id && b.vecka === currentWeek)
            const p = b ? findProjekt(b.projektId) : null
            const c = p ? colorFor(p) : null
            return (
              <button key={a.id} onClick={() => b && p ? openBokningInfo(b,a,p) : openPickProjekt(a.id, currentWeek)} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"10px 12px",cursor:"pointer",textAlign:"left",width:"100%",fontFamily:"inherit"}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:C.ac,flexShrink:0}}>{initialer(a.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:500,color:C.tx}}>{a.name}</div>
                  <div style={{fontSize:12,color:C.mu}}>{a.roll}</div>
                </div>
                {p ? (
                  <div style={{background:c.bg,border:`1px solid ${c.border}`,color:c.text,padding:"5px 10px",borderRadius:6,fontSize:12,fontWeight:500,whiteSpace:"nowrap",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",flexShrink:0}}>{p.namn}</div>
                ) : (
                  <span style={{fontSize:12,color:C.mu,fontStyle:"italic",flexShrink:0}}>Ledig +</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ─── PER PROJEKT ───────────────────────────────────────────────────────
  function renderProjektVy() {
    return (
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:14}}>
        {PROJEKT_LIST.map(p => {
          const c = colorFor(p)
          const projBokningar = bokningar.filter(b => b.projektId === p.id)
          const totalPersoner = new Set(projBokningar.map(b => b.anstalldId)).size
          return (
            <div key={p.id} style={{background:C.bg2,border:`1px solid ${c.border}`,borderRadius:14,padding:"14px 0"}}>
              <div style={{padding:"0 16px",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{width:10,height:10,borderRadius:3,background:c.text}}/>
                  <div style={{fontSize:15,fontWeight:600}}>{p.namn}</div>
                </div>
                <div style={{fontSize:12,color:C.mu}}>📍 {p.plats} · {p.arbete}</div>
                <div style={{fontSize:11,color:C.mu,marginTop:4}}>{totalPersoner} {totalPersoner === 1 ? "person" : "personer"} bokade · {projBokningar.length} v totalt</div>
              </div>
              <div style={{overflowX:"auto",padding:"0 16px"}}>
                <div style={{display:"flex",gap:6,minWidth:"max-content",paddingBottom:4}}>
                  {WEEKS.map(w => {
                    const wb = projBokningar.filter(b => b.vecka === w)
                    return (
                      <button key={w} onClick={() => openPickAnstalld(p.id, w)} style={{minWidth:64,flexShrink:0,background:wb.length>0?c.bg:C.bg3,border:`1px solid ${wb.length>0?c.border:C.b}`,borderRadius:8,padding:6,cursor:"pointer",textAlign:"center",fontFamily:"inherit",minHeight:68,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                        <div style={{fontSize:10,color:C.mu,fontWeight:500}}>V{w}</div>
                        {wb.length > 0 ? (
                          <div style={{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"center"}}>
                            {wb.map(b => {
                              const a = findAnstalld(b.anstalldId)
                              return a ? <div key={b.id} title={a.name} style={{width:22,height:22,borderRadius:"50%",background:c.text,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:600,lineHeight:1}}>{initialer(a.name)}</div> : null
                            })}
                          </div>
                        ) : (
                          <div style={{fontSize:18,color:C.mu,lineHeight:1}}>+</div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // ─── PER PERSON ────────────────────────────────────────────────────────
  function renderPersonVy() {
    return (
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:14}}>
        {PLANERING_ANSTALLDA.map(a => {
          const personBokningar = bokningar.filter(b => b.anstalldId === a.id)
          return (
            <div key={a.id} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:14,padding:"14px 0"}}>
              <div style={{padding:"0 16px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:C.ac,flexShrink:0}}>{initialer(a.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:600}}>{a.name}</div>
                  <div style={{fontSize:12,color:C.mu}}>{a.roll}</div>
                </div>
                <span style={{fontSize:11,color:C.mu,flexShrink:0}}>{personBokningar.length} v bokade</span>
              </div>
              <div style={{overflowX:"auto",padding:"0 16px"}}>
                <div style={{display:"flex",gap:4,minWidth:"max-content",paddingBottom:4}}>
                  {WEEKS.map(w => {
                    const b = personBokningar.find(b => b.vecka === w)
                    const p = b ? findProjekt(b.projektId) : null
                    const c = p ? colorFor(p) : null
                    return (
                      <button key={w} onClick={() => b && p ? openBokningInfo(b,a,p) : openPickProjekt(a.id, w)} style={{minWidth:74,flexShrink:0,background:p?c.bg:C.bg3,border:`1px solid ${p?c.border:C.b}`,borderRadius:8,padding:"6px 4px",cursor:"pointer",textAlign:"center",fontFamily:"inherit",minHeight:60,display:"flex",flexDirection:"column",justifyContent:"center",gap:3}}>
                        <div style={{fontSize:10,color:C.mu,fontWeight:500}}>V{w}</div>
                        {p ? (
                          <div style={{fontSize:11,color:c.text,fontWeight:500,lineHeight:1.2,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",padding:"0 2px"}}>{p.namn}</div>
                        ) : (
                          <div style={{fontSize:16,color:C.mu,lineHeight:1}}>+</div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // ─── PICKER MODAL ──────────────────────────────────────────────────────
  function renderPicker() {
    const overlay = {position:"fixed",inset:0,background:"rgba(13,31,53,.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100,padding:0}
    const sheet = {background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"20px 20px 28px",maxWidth:430,width:"100%",maxHeight:"82vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}

    if (picker.mode === "projekt") {
      const a = findAnstalld(picker.anstalldId)
      return (
        <div onClick={() => setPicker(null)} style={overlay}>
          <div onClick={e => e.stopPropagation()} style={sheet}>
            <div style={{textAlign:"center",marginBottom:14}}>
              <div style={{fontSize:11,color:C.mu,letterSpacing:".5px"}}>BOKA · VECKA {picker.vecka}</div>
              <div style={{fontSize:18,fontWeight:600,marginTop:4}}>{a?.name}</div>
              <div style={{fontSize:13,color:C.mu}}>Välj projekt</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
              {PROJEKT_LIST.map(p => {
                const c = colorFor(p)
                return (
                  <button key={p.id} onClick={() => handleProjektSelect(p.id)} style={{display:"flex",alignItems:"center",gap:12,background:c.bg,border:`1px solid ${c.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                    <div style={{width:6,height:36,borderRadius:3,background:c.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:600,color:c.text}}>{p.namn}</div>
                      <div style={{fontSize:12,color:C.mu,marginTop:1}}>📍 {p.plats} · {p.arbete}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            <button onClick={() => setPicker(null)} style={btnG}>Avbryt</button>
          </div>
        </div>
      )
    }

    if (picker.mode === "anstalld") {
      const p = findProjekt(picker.projektId)
      const c = p ? colorFor(p) : null
      return (
        <div onClick={() => setPicker(null)} style={overlay}>
          <div onClick={e => e.stopPropagation()} style={sheet}>
            <div style={{textAlign:"center",marginBottom:14}}>
              <div style={{fontSize:11,color:C.mu,letterSpacing:".5px"}}>VECKA {picker.vecka}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:4}}>
                <div style={{width:10,height:10,borderRadius:3,background:c?.text}}/>
                <div style={{fontSize:18,fontWeight:600}}>{p?.namn}</div>
              </div>
              <div style={{fontSize:13,color:C.mu}}>Välj anställd att lägga till</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
              {PLANERING_ANSTALLDA.map(a => {
                const befintlig = bokningar.find(b => b.anstalldId === a.id && b.vecka === picker.vecka)
                const befintligProj = befintlig ? findProjekt(befintlig.projektId) : null
                const redanHar = befintlig && befintlig.projektId === picker.projektId
                return (
                  <button key={a.id} onClick={() => !redanHar && handleAnstalldSelect(a.id)} disabled={redanHar} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px",cursor:redanHar?"not-allowed":"pointer",textAlign:"left",fontFamily:"inherit",opacity:redanHar?.5:1}}>
                    <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:C.ac,flexShrink:0}}>{initialer(a.name)}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:500}}>{a.name}</div>
                      <div style={{fontSize:11,color:C.mu}}>{redanHar ? "Redan bokad här" : befintligProj ? `Just nu: ${befintligProj.namn}` : a.roll}</div>
                    </div>
                    {befintlig && !redanHar && <span style={{fontSize:10,color:C.da,fontWeight:500,flexShrink:0}}>BYTER</span>}
                  </button>
                )
              })}
            </div>
            <button onClick={() => setPicker(null)} style={btnG}>Avbryt</button>
          </div>
        </div>
      )
    }

    if (picker.mode === "info") {
      const c = picker.projekt ? colorFor(picker.projekt) : null
      return (
        <div onClick={() => setPicker(null)} style={overlay}>
          <div onClick={e => e.stopPropagation()} style={sheet}>
            <div style={{textAlign:"center",marginBottom:18}}>
              <div style={{fontSize:11,color:C.mu,letterSpacing:".5px"}}>BOKNING · VECKA {picker.bokning.vecka}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:6,background:c.bg,border:`1px solid ${c.border}`,padding:"6px 12px",borderRadius:8}}>
                <div style={{width:8,height:8,borderRadius:2,background:c.text}}/>
                <div style={{fontSize:15,fontWeight:600,color:c.text}}>{picker.projekt?.namn}</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
              <div style={card}>
                <div style={{fontSize:11,color:C.mu,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Anställd</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:C.ac}}>{initialer(picker.anstalld.name)}</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:500}}>{picker.anstalld.name}</div>
                    <div style={{fontSize:12,color:C.mu}}>{picker.anstalld.roll}</div>
                  </div>
                </div>
              </div>
              <div style={card}>
                <div style={{fontSize:11,color:C.mu,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Plats</div>
                <div style={{fontSize:14}}>📍 {picker.projekt.plats}</div>
                <div style={{fontSize:12,color:C.mu,marginTop:2}}>{picker.projekt.arbete}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={handleRemove} style={{...btnG,flex:1,borderColor:"rgba(198,40,40,.3)",color:C.da}}>Ta bort bokning</button>
              <button onClick={() => setPicker(null)} style={{...btnP,flex:1}}>OK</button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Planering</h1>
          <span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,color:C.ac,background:"rgba(232,184,75,.15)"}}>{bokningar.length} bokningar</span>
        </div>
        <div style={{fontSize:13,color:C.mu,marginBottom:14}}>{PLANERING_ANSTALLDA.length} anställda · {PROJEKT_LIST.length} projekt · V{WEEKS[0]}–V{WEEKS[WEEKS.length-1]}</div>
      </div>
      <div style={{padding:"0 20px 16px",display:"flex",gap:6}}>
        {[{id:"vecka",l:"Veckovy"},{id:"projekt",l:"Per projekt"},{id:"person",l:"Per person"}].map(v => (
          <button key={v.id} onClick={() => setView(v.id)} style={{flex:1,padding:"9px 4px",borderRadius:8,border:`1px solid ${view===v.id?C.ac:C.b}`,background:view===v.id?"rgba(21,101,192,.08)":C.bg2,color:view===v.id?C.ac:C.mu,fontWeight:view===v.id?500:400,cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>{v.l}</button>
        ))}
      </div>
      {view === "vecka"   && renderVeckoVy()}
      {view === "projekt" && renderProjektVy()}
      {view === "person"  && renderPersonVy()}
      {picker && renderPicker()}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// ── PROJEKTERING-modul (Företag) ──────────────────────────────────────
// 5 underkomponenter: Projektering (wrapper m. tabs) · ProjektLista ·
// SkapaProjekt · ProjektDetalj · ProjekteringPlaneringsvy.
// Helt separat från Planering-fliken — eget datalager.
// ═══════════════════════════════════════════════════════════════════════

const statusBadge = (status) => {
  const s = PROJEKT_STATUS_STYLE[status] || PROJEKT_STATUS_STYLE.Offert
  return <span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:s.bg,color:s.text,border:`1px solid ${s.border}`}}>{status}</span>
}

// ── Projektering (wrapper) ────────────────────────────────────────────
function Projektering({projekt, bokningar, tidsrapporter, projektAvvikelser, onAddBokning, onRemoveBokning, navigate}) {
  const [tab, setTab] = useState("lista") // lista | planeringsvy | arbetsledare

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Projektering</h1>
          <span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,color:C.ac,background:"rgba(232,184,75,.15)"}}>{projekt.length} projekt</span>
        </div>
        <div style={{fontSize:13,color:C.mu,marginBottom:14}}>Hantera projekt, bemanning och tidsrapporter</div>
      </div>
      <div style={{padding:"0 20px 16px",display:"flex",gap:6}}>
        {[{id:"lista",l:"Projektlista"},{id:"planeringsvy",l:"Planeringsvy"},{id:"arbetsledare",l:"Arbetsledare"}].map(v => (
          <button key={v.id} onClick={() => setTab(v.id)} style={{flex:1,padding:"9px 4px",borderRadius:8,border:`1px solid ${tab===v.id?C.ac:C.b}`,background:tab===v.id?"rgba(21,101,192,.08)":C.bg2,color:tab===v.id?C.ac:C.mu,fontWeight:tab===v.id?500:400,cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>{v.l}</button>
        ))}
      </div>
      {tab === "lista" && <ProjektLista projekt={projekt} bokningar={bokningar} tidsrapporter={tidsrapporter} navigate={navigate}/>}
      {tab === "planeringsvy" && <ProjekteringPlaneringsvy projekt={projekt} bokningar={bokningar} onAddBokning={onAddBokning} onRemoveBokning={onRemoveBokning}/>}
      {tab === "arbetsledare" && <ProjekteringArbetsledare projekt={projekt} bokningar={bokningar} onAddBokning={onAddBokning} onRemoveBokning={onRemoveBokning}/>}
    </div>
  )
}

// ── ProjektLista — sökbar och filterbar projektlista ──────────────────
function ProjektLista({projekt, bokningar, tidsrapporter, navigate}) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState(null) // null = alla

  const filtered = projekt.filter(p => {
    if (statusFilter && p.status !== statusFilter) return false
    if (!search.trim()) return true
    const s = search.toLowerCase()
    return p.namn.toLowerCase().includes(s) ||
           p.nummer.toLowerCase().includes(s) ||
           p.bestallare.toLowerCase().includes(s) ||
           p.plats.toLowerCase().includes(s)
  })

  const statusCounts = PROJEKT_STATUS_LIST.reduce((acc, s) => ({...acc, [s]: projekt.filter(p => p.status === s).length}), {})

  return (
    <div style={{padding:"0 20px"}}>
      <button onClick={() => navigate("skapa-projekt")} style={{...btnP,marginBottom:12}}>+ Skapa nytt projekt</button>

      <input style={{...inp,marginBottom:10}} placeholder="🔍 Sök projekt, beställare, plats..." value={search} onChange={e => setSearch(e.target.value)}/>

      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14,overflowX:"auto"}}>
        <button onClick={() => setStatusFilter(null)} style={{fontSize:12,padding:"5px 11px",borderRadius:14,border:`1px solid ${statusFilter===null?C.ac:C.b}`,background:statusFilter===null?"rgba(21,101,192,.1)":C.bg2,color:statusFilter===null?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Alla ({projekt.length})</button>
        {PROJEKT_STATUS_LIST.map(s => {
          const sel = statusFilter === s
          const style = PROJEKT_STATUS_STYLE[s]
          return (
            <button key={s} onClick={() => setStatusFilter(sel ? null : s)} style={{fontSize:12,padding:"5px 11px",borderRadius:14,border:`1px solid ${sel?style.text:C.b}`,background:sel?style.bg:C.bg2,color:sel?style.text:C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:sel?500:400,whiteSpace:"nowrap"}}>{s} ({statusCounts[s]})</button>
          )
        })}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtered.length === 0 ? (
          <div style={{...card,textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:32,marginBottom:10}}>🔍</div>
            <div style={{color:C.mu,fontSize:14}}>Inga projekt matchar din sökning</div>
          </div>
        ) : filtered.map(p => {
          const totalTimmar = tidsrapporter.filter(tr => tr.projektId === p.id).reduce((sum, tr) => sum + tr.timmar, 0)
          const personerCount = new Set(bokningar.filter(b => b.projektId === p.id).map(b => b.anstalldId)).size
          const procent = p.budget ? Math.min(100, Math.round(totalTimmar / p.budget * 100)) : 0
          const projColor = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
          return (
            <button key={p.id} onClick={() => navigate("projekt-detalj", p)} style={{...card,textAlign:"left",cursor:"pointer",width:"100%",transition:"border-color .15s"}}
              onMouseOver={e => e.currentTarget.style.borderColor = C.b2}
              onMouseOut={e => e.currentTarget.style.borderColor = C.b}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8,gap:8}}>
                <div style={{minWidth:0,flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                    <div style={{width:8,height:8,borderRadius:2,background:projColor.text,flexShrink:0}}/>
                    <span style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>{p.nummer}</span>
                  </div>
                  <div style={{fontWeight:600,fontSize:15,letterSpacing:"-.2px"}}>{p.namn}</div>
                </div>
                {statusBadge(p.status)}
              </div>
              <div style={{color:C.mu,fontSize:13,marginBottom:3}}>📍 {p.plats}</div>
              <div style={{color:C.mu,fontSize:12,marginBottom:10}}>{p.bestallare}</div>
              {p.budget > 0 && (
                <div style={{marginBottom:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.mu,marginBottom:4}}>
                    <span>{totalTimmar} / {p.budget} h</span>
                    <span>{procent}%</span>
                  </div>
                  <div style={{height:4,background:C.bg3,borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${procent}%`,background:procent>=90?C.da:procent>=70?"#b88a00":C.ok,transition:"width .3s"}}/>
                  </div>
                </div>
              )}
              <div style={{display:"flex",gap:10,fontSize:11,color:C.mu,marginTop:8}}>
                <span>👥 {personerCount} {personerCount === 1 ? "person" : "personer"}</span>
                {p.start && p.slut && <span>📅 {p.start} → {p.slut}</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── SkapaProjekt — 2-stegs wizard: 1) projektinfo  2) välj anställda ─
function SkapaProjekt({navigate, onSave, antalProjekt}) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    nummer: `PRJ-2026-${String(antalProjekt + 200).padStart(3,"0")}`,
    namn: "",
    bestallare: "",
    plats: "",
    omfattning: "",
    arbetstider: "",
    arbetsorder: "",
    arbetsledare: "",
    kontaktperson: "",
    uppgifter: "",
    extra: "",
    start: "",
    slut: "",
    budget: "",
    status: "Offert",
    farg: (antalProjekt) % PROJECT_PALETTE.length,
  })
  const [selectedAnstallda, setSelectedAnstallda] = useState([])
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setData(d => ({...d, [k]:v}))
  const valid = () => data.namn.trim() && data.bestallare.trim()

  function toggleAnstalld(id) {
    setSelectedAnstallda(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function nextStep() { if (valid()) setStep(2) }

  function save() {
    if (!valid()) return
    onSave({...data, budget: parseInt(data.budget) || 0}, selectedAnstallda)
    setSaved(true)
  }

  if (saved) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:500,padding:"0 24px",textAlign:"center"}}>
      <div style={{fontSize:52,marginBottom:20}}>📁</div>
      <h2 style={{fontSize:22,fontWeight:600,marginBottom:8}}>Projekt skapat!</h2>
      <p style={{color:C.mu,fontSize:15,marginBottom:4}}>{data.nummer} · {data.namn}</p>
      {selectedAnstallda.length > 0 && (
        <p style={{color:C.ok,fontSize:14,marginTop:8}}>📨 {selectedAnstallda.length} {selectedAnstallda.length === 1 ? "anställd har" : "anställda har"} notifierats</p>
      )}
      <button style={{...btnP,maxWidth:280,marginTop:32}} onClick={() => navigate("projektering")}>Tillbaka till projektlistan</button>
    </div>
  )

  const Section = ({title, children}) => (
    <div style={{marginBottom:8}}>
      <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:8,marginTop:8}}>{title}</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>{children}</div>
    </div>
  )

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => step === 1 ? navigate("projektering") : setStep(1)} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{fontWeight:600,fontSize:15}}>{step === 1 ? "Skapa nytt projekt" : "Välj anställda"}</div>
        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
          {[1,2].map(n => <div key={n} style={{width:24,height:3,borderRadius:2,background:n<=step?C.ac:C.b}}/>)}
        </div>
      </div>

      {step === 1 && (
        <div style={{padding:"16px 20px 24px"}}>
          <Section title="Grundinfo">
            <div><label style={lbl}>Projektnummer</label><input style={inp} value={data.nummer} onChange={e => set("nummer", e.target.value)}/></div>
            <div><label style={lbl}>Projektnamn *</label><input style={inp} value={data.namn} onChange={e => set("namn", e.target.value)} placeholder="t.ex. Spårjustering Falun"/></div>
            <div><label style={lbl}>Beställare *</label><input style={inp} value={data.bestallare} onChange={e => set("bestallare", e.target.value)} placeholder="t.ex. Trafikverket"/></div>
            <div>
              <label style={lbl}>Status</label>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {PROJEKT_STATUS_LIST.map(s => {
                  const sel = data.status === s
                  const style = PROJEKT_STATUS_STYLE[s]
                  return (
                    <button key={s} onClick={() => set("status", s)} style={{fontSize:12,padding:"7px 11px",borderRadius:8,border:`1px solid ${sel?style.text:C.b}`,background:sel?style.bg:C.bg2,color:sel?style.text:C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:sel?500:400}}>{s}</button>
                  )
                })}
              </div>
            </div>
          </Section>

          <Section title="Plats & tider">
            <div><label style={lbl}>Arbetsplats / plats</label><input style={inp} value={data.plats} onChange={e => set("plats", e.target.value)} placeholder="t.ex. Härnösand–Kramfors"/></div>
            <div><label style={lbl}>Arbetstider</label><input style={inp} value={data.arbetstider} onChange={e => set("arbetstider", e.target.value)} placeholder="t.ex. Mån–Fre 06:00–16:00"/></div>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1}}><label style={lbl}>Startdatum</label><input style={{...inp,colorScheme:"light"}} type="date" value={data.start} onChange={e => set("start", e.target.value)}/></div>
              <div style={{flex:1}}><label style={lbl}>Slutdatum</label><input style={{...inp,colorScheme:"light"}} type="date" value={data.slut} onChange={e => set("slut", e.target.value)}/></div>
            </div>
          </Section>

          <Section title="Arbete">
            <div><label style={lbl}>Huvudsakliga arbetsuppgifter</label><textarea style={{...inp,height:70,resize:"none"}} value={data.uppgifter} onChange={e => set("uppgifter", e.target.value)} placeholder="Beskriv kärnan i arbetet..."/></div>
            <div><label style={lbl}>Omfattning (material, verktyg)</label><textarea style={{...inp,height:70,resize:"none"}} value={data.omfattning} onChange={e => set("omfattning", e.target.value)} placeholder="t.ex. Räls 8 km, ballast 2400 ton, grävmaskin, termitsvets"/></div>
          </Section>

          <Section title="Personal & kontakt">
            <div><label style={lbl}>Arbetsledare</label><input style={inp} value={data.arbetsledare} onChange={e => set("arbetsledare", e.target.value)} placeholder="Namn på ansvarig arbetsledare"/></div>
            <div><label style={lbl}>Arbetsorder</label><input style={inp} value={data.arbetsorder} onChange={e => set("arbetsorder", e.target.value)} placeholder="t.ex. AO-2026-0118"/></div>
            <div><label style={lbl}>Kontaktperson (beställare)</label><input style={inp} value={data.kontaktperson} onChange={e => set("kontaktperson", e.target.value)} placeholder="Namn · telefon"/></div>
          </Section>

          <Section title="Övrigt">
            <div><label style={lbl}>Budget (timmar)</label><input style={inp} type="number" min="0" step="1" value={data.budget} onChange={e => set("budget", e.target.value)} placeholder="t.ex. 1200"/></div>
            <div><label style={lbl}>Extra info / anteckningar</label><textarea style={{...inp,height:80,resize:"none"}} value={data.extra} onChange={e => set("extra", e.target.value)} placeholder="Övriga noteringar..."/></div>
          </Section>

          <div style={{display:"flex",gap:10,marginTop:16}}>
            <button style={{...btnG,flex:1}} onClick={() => navigate("projektering")}>Avbryt</button>
            <button style={{...btnP,flex:1}} onClick={nextStep} disabled={!valid()}>Fortsätt → Välj anställda</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{padding:"16px 20px 24px"}}>
          <div style={{background:"rgba(21,101,192,.06)",border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.mu,lineHeight:1.5,marginBottom:14}}>
            Klicka för att välja anställda till <strong style={{color:C.tx}}>{data.namn}</strong>. Varje vald person får en notis med all projektinfo och måste markera den sedd.
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase"}}>Tillgängliga anställda ({PLANERING_ANSTALLDA.length})</div>
            <span style={{fontSize:12,color:C.ac,fontWeight:500}}>{selectedAnstallda.length} valda</span>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            {PLANERING_ANSTALLDA.map(a => {
              const sel = selectedAnstallda.includes(a.id)
              return (
                <button key={a.id} onClick={() => toggleAnstalld(a.id)}
                  style={{display:"flex",alignItems:"center",gap:12,background:sel?"rgba(21,101,192,.06)":C.bg2,border:`1px solid ${sel?C.ac:C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",width:"100%",fontFamily:"inherit"}}>
                  <div style={{width:22,height:22,borderRadius:5,border:`2px solid ${sel?C.ac:C.b2}`,background:sel?C.ac:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {sel && <span style={{fontSize:12,color:"#fff",fontWeight:700,lineHeight:1}}>✓</span>}
                  </div>
                  <div style={{width:38,height:38,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,color:C.ac,flexShrink:0}}>{a.name.split(" ").map(n => n[0]).join("")}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:500,color:C.tx}}>{a.name}</div>
                    <div style={{fontSize:12,color:C.mu}}>{a.roll}</div>
                  </div>
                </button>
              )
            })}
          </div>

          {selectedAnstallda.length > 0 && (
            <div style={{background:"rgba(46,125,50,.08)",border:"1px solid rgba(46,125,50,.25)",borderRadius:10,padding:"10px 14px",fontSize:13,color:C.ok,marginBottom:14,lineHeight:1.5}}>
              📨 {selectedAnstallda.length} {selectedAnstallda.length === 1 ? "anställd kommer få" : "anställda kommer få"} en notis med all projektinfo att kvittera.
            </div>
          )}

          <div style={{display:"flex",gap:10}}>
            <button style={{...btnG,flex:1}} onClick={() => setStep(1)}>Tillbaka</button>
            <button style={{...btnP,flex:1}} onClick={save}>Spara projekt {selectedAnstallda.length > 0 ? `(${selectedAnstallda.length} st)` : ""}</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── ProjektDetalj — fullständig vy av ett projekt ─────────────────────
function ProjektDetalj({projekt, bokningar, tidsrapporter, projektAvvikelser, projektNotiser, navigate}) {
  // Tickande klocka för "Pågår nu"-sektionen — körs bara om projektet har pågående pass
  const [pagNow, setPagNow] = useState(new Date())
  const harPagaende = projekt && tidsrapporter.some(tr => tr.projektId === projekt.id && tr.status === "pågående")
  useEffect(() => {
    if (!harPagaende) return
    const i = setInterval(() => setPagNow(new Date()), 1000)
    return () => clearInterval(i)
  }, [harPagaende])

  if (!projekt) return <div style={{padding:30,textAlign:"center"}}>Projekt hittades inte</div>

  const projColor = PROJECT_PALETTE[projekt.farg % PROJECT_PALETTE.length]
  const projBokningar = bokningar.filter(b => b.projektId === projekt.id)
  const projTidsrapporter = tidsrapporter.filter(tr => tr.projektId === projekt.id && tr.status !== "pågående").sort((a,b) => b.datum.localeCompare(a.datum))
  const projPagaende = tidsrapporter.filter(tr => tr.projektId === projekt.id && tr.status === "pågående")
  const projAvvikelser = projektAvvikelser.filter(av => av.projektId === projekt.id)
  const totalTimmar = projTidsrapporter.reduce((sum, tr) => sum + tr.timmar, 0)
  const procent = projekt.budget ? Math.min(100, Math.round(totalTimmar / projekt.budget * 100)) : 0

  // Gruppera bokningar per anställd
  const bokningarPerAnstalld = {}
  projBokningar.forEach(b => {
    if (!bokningarPerAnstalld[b.anstalldId]) bokningarPerAnstalld[b.anstalldId] = []
    bokningarPerAnstalld[b.anstalldId].push(b.vecka)
  })
  const anstalldaPaProjekt = Object.keys(bokningarPerAnstalld).map(id => ({
    a: PLANERING_ANSTALLDA.find(x => x.id === id),
    veckor: bokningarPerAnstalld[id].sort((a,b) => a - b),
  })).filter(x => x.a)

  const InfoRow = ({label, value}) => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,paddingBottom:8,marginBottom:8,borderBottom:`1px solid ${C.b}`}}>
      <span style={{fontSize:12,color:C.mu,flexShrink:0,minWidth:90}}>{label}</span>
      <span style={{fontSize:13,textAlign:"right",lineHeight:1.5}}>{value || <span style={{color:C.mu,fontStyle:"italic"}}>—</span>}</span>
    </div>
  )

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("projektering")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{minWidth:0,flex:1}}>
          <div style={{fontSize:11,color:C.mu}}>{projekt.nummer}</div>
          <div style={{fontWeight:600,fontSize:15,letterSpacing:"-.2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{projekt.namn}</div>
        </div>
      </div>

      <div style={{padding:"18px 20px",display:"flex",flexDirection:"column",gap:12}}>
        {/* Hero card */}
        <div style={{background:projColor.bg,border:`1px solid ${projColor.border}`,borderRadius:14,padding:"16px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:10,height:10,borderRadius:3,background:projColor.text}}/>
              <span style={{fontSize:11,color:projColor.text,fontWeight:600,letterSpacing:".5px"}}>{projekt.nummer}</span>
            </div>
            {statusBadge(projekt.status)}
          </div>
          <div style={{fontSize:17,fontWeight:600,color:projColor.text,marginBottom:4}}>{projekt.namn}</div>
          <div style={{fontSize:13,color:projColor.text,opacity:.85}}>📍 {projekt.plats}</div>
          <div style={{fontSize:13,color:projColor.text,opacity:.85,marginTop:2}}>👤 {projekt.bestallare}</div>
        </div>

        {/* Budget vs rapporterad */}
        {projekt.budget > 0 && (
          <div style={card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase"}}>Budget & rapporterat</div>
              <div style={{fontSize:18,fontWeight:600,color:procent>=90?C.da:procent>=70?"#b88a00":C.ok}}>{procent}%</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.tx,marginBottom:6}}>
              <span><strong>{totalTimmar}</strong> h rapporterat</span>
              <span style={{color:C.mu}}>av {projekt.budget} h budget</span>
            </div>
            <div style={{height:8,background:C.bg3,borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${procent}%`,background:procent>=90?C.da:procent>=70?"#b88a00":C.ok,transition:"width .3s"}}/>
            </div>
            {procent >= 90 && <div style={{fontSize:12,color:C.da,marginTop:8}}>⚠ Närmar sig budget — granska tidsrapporter</div>}
          </div>
        )}

        {/* Detaljer */}
        <div style={card}>
          <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:10}}>Projektdetaljer</div>
          <InfoRow label="Startdatum"    value={projekt.start}/>
          <InfoRow label="Slutdatum"     value={projekt.slut}/>
          <InfoRow label="Arbetstider"   value={projekt.arbetstider}/>
          <InfoRow label="Arbetsorder"   value={projekt.arbetsorder}/>
          <InfoRow label="Arbetsledare"  value={projekt.arbetsledare}/>
          <InfoRow label="Kontaktperson" value={projekt.kontaktperson}/>
        </div>

        {projekt.uppgifter && (
          <div style={card}>
            <div style={{fontSize:11,color:C.mu,marginBottom:6,textTransform:"uppercase",letterSpacing:".5px"}}>Arbetsuppgifter</div>
            <div style={{fontSize:14,lineHeight:1.6}}>{projekt.uppgifter}</div>
          </div>
        )}

        {projekt.omfattning && (
          <div style={card}>
            <div style={{fontSize:11,color:C.mu,marginBottom:6,textTransform:"uppercase",letterSpacing:".5px"}}>Omfattning</div>
            <div style={{fontSize:14,lineHeight:1.6}}>{projekt.omfattning}</div>
          </div>
        )}

        {projekt.extra && (
          <div style={card}>
            <div style={{fontSize:11,color:C.mu,marginBottom:6,textTransform:"uppercase",letterSpacing:".5px"}}>Extra info</div>
            <div style={{fontSize:14,lineHeight:1.6}}>{projekt.extra}</div>
          </div>
        )}

        {/* Bokade anställda */}
        <div style={card}>
          <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:12}}>Bokade anställda ({anstalldaPaProjekt.length})</div>
          {anstalldaPaProjekt.length === 0 ? (
            <div style={{fontSize:13,color:C.mu,fontStyle:"italic"}}>Ingen bemanning än — boka i Planeringsvyn</div>
          ) : (
            anstalldaPaProjekt.map(({a, veckor}, i) => (
              <div key={a.id} style={{display:"flex",alignItems:"center",gap:10,paddingBottom:i<anstalldaPaProjekt.length-1?10:0,marginBottom:i<anstalldaPaProjekt.length-1?10:0,borderBottom:i<anstalldaPaProjekt.length-1?`1px solid ${C.b}`:"none"}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:C.ac,flexShrink:0}}>{a.name.split(" ").map(n => n[0]).join("")}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:500}}>{a.name}</div>
                  <div style={{fontSize:12,color:C.mu}}>{a.roll}</div>
                </div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"flex-end",maxWidth:160}}>
                  {veckor.map(v => (
                    <span key={v} style={{fontSize:10,background:projColor.bg,color:projColor.text,border:`1px solid ${projColor.border}`,padding:"2px 6px",borderRadius:4,fontWeight:500}}>V{v}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notiser kvitterade — vem har sett att de lagts till */}
        {(() => {
          const notiser = (projektNotiser || []).filter(n => n.projektId === projekt.id)
          if (notiser.length === 0) return null
          const seenCount = notiser.filter(n => n.sedd).length
          return (
            <div style={card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase"}}>👁 Notiser kvitterade</div>
                <span style={{fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:20,color:seenCount===notiser.length?C.ok:C.ac,background:seenCount===notiser.length?"rgba(46,125,50,.12)":"rgba(232,184,75,.15)"}}>{seenCount}/{notiser.length} sett</span>
              </div>
              {notiser.map((n, i) => {
                const a = PLANERING_ANSTALLDA.find(x => x.id === n.anstalldId)
                if (!a) return null
                const last = i === notiser.length - 1
                return (
                  <div key={n.id} style={{display:"flex",alignItems:"center",gap:12,paddingBottom:last?0:10,marginBottom:last?0:10,borderBottom:last?"none":`1px solid ${C.b}`}}>
                    <span style={{fontSize:18,lineHeight:1,flexShrink:0}}>{n.sedd ? "✅" : "⏳"}</span>
                    <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:C.ac,flexShrink:0}}>{a.name.split(" ").map(x => x[0]).join("")}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:500}}>{a.name}</div>
                      <div style={{fontSize:12,color:n.sedd?C.ok:C.mu,marginTop:2}}>{n.sedd ? `Sedd ${n.kvitteradTid}` : "Ej sedd"}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })()}

        {/* Pågår nu — live-vy över aktiva pass på projektet */}
        {projPagaende.length > 0 && (
          <div style={{...card,borderColor:"rgba(46,125,50,.35)",background:"rgba(46,125,50,.04)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:C.ok,boxShadow:`0 0 0 4px rgba(46,125,50,.18)`}}/>
                <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase"}}>Pågår nu ({projPagaende.length})</div>
              </div>
              <span style={{fontSize:10,color:C.ok,fontWeight:500,letterSpacing:".3px"}}>LIVE</span>
            </div>
            {projPagaende.map((tr, i) => {
              const last = i === projPagaende.length - 1
              const sek = elapsedSeconds(tr.startTid, pagNow)
              return (
                <div key={tr.id} style={{display:"flex",alignItems:"center",gap:10,paddingBottom:last?0:10,marginBottom:last?0:10,borderBottom:last?"none":`1px solid ${C.b}`}}>
                  <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(46,125,50,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:C.ok,flexShrink:0}}>{tr.anstalldNamn.split(" ").map(x => x[0]).join("")}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:500}}>{tr.anstalldNamn}</div>
                    <div style={{fontSize:11,color:C.mu,marginTop:2}}>
                      Sedan {tr.startTid}
                      {tr.startGps && <span> · 📍 {tr.startGps.lat.toFixed(4)}, {tr.startGps.lng.toFixed(4)}</span>}
                    </div>
                  </div>
                  <div style={{fontSize:15,fontWeight:600,color:C.ok,fontVariantNumeric:"tabular-nums",flexShrink:0}}>{formatSeconds(sek)}</div>
                </div>
              )
            })}
          </div>
        )}

        {/* Tidsrapporter */}
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase"}}>Tidsrapporter ({projTidsrapporter.length})</div>
            <span style={{fontSize:12,color:C.tx,fontWeight:500}}>{totalTimmar} h totalt</span>
          </div>
          {projTidsrapporter.length === 0 ? (
            <div style={{fontSize:13,color:C.mu,fontStyle:"italic"}}>Inga tidsrapporter än</div>
          ) : (
            projTidsrapporter.map((tr, i) => {
              const typColor = tr.typ === "Övertid" ? C.da : tr.typ === "Restid" ? "#b88a00" : C.mu
              return (
                <div key={tr.id} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,paddingBottom:i<projTidsrapporter.length-1?10:0,marginBottom:i<projTidsrapporter.length-1?10:0,borderBottom:i<projTidsrapporter.length-1?`1px solid ${C.b}`:"none"}}>
                  <div style={{minWidth:0,flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                      <span style={{fontSize:13,fontWeight:500}}>{tr.anstalldNamn}</span>
                      <span style={{fontSize:10,padding:"1px 6px",borderRadius:10,background:typColor===C.mu?C.bg3:typColor==="#b88a00"?"rgba(232,184,75,.15)":"rgba(224,82,82,.12)",color:typColor,fontWeight:500}}>{tr.typ}</span>
                    </div>
                    <div style={{fontSize:11,color:C.mu}}>{tr.datum}{tr.kommentar?` · ${tr.kommentar}`:""}</div>
                  </div>
                  <div style={{fontSize:14,fontWeight:600,flexShrink:0}}>{tr.timmar}h</div>
                </div>
              )
            })
          )}
        </div>

        {/* Avvikelser */}
        <div style={card}>
          <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:12}}>Avvikelser ({projAvvikelser.length})</div>
          {projAvvikelser.length === 0 ? (
            <div style={{fontSize:13,color:C.mu,fontStyle:"italic"}}>Inga avvikelser kopplade till projektet</div>
          ) : (
            projAvvikelser.map((av, i) => (
              <div key={av.id} style={{display:"flex",gap:10,paddingBottom:i<projAvvikelser.length-1?10:0,marginBottom:i<projAvvikelser.length-1?10:0,borderBottom:i<projAvvikelser.length-1?`1px solid ${C.b}`:"none",opacity:av.status==="closed"?.6:1}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:av.status==="open"?C.da:C.ok,flexShrink:0,marginTop:5}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,lineHeight:1.5}}>{av.text}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:3}}>{av.av} · {av.datum} {av.status==="closed"?"· ✓ stängd":""}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ── ProjekteringPlaneringsvy — vecko-kalender alla anställda × veckor ──
function ProjekteringPlaneringsvy({projekt, bokningar, onAddBokning, onRemoveBokning}) {
  const [picker, setPicker] = useState(null) // {mode:"projekt"|"info", ...}
  const findProjekt  = id => projekt.find(p => p.id === id)
  const findAnstalld = id => PLANERING_ANSTALLDA.find(a => a.id === id)
  const colorFor     = p  => PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
  const initialer    = n  => n.split(" ").map(x => x[0]).join("")

  function openPickProjekt(anstalldId, vecka) { setPicker({mode:"projekt", anstalldId, vecka}) }
  function openBokningInfo(b, a, p)           { setPicker({mode:"info", bokning:b, anstalld:a, projekt:p}) }
  function handleProjektSelect(projektId)     { onAddBokning({anstalldId:picker.anstalldId, projektId, vecka:picker.vecka}); setPicker(null) }
  function handleRemove()                     { onRemoveBokning(picker.bokning.id); setPicker(null) }

  return (
    <div>
      <div style={{padding:"0 20px 10px"}}>
        <div style={{background:"rgba(21,101,192,.06)",border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.mu,lineHeight:1.5}}>
          Klicka på en tom cell för att boka, en bokad cell för info/ta bort. Färgkodat per projekt.
        </div>
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:14}}>
        {PLANERING_ANSTALLDA.map(a => {
          const personBokningar = bokningar.filter(b => b.anstalldId === a.id)
          return (
            <div key={a.id} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:14,padding:"14px 0"}}>
              <div style={{padding:"0 16px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:C.ac,flexShrink:0}}>{initialer(a.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:600}}>{a.name}</div>
                  <div style={{fontSize:12,color:C.mu}}>{a.roll}</div>
                </div>
                <span style={{fontSize:11,color:C.mu,flexShrink:0}}>{personBokningar.length} v</span>
              </div>
              <div style={{overflowX:"auto",padding:"0 16px"}}>
                <div style={{display:"flex",gap:4,minWidth:"max-content",paddingBottom:4}}>
                  {WEEKS.map(w => {
                    const b = personBokningar.find(b => b.vecka === w)
                    const p = b ? findProjekt(b.projektId) : null
                    const c = p ? colorFor(p) : null
                    return (
                      <button key={w} onClick={() => b && p ? openBokningInfo(b,a,p) : openPickProjekt(a.id, w)} style={{minWidth:74,flexShrink:0,background:p?c.bg:C.bg3,border:`1px solid ${p?c.border:C.b}`,borderRadius:8,padding:"6px 4px",cursor:"pointer",textAlign:"center",fontFamily:"inherit",minHeight:60,display:"flex",flexDirection:"column",justifyContent:"center",gap:3}}>
                        <div style={{fontSize:10,color:C.mu,fontWeight:500}}>V{w}</div>
                        {p ? (
                          <div style={{fontSize:11,color:c.text,fontWeight:500,lineHeight:1.2,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",padding:"0 2px"}}>{p.namn}</div>
                        ) : (
                          <div style={{fontSize:16,color:C.mu,lineHeight:1}}>+</div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {picker && (() => {
        const overlay = {position:"fixed",inset:0,background:"rgba(13,31,53,.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100,padding:0}
        const sheet = {background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"20px 20px 28px",maxWidth:430,width:"100%",maxHeight:"82vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}
        if (picker.mode === "projekt") {
          const a = findAnstalld(picker.anstalldId)
          return (
            <div onClick={() => setPicker(null)} style={overlay}>
              <div onClick={e => e.stopPropagation()} style={sheet}>
                <div style={{textAlign:"center",marginBottom:14}}>
                  <div style={{fontSize:11,color:C.mu,letterSpacing:".5px"}}>BOKA · VECKA {picker.vecka}</div>
                  <div style={{fontSize:18,fontWeight:600,marginTop:4}}>{a?.name}</div>
                  <div style={{fontSize:13,color:C.mu}}>Välj projekt</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                  {projekt.map(p => {
                    const c = colorFor(p)
                    return (
                      <button key={p.id} onClick={() => handleProjektSelect(p.id)} style={{display:"flex",alignItems:"center",gap:12,background:c.bg,border:`1px solid ${c.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                        <div style={{width:6,height:36,borderRadius:3,background:c.text,flexShrink:0}}/>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:14,fontWeight:600,color:c.text}}>{p.namn}</div>
                          <div style={{fontSize:12,color:C.mu,marginTop:1}}>📍 {p.plats}</div>
                        </div>
                        {statusBadge(p.status)}
                      </button>
                    )
                  })}
                </div>
                <button onClick={() => setPicker(null)} style={btnG}>Avbryt</button>
              </div>
            </div>
          )
        }
        if (picker.mode === "info") {
          const c = picker.projekt ? colorFor(picker.projekt) : null
          return (
            <div onClick={() => setPicker(null)} style={overlay}>
              <div onClick={e => e.stopPropagation()} style={sheet}>
                <div style={{textAlign:"center",marginBottom:18}}>
                  <div style={{fontSize:11,color:C.mu,letterSpacing:".5px"}}>BOKNING · VECKA {picker.bokning.vecka}</div>
                  <div style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:6,background:c.bg,border:`1px solid ${c.border}`,padding:"6px 12px",borderRadius:8}}>
                    <div style={{width:8,height:8,borderRadius:2,background:c.text}}/>
                    <div style={{fontSize:15,fontWeight:600,color:c.text}}>{picker.projekt?.namn}</div>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
                  <div style={card}>
                    <div style={{fontSize:11,color:C.mu,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Anställd</div>
                    <div style={{fontSize:14,fontWeight:500}}>{picker.anstalld.name}</div>
                    <div style={{fontSize:12,color:C.mu}}>{picker.anstalld.roll}</div>
                  </div>
                  <div style={card}>
                    <div style={{fontSize:11,color:C.mu,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Plats</div>
                    <div style={{fontSize:14}}>📍 {picker.projekt.plats}</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={handleRemove} style={{...btnG,flex:1,borderColor:"rgba(198,40,40,.3)",color:C.da}}>Ta bort bokning</button>
                  <button onClick={() => setPicker(null)} style={{...btnP,flex:1}}>OK</button>
                </div>
              </div>
            </div>
          )
        }
      })()}
    </div>
  )
}

// ── RapporteraTid — stämpla in/ut, EN knapp. GPS automatiskt. ──────────
function RapporteraTid({user, projekt, tidsrapporter, navigate, onStart, onStop, onEdit, senasteProjektId, onSenasteProjekt}) {
  // Aktiva projekt (max 5) — det enda användaren behöver välja mellan
  const aktivaProjekt = projekt.filter(p => p.status === "Pågående" || p.status === "Planering").slice(0, 5)

  // Användarens pågående pass (om finns)
  const aktivPass = tidsrapporter.find(tr => tr.anstalldNamn === user.name && tr.status === "pågående")
  const aktivProjekt = aktivPass ? projekt.find(p => p.id === aktivPass.projektId) : null

  // Förvalt projekt: senaste använda > första aktiva
  const initialPid = senasteProjektId && aktivaProjekt.some(p => p.id === senasteProjektId)
    ? senasteProjektId : (aktivaProjekt[0]?.id || null)
  const [valdProjektId, setValdProjektId] = useState(initialPid)
  const [showPicker, setShowPicker] = useState(false)
  const [now, setNow] = useState(new Date())
  const [online, setOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine)
  const [startar, setStartar] = useState(false)
  const [stoppar, setStoppar] = useState(false)
  const [editingPass, setEditingPass] = useState(null)

  // Tickar varje sekund när det finns pågående pass
  useEffect(() => {
    if (!aktivPass) return
    const i = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(i)
  }, [aktivPass])

  // Offline-detektering
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false)
    if (typeof window !== "undefined") {
      window.addEventListener("online", on)
      window.addEventListener("offline", off)
      return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off) }
    }
  }, [])

  const idag = "2026-05-25"
  const mittIdag = tidsrapporter.filter(tr => tr.anstalldNamn === user.name && tr.datum === idag)
  const idagMin = mittIdag.reduce((s, tr) => s + (tr.timmar || 0) * 60, 0) + (aktivPass ? elapsedSeconds(aktivPass.startTid, now) / 60 : 0)
  const veckaMin = tidsrapporter.filter(tr => tr.anstalldNamn === user.name).reduce((s, tr) => s + (tr.timmar || 0) * 60, 0) + (aktivPass ? elapsedSeconds(aktivPass.startTid, now) / 60 : 0)

  async function handleStart() {
    if (!valdProjektId || startar) return
    setStartar(true)
    const gps = await hamtaGPS()
    onStart({projektId: valdProjektId, anstalldNamn: user.name, gps})
    onSenasteProjekt(valdProjektId)
    setStartar(false)
  }
  async function handleStop() {
    if (!aktivPass || stoppar) return
    setStoppar(true)
    const gps = await hamtaGPS()
    onStop({passId: aktivPass.id, gps})
    setStoppar(false)
  }

  // Dagens nya-format-pass (för redigering)
  const dagensPass = tidsrapporter
    .filter(tr => tr.anstalldNamn === user.name && tr.datum === idag && tr.startTid && tr.status !== "pågående")
    .sort((a, b) => (b.startTid || "").localeCompare(a.startTid || ""))

  const valdProjekt = projekt.find(p => p.id === valdProjektId)
  const valdFarg = valdProjekt ? PROJECT_PALETTE[valdProjekt.farg % PROJECT_PALETTE.length] : null
  const aktivFarg = aktivProjekt ? PROJECT_PALETTE[aktivProjekt.farg % PROJECT_PALETTE.length] : null

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("dagorder")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{fontWeight:600,fontSize:15}}>Rapportera tid</div>
        {!online && (
          <span style={{marginLeft:"auto",fontSize:11,padding:"4px 9px",borderRadius:12,background:"rgba(232,184,75,.18)",color:"#b88a00",fontWeight:500}}>📵 Offline · synkar senare</span>
        )}
      </div>

      <div style={{padding:"24px 20px"}}>
        {aktivPass && aktivProjekt ? (
          // ─── PÅGÅENDE PASS — live-klocka + STOPP-knapp ───
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".8px",fontWeight:500}}>PÅGÅR</div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:8,background:aktivFarg.bg,border:`1px solid ${aktivFarg.border}`,padding:"6px 14px",borderRadius:10}}>
              <div style={{width:8,height:8,borderRadius:2,background:aktivFarg.text}}/>
              <div style={{fontSize:15,fontWeight:600,color:aktivFarg.text}}>{aktivProjekt.namn}</div>
            </div>
            <div style={{fontSize:12,color:C.mu,marginTop:6}}>📍 {aktivProjekt.plats}</div>

            <div style={{margin:"36px 0 8px",fontSize:64,fontWeight:700,letterSpacing:"-1.5px",fontVariantNumeric:"tabular-nums",color:C.tx,lineHeight:1}}>
              {formatSeconds(elapsedSeconds(aktivPass.startTid, now))}
            </div>
            <div style={{fontSize:13,color:C.mu,marginBottom:28}}>
              Startade kl {aktivPass.startTid}
              {aktivPass.startGps && <span> · 📍 GPS-stämplad</span>}
            </div>

            <button onClick={handleStop} disabled={stoppar} style={{
              width:"100%",background:stoppar?"#9a1f1f":"#c62828",color:"#fff",border:"none",borderRadius:18,
              padding:"34px 20px",fontSize:22,fontWeight:700,letterSpacing:"1px",cursor:stoppar?"wait":"pointer",
              fontFamily:"inherit",boxShadow:"0 10px 28px rgba(198,40,40,.32)",transition:"transform .1s",
            }}>{stoppar ? "📡 STÄMPLAR UT..." : "■ STOPPA"}</button>
          </div>
        ) : (
          // ─── INGET PÅGÅENDE PASS — projektväljare + START-knapp ───
          <div>
            <button onClick={() => setShowPicker(true)} style={{
              width:"100%",background:valdProjekt?valdFarg.bg:C.bg2,border:`1px solid ${valdProjekt?valdFarg.border:C.b}`,
              borderRadius:14,padding:"16px 18px",textAlign:"left",cursor:"pointer",marginBottom:20,fontFamily:"inherit"
            }}>
              <div style={{fontSize:11,color:C.mu,letterSpacing:".5px",textTransform:"uppercase",marginBottom:4,fontWeight:500}}>Projekt</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                <div style={{minWidth:0,flex:1}}>
                  <div style={{fontSize:17,fontWeight:600,color:valdProjekt?valdFarg.text:C.mu,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {valdProjekt ? valdProjekt.namn : "Välj projekt"}
                  </div>
                  {valdProjekt && <div style={{fontSize:12,color:C.mu,marginTop:2}}>📍 {valdProjekt.plats}</div>}
                </div>
                <div style={{fontSize:20,color:C.mu,flexShrink:0}}>▾</div>
              </div>
            </button>

            <button onClick={handleStart} disabled={!valdProjektId || startar} style={{
              width:"100%",
              background: !valdProjektId ? "#a8c5a8" : startar ? "#1a5e1a" : "#15803d",
              color:"#fff",border:"none",borderRadius:18,padding:"34px 20px",fontSize:22,fontWeight:700,letterSpacing:"1px",
              cursor:(valdProjektId && !startar)?"pointer":"not-allowed",fontFamily:"inherit",
              boxShadow: valdProjektId ? "0 10px 28px rgba(21,128,61,.28)" : "none",
              opacity: valdProjektId ? 1 : .65, transition:"all .15s",
            }}>{startar ? "📡 HÄMTAR POSITION..." : "▶ STARTA ARBETE"}</button>
          </div>
        )}

        {/* Idag + Veckan */}
        <div style={{display:"flex",gap:10,marginTop:28}}>
          <div style={{flex:1,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".6px",fontWeight:500}}>IDAG</div>
            <div style={{fontSize:22,fontWeight:600,marginTop:4,fontVariantNumeric:"tabular-nums"}}>{formatHM(idagMin)}</div>
          </div>
          <div style={{flex:1,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".6px",fontWeight:500}}>VECKAN</div>
            <div style={{fontSize:22,fontWeight:600,marginTop:4,fontVariantNumeric:"tabular-nums"}}>{formatHM(veckaMin)}</div>
          </div>
        </div>

        {/* Dagens pass — klickbara för redigering */}
        {dagensPass.length > 0 && (
          <div style={{marginTop:28}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,marginBottom:10,textTransform:"uppercase"}}>Dagens pass · klicka för att ändra</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {dagensPass.map(pass => {
                const p = projekt.find(x => x.id === pass.projektId)
                const c = p ? PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length] : null
                return (
                  <button key={pass.id} onClick={() => setEditingPass({...pass, anledning: pass.redigeradAnledning || ""})} style={{
                    display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,
                    borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"
                  }}>
                    {c && <div style={{width:4,height:32,borderRadius:2,background:c.text,flexShrink:0}}/>}
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p?.namn || "—"}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>
                        {pass.startTid}–{pass.stoppTid}
                        {pass.status === "redigerad" && <span style={{marginLeft:8,padding:"1px 6px",borderRadius:8,background:"rgba(232,184,75,.15)",color:"#b88a00",fontWeight:500,fontSize:10}}>REDIGERAD</span>}
                      </div>
                    </div>
                    <div style={{fontSize:14,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{pass.timmar.toFixed(2).replace(".",",")}h</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Projektväljare som bottom sheet */}
      {showPicker && (
        <div onClick={() => setShowPicker(false)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
          <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"20px 20px 28px",maxWidth:430,width:"100%",maxHeight:"82vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".5px",textAlign:"center",marginBottom:14,fontWeight:500}}>VÄLJ PROJEKT</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
              {aktivaProjekt.map(p => {
                const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
                const sel = p.id === valdProjektId
                return (
                  <button key={p.id} onClick={() => { setValdProjektId(p.id); setShowPicker(false) }} style={{
                    display:"flex",alignItems:"center",gap:12,background:sel?c.bg:C.bg2,
                    border:`1px solid ${sel?c.text:c.border}`,borderRadius:10,padding:"14px 14px",
                    cursor:"pointer",textAlign:"left",fontFamily:"inherit"
                  }}>
                    <div style={{width:6,height:36,borderRadius:3,background:c.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:15,fontWeight:600,color:c.text}}>{p.namn}</div>
                      <div style={{fontSize:12,color:C.mu,marginTop:1}}>📍 {p.plats}</div>
                    </div>
                    {sel && <div style={{fontSize:18,color:c.text,fontWeight:700}}>✓</div>}
                  </button>
                )
              })}
            </div>
            <button onClick={() => setShowPicker(false)} style={btnG}>Avbryt</button>
          </div>
        </div>
      )}

      {/* Redigera pass */}
      {editingPass && (
        <div onClick={() => setEditingPass(null)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
          <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"20px 20px 28px",maxWidth:430,width:"100%",maxHeight:"82vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".5px",textAlign:"center",marginBottom:14,fontWeight:500}}>REDIGERA PASS</div>

            <div style={{display:"flex",gap:10,marginBottom:14}}>
              <div style={{flex:1}}>
                <label style={lbl}>Start</label>
                <input style={{...inp,colorScheme:"light"}} type="time" value={editingPass.startTid || ""} onChange={e => setEditingPass(p => ({...p, startTid: e.target.value}))}/>
              </div>
              <div style={{flex:1}}>
                <label style={lbl}>Slut</label>
                <input style={{...inp,colorScheme:"light"}} type="time" value={editingPass.stoppTid || ""} onChange={e => setEditingPass(p => ({...p, stoppTid: e.target.value}))}/>
              </div>
            </div>

            <label style={lbl}>Förklaring · varför stämplade du inte rätt?</label>
            <textarea style={{...inp,height:80,resize:"none",marginBottom:14}} placeholder="t.ex. glömde stämpla ut igår, hade ingen mottagning..." value={editingPass.anledning} onChange={e => setEditingPass(p => ({...p, anledning: e.target.value}))}/>

            <div style={{display:"flex",gap:10}}>
              <button onClick={() => setEditingPass(null)} style={{...btnG,flex:1}}>Avbryt</button>
              <button onClick={() => {
                if (!editingPass.startTid || !editingPass.stoppTid || !editingPass.anledning.trim()) return
                onEdit({passId: editingPass.id, startTid: editingPass.startTid, stoppTid: editingPass.stoppTid, anledning: editingPass.anledning})
                setEditingPass(null)
              }} disabled={!editingPass.startTid || !editingPass.stoppTid || !editingPass.anledning.trim()} style={{...btnP,flex:1}}>Spara</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Mina arbeten (arbetare / arbetsledare) — grupperat per status ──
function MinaArbeten() {
  const groups = [
    {key:"pagaende", l:"PÅGÅENDE"},
    {key:"kommande", l:"KOMMANDE"},
    {key:"klar",     l:"AVSLUTADE"},
  ]
  const Item = ({j}) => (
    <div style={card}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div style={{fontWeight:600,fontSize:15,flex:1,paddingRight:10}}>{j.uppg}</div>
        <Badge status={j.status}/>
      </div>
      <div style={{color:C.mu,fontSize:13,marginBottom:5}}>📍 {j.plats}</div>
      <div style={{color:C.mu,fontSize:13,marginBottom:10}}>🕐 {j.tid}</div>
      <div style={{fontSize:12,color:C.mu,background:"rgba(255,255,255,.04)",padding:"8px 10px",borderRadius:6}}><span style={{color:C.tx}}>Material: </span>{j.mat}</div>
    </div>
  )
  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px",marginBottom:18}}>Mina arbeten</h1>
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:6}}>
        {groups.map(g => {
          const items = ARBETEN.filter(j => j.status === g.key)
          if (items.length === 0) return null
          return (
            <div key={g.key}>
              <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,margin:"12px 0 8px"}}>{g.l} ({items.length})</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {items.map(j => <Item key={j.id} j={j}/>)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Dagorder ─────────────────────────────────────────────────
function Dagorder({dagorder, andringar, onMarkSeen, navigate, user, projekt, projektNotiser, onMarkProjektNotisSeen}) {
  const d = dagorder
  const unseen = andringar.filter(a => !a.sedd)
  const seenAndringar = andringar.filter(a => a.sedd)

  // Projekt-notiser för inloggad användare — matchas på namn till PLANERING_ANSTALLDA
  const currentAnstalld = user ? PLANERING_ANSTALLDA.find(a => a.name === user.name) : null
  const minaOlasta = (currentAnstalld && projektNotiser && projekt)
    ? projektNotiser
        .filter(n => n.anstalldId === currentAnstalld.id && !n.sedd)
        .map(n => ({notis: n, p: projekt.find(x => x.id === n.projektId)}))
        .filter(x => x.p)
    : []
  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Dagorder</h1>
          <span style={{fontSize:12,color:C.mu}}>{d.datum}</span>
        </div>
        <div style={{fontSize:13,color:C.mu,marginBottom:16}}>{d.proj}</div>
      </div>
      {minaOlasta.length > 0 && (
        <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
          {minaOlasta.map(({notis, p}) => (
            <div key={notis.id} style={{background:"rgba(91,156,246,.08)",border:"1px solid rgba(91,156,246,.35)",borderRadius:12,padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{fontSize:11,color:"#3470cf",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px"}}>📁 Tillagd på projekt</div>
                <span style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:20,background:PROJEKT_STATUS_STYLE[p.status]?.bg,color:PROJEKT_STATUS_STYLE[p.status]?.text,border:`1px solid ${PROJEKT_STATUS_STYLE[p.status]?.border}`}}>{p.status}</span>
              </div>
              <div style={{fontSize:15,fontWeight:600,marginBottom:6}}>{p.namn}</div>
              <div style={{fontSize:13,color:C.tx,marginBottom:12,lineHeight:1.5}}>
                Du har blivit tillagd på projekt <strong>{p.namn}</strong>. Läs all info och markera sedd.
              </div>
              <div style={{background:"rgba(255,255,255,.6)",border:`1px solid ${C.b}`,borderRadius:8,padding:"10px 12px",marginBottom:12}}>
                {[
                  ["Plats",          p.plats],
                  ["Arbetstider",    p.arbetstider],
                  ["Arbetsledare",   p.arbetsledare],
                  ["Kontaktperson",  p.kontaktperson],
                  ["Arbetsuppgifter",p.uppgifter],
                ].map(([label, value], i, arr) => value ? (
                  <div key={label} style={{fontSize:12,marginBottom:i<arr.length-1?6:0,lineHeight:1.5}}>
                    <span style={{color:C.mu,fontWeight:500}}>{label}: </span>
                    <span style={{color:C.tx}}>{value}</span>
                  </div>
                ) : null)}
              </div>
              <button onClick={() => onMarkProjektNotisSeen(notis.id)} style={{...btnP,fontSize:14,padding:"12px"}}>Markera sedd</button>
            </div>
          ))}
        </div>
      )}
      {unseen.length > 0 && (
        <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
          {unseen.map(a => (
            <div key={a.id} style={{background:"rgba(232,184,75,.1)",border:"1px solid rgba(232,184,75,.3)",borderRadius:12,padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <div style={{fontSize:11,color:C.ac,fontWeight:600,textTransform:"uppercase",letterSpacing:".5px"}}>⚠ Ny ändring</div>
                <div style={{fontSize:11,color:C.mu}}>{a.datum}</div>
              </div>
              <div style={{fontSize:14,lineHeight:1.5}}>{a.text}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                <span style={{fontSize:11,color:C.mu}}>Publicerad av {a.av}</span>
                <button onClick={() => onMarkSeen(a.id)} style={{fontSize:12,color:C.ac,background:"none",border:"none",cursor:"pointer",padding:0,fontWeight:500}}>Markera som sedd ✓</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>
        {[["Plats",d.plats],["Uppgift",d.uppg],["Arbetstid",d.tid],["Material",d.mat]].map(([l,v]) => (
          <div key={l} style={card}><div style={{fontSize:11,color:C.mu,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>{l}</div><div style={{fontSize:14,lineHeight:1.6}}>{v}</div></div>
        ))}
        <div style={card}>
          <div style={{fontSize:11,color:C.mu,marginBottom:10,textTransform:"uppercase",letterSpacing:".5px"}}>Karta</div>
          <div style={{background:C.bg3,borderRadius:8,height:100,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
            <div style={{textAlign:"center",color:C.mu,fontSize:13}}>📍 {d.coords}</div>
          </div>
          <a href={`https://www.google.com/maps?q=${d.coords}`} target="_blank" rel="noreferrer" style={{...btnP,textDecoration:"none",display:"flex"}}>📍 Öppna i Google Maps</a>
        </div>
        <button onClick={() => navigate && navigate("rapportera-tid")} style={{...btnP,background:C.ok}}>⏱ Rapportera tid</button>
        {seenAndringar.length > 0 && (
          <div style={card}>
            <div style={{fontSize:11,color:C.mu,marginBottom:10,textTransform:"uppercase",letterSpacing:".5px"}}>Tidigare ändringar</div>
            {seenAndringar.map(a => (
              <div key={a.id} style={{paddingBottom:10,marginBottom:10,borderBottom:`1px solid ${C.b}`,opacity:.7}}>
                <div style={{fontSize:13,lineHeight:1.5}}>{a.text}</div>
                <div style={{fontSize:11,color:C.mu,marginTop:4}}>{a.av} · {a.datum} · ✓ sedd</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Skapa / redigera dagorder (arbetsledare) ─────────────────
function SkapaDagorder({dagorder, navigate, onSave}) {
  const [data, setData] = useState(dagorder)
  const [saved, setSaved] = useState(false)

  function set(k, v) { setData(d => ({...d, [k]:v})) }
  function save() { onSave(data); setSaved(true) }

  if (saved) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:500,padding:"0 24px",textAlign:"center"}}>
      <div style={{fontSize:52,marginBottom:20}}>📋</div>
      <h2 style={{fontSize:22,fontWeight:600,marginBottom:8}}>Dagorder sparad!</h2>
      <p style={{color:C.mu,fontSize:15}}>Hela teamet ser den uppdaterade dagordern.</p>
      <div style={{display:"flex",gap:10,maxWidth:320,width:"100%",marginTop:32}}>
        <button style={{...btnG,flex:1}} onClick={() => navigate("projektkoll")}>Projektkoll</button>
        <button style={{...btnP,flex:1}} onClick={() => navigate("dagorder")}>Visa dagorder</button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("projektkoll")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{fontWeight:600,fontSize:15}}>Skapa / redigera dagorder</div>
      </div>
      <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:"rgba(21,101,192,.06)",border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.mu,lineHeight:1.5}}>
          Förifyllt med dagens dagorder. Justera fälten och spara — uppdateringen syns direkt hos arbetarna.
        </div>
        <div><label style={lbl}>Projekt</label><input style={inp} value={data.proj} onChange={e=>set("proj",e.target.value)}/></div>
        <div><label style={lbl}>Plats</label><input style={inp} value={data.plats} onChange={e=>set("plats",e.target.value)}/></div>
        <div><label style={lbl}>Uppgift</label><textarea style={{...inp,height:70,resize:"none"}} value={data.uppg} onChange={e=>set("uppg",e.target.value)}/></div>
        <div><label style={lbl}>Arbetstid</label><input style={inp} value={data.tid} onChange={e=>set("tid",e.target.value)}/></div>
        <div><label style={lbl}>Material</label><textarea style={{...inp,height:60,resize:"none"}} value={data.mat} onChange={e=>set("mat",e.target.value)}/></div>
        <div><label style={lbl}>Koordinater (för karta)</label><input style={inp} value={data.coords} onChange={e=>set("coords",e.target.value)} placeholder="t.ex. 62.6324,17.9395"/></div>
        <div><label style={lbl}>Datum</label><input style={{...inp,colorScheme:"light"}} type="date" value={data.datum} onChange={e=>set("datum",e.target.value)}/></div>
        <div style={{display:"flex",gap:10,marginTop:8}}>
          <button style={{...btnG,flex:1}} onClick={() => navigate("projektkoll")}>Avbryt</button>
          <button style={{...btnP,flex:1}} onClick={save}>Spara dagorder</button>
        </div>
      </div>
    </div>
  )
}

// ── Avvikelser ────────────────────────────────────────────────
function Avvikelser({role, user, avvikelser, onAdd, onStang}) {
  const [text, setText] = useState("")
  const [photo, setPhoto] = useState(null)
  const [km, setKm] = useState("")
  const [gps, setGps] = useState(null)
  const [gpsLoading, setGpsLoading] = useState(false)
  const [gpsError, setGpsError] = useState(null)

  const open = avvikelser.filter(a=>a.status==="open")
  const closed = avvikelser.filter(a=>a.status==="closed")
  const canClose = role === "arbetsledare" || role === "foretag"

  function handlePhoto(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = ev => setPhoto(ev.target.result)
    r.readAsDataURL(f)
  }

  function fetchGPS() {
    if (!navigator.geolocation) { setGpsError("GPS stöds inte i denna webbläsare"); return }
    setGpsLoading(true); setGpsError(null)
    navigator.geolocation.getCurrentPosition(
      pos => { setGps({lat: pos.coords.latitude, lng: pos.coords.longitude}); setGpsLoading(false) },
      err => { setGpsError(err.message || "Kunde inte hämta position"); setGpsLoading(false) },
      {enableHighAccuracy: true, timeout: 10000}
    )
  }

  function submit() {
    if(!text.trim()) return
    onAdd({text, photo, km, gps, av:user.name})
    setText(""); setPhoto(null); setKm(""); setGps(null); setGpsError(null)
  }

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px",marginBottom:18}}>Avvikelser</h1>
        <div style={{...card,marginBottom:14}}>
          <label style={lbl}>Beskriv avvikelsen</label>
          <textarea style={{...inp,height:80,resize:"none",marginBottom:10}} placeholder="Beskriv avvikelsen" value={text} onChange={e=>setText(e.target.value)}/>
          <label style={lbl}>Km-läge (valfritt)</label>
          <input style={{...inp,marginBottom:10}} placeholder="ex. Km 142+380" value={km} onChange={e=>setKm(e.target.value)}/>
          <label style={lbl}>GPS-position (valfritt)</label>
          {gps ? (
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:C.bg3,border:`1px solid ${C.b}`,borderRadius:8,padding:"12px 14px",marginBottom:10}}>
              <span style={{fontSize:13,color:C.tx}}>📍 {gps.lat.toFixed(5)}, {gps.lng.toFixed(5)}</span>
              <button onClick={()=>setGps(null)} style={{background:"none",border:"none",cursor:"pointer",color:C.mu,fontSize:18,padding:0,lineHeight:1}}>×</button>
            </div>
          ) : (
            <button onClick={fetchGPS} disabled={gpsLoading} style={{...btnG,marginBottom: gpsError ? 6 : 10,cursor: gpsLoading ? "wait" : "pointer"}}>
              {gpsLoading ? "📡 Hämtar position..." : "📍 Hämta min position"}
            </button>
          )}
          {gpsError && <div style={{fontSize:12,color:C.da,marginBottom:10}}>{gpsError}</div>}
          <label style={lbl}>Foto (valfritt)</label>
          {photo ? (
            <div style={{position:"relative",marginBottom:10}}>
              <img src={photo} alt="" style={{width:"100%",borderRadius:8,maxHeight:200,objectFit:"cover",display:"block"}}/>
              <button onClick={() => setPhoto(null)} style={{position:"absolute",top:8,right:8,width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,.6)",border:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1,padding:0}}>×</button>
            </div>
          ) : (
            <label style={{...btnG,marginBottom:10,cursor:"pointer"}}>
              📷 Lägg till foto
              <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{display:"none"}}/>
            </label>
          )}
          <button style={btnP} onClick={submit}>Rapportera</button>
        </div>
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:8}}>
        {open.length>0 && <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,margin:"4px 0 6px"}}>ÖPPNA ({open.length})</div>}
        {open.map(a => (
          <div key={a.id} style={{...card,borderColor:"rgba(224,82,82,.22)"}}>
            <div style={{fontSize:14,lineHeight:1.6,marginBottom:a.photo?10:10}}>{a.text}</div>
            {(a.km || a.gps) && (
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                {a.km && <span style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"4px 9px",borderRadius:6,border:"1px solid rgba(232,184,75,.2)"}}>📍 {a.km}</span>}
                {a.gps && <span style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"4px 9px",borderRadius:6,border:"1px solid rgba(232,184,75,.2)"}}>🛰 {a.gps.lat.toFixed(5)}, {a.gps.lng.toFixed(5)}</span>}
              </div>
            )}
            {a.photo && <img src={a.photo} alt="" style={{width:"100%",borderRadius:8,maxHeight:220,objectFit:"cover",marginBottom:10,display:"block"}}/>}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:C.mu}}>{a.av} · {a.datum}</span>
              {canClose && <button onClick={()=>onStang(a.id)} style={{fontSize:12,background:"rgba(46,125,50,.08)",border:"1px solid rgba(46,125,50,.25)",color:C.ok,padding:"4px 10px",borderRadius:6,cursor:"pointer"}}>Stäng avvik</button>}
            </div>
          </div>
        ))}
        {closed.length>0 && <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,margin:"10px 0 6px"}}>STÄNGDA ({closed.length})</div>}
        {closed.map(a => (
          <div key={a.id} style={{...card,opacity:.6}}>
            <div style={{fontSize:14,lineHeight:1.5,marginBottom:6}}>{a.text}</div>
            {(a.km || a.gps) && (
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                {a.km && <span style={{fontSize:12,color:C.mu,background:C.bg3,padding:"3px 8px",borderRadius:6}}>📍 {a.km}</span>}
                {a.gps && <span style={{fontSize:12,color:C.mu,background:C.bg3,padding:"3px 8px",borderRadius:6}}>🛰 {a.gps.lat.toFixed(5)}, {a.gps.lng.toFixed(5)}</span>}
              </div>
            )}
            {a.photo && <img src={a.photo} alt="" style={{width:"100%",borderRadius:8,maxHeight:160,objectFit:"cover",marginBottom:8,display:"block"}}/>}
            <div style={{fontSize:12,color:C.mu}}>{a.av} · {a.datum}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ProjekteringArbetsledare — matris-vy: arbetsledare × veckor ───────
// Rader = arbetsledare. Kolumner = V18-V30. Cell = projekt-ID som de leder.
// Klick cell: info-popup (om bokat) eller projekt-väljare (om tomt). Klick namn: visa allt.
function ProjekteringArbetsledare({projekt, bokningar, onAddBokning, onRemoveBokning}) {
  // 13 veckor = MAJ (V18-V21), JUNI (V22-V26), JULI (V27-V30)
  const weeks = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  const arbetsledare = INIT_KONTAKTER.filter(k => k.roll === "Arbetsledare")
  const [cellOpen, setCellOpen] = useState(null) // {arbetsledare, vecka, befintligBokning}
  const [namnOpen, setNamnOpen] = useState(null) // arbetsledare

  // Månadsindelning för varje vecka (ISO-veckor 2026)
  function manad(v) {
    if (v <= 21) return "MAJ"
    if (v <= 26) return "JUNI"
    return "JULI"
  }

  // Hämta projekt för (arbetsledare, vecka)
  function getBokning(arbetsledareId, vecka) {
    return bokningar.find(b => b.anstalldId === arbetsledareId && b.vecka === vecka)
  }

  // Beräkna månadsspannar (för månadsheader)
  const manadSpannar = (() => {
    const result = []
    let cur = null
    weeks.forEach((v, i) => {
      const m = manad(v)
      if (!cur || cur.label !== m) {
        if (cur) result.push(cur)
        cur = {label: m, start: i, antal: 1}
      } else {
        cur.antal++
      }
    })
    if (cur) result.push(cur)
    return result
  })()

  // Antal anställda på ett projekt en specifik vecka
  function antalAnstallda(projektId, vecka) {
    return bokningar.filter(b => b.projektId === projektId && b.vecka === vecka && !INIT_KONTAKTER.find(k => k.id === b.anstalldId && k.roll === "Arbetsledare")).length
  }

  const NAMN_W = 130
  const CELL_W = 56

  return (
    <div>
      <div style={{padding:"4px 20px 12px"}}>
        <div style={{fontSize:13,color:C.mu,marginBottom:6}}>
          Bemanning av arbetsledare per vecka · {arbetsledare.length} ledare · klicka cell för att boka
        </div>
      </div>

      {/* Matris med horisontell scroll */}
      <div style={{overflowX:"auto",paddingBottom:8,paddingLeft:20}}>
        <div style={{display:"inline-block",minWidth:"100%",paddingRight:20}}>

          {/* Månads-rad */}
          <div style={{display:"grid",gridTemplateColumns:`${NAMN_W}px repeat(${weeks.length}, ${CELL_W}px)`,marginBottom:1}}>
            <div></div>
            {manadSpannar.map((m, i) => (
              <div key={i} style={{gridColumn:`span ${m.antal}`,fontSize:10.5,fontWeight:600,letterSpacing:".6px",color:C.mu,textAlign:"center",padding:"6px 0 4px",borderBottom:`2px solid ${C.b2}`}}>{m.label}</div>
            ))}
          </div>

          {/* Vecko-headers */}
          <div style={{display:"grid",gridTemplateColumns:`${NAMN_W}px repeat(${weeks.length}, ${CELL_W}px)`,marginBottom:4}}>
            <div style={{fontSize:10,color:C.mu,fontWeight:500,letterSpacing:".4px",padding:"6px 4px",textTransform:"uppercase"}}>Arbetsledare</div>
            {weeks.map(v => (
              <div key={v} style={{fontSize:11,fontWeight:600,color:v===22?C.ac:C.tx,textAlign:"center",padding:"6px 0",borderTop:`1px solid ${C.b}`,background:v===22?"rgba(21,101,192,.05)":"transparent"}}>V{v}</div>
            ))}
          </div>

          {/* Rader */}
          {arbetsledare.map(a => (
            <div key={a.id} style={{display:"grid",gridTemplateColumns:`${NAMN_W}px repeat(${weeks.length}, ${CELL_W}px)`,marginBottom:3}}>
              <button onClick={() => setNamnOpen(a)} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:6,padding:"8px 8px",textAlign:"left",cursor:"pointer",fontFamily:"inherit",marginRight:4,minWidth:0,overflow:"hidden"}}>
                <div style={{fontSize:12,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</div>
                <div style={{fontSize:10,color:C.mu,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.tel}</div>
              </button>
              {weeks.map(v => {
                const bok = getBokning(a.id, v)
                const p = bok ? projekt.find(x => x.id === bok.projektId) : null
                const c = p ? PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length] : null
                return (
                  <button key={v} onClick={() => setCellOpen({arbetsledare:a, vecka:v, befintligBokning:bok})} style={{background:c?c.bg:C.bg2,border:`1px solid ${c?c.border:C.b}`,borderRadius:4,padding:0,cursor:"pointer",fontFamily:"inherit",margin:"0 1px",minHeight:36,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {p ? (
                      <span style={{fontSize:11,fontWeight:600,color:c.text,padding:"0 4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.1}}>{p.namn.split(" ")[0].slice(0, 6)}</span>
                    ) : (
                      <span style={{fontSize:14,color:C.mu,fontWeight:400}}>+</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}

          {/* Legend */}
          <div style={{marginTop:14,padding:"10px 12px",background:C.bg2,border:`1px solid ${C.b}`,borderRadius:8,display:"flex",flexWrap:"wrap",gap:10,minWidth:weeks.length*CELL_W+NAMN_W}}>
            <div style={{fontSize:10,fontWeight:500,letterSpacing:".4px",color:C.mu,marginBottom:2,width:"100%"}}>PROJEKT-FÄRGER</div>
            {projekt.filter(p => p.status === "Pågående" || p.status === "Planering").map(p => {
              const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
              return (
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:5,fontSize:11}}>
                  <div style={{width:12,height:12,borderRadius:3,background:c.text}}/>
                  <span style={{color:C.tx}}>{p.namn}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CELL-modal: info om bokning + ändra/ta bort/lägg till */}
      {cellOpen && <CellModal {...cellOpen} projekt={projekt} bokningar={bokningar} onAdd={onAddBokning} onRemove={onRemoveBokning} onClose={() => setCellOpen(null)}/>}

      {/* NAMN-modal: alla projekt för en arbetsledare + anställda på dem */}
      {namnOpen && <ArbetsledareDetaljModal arbetsledare={namnOpen} bokningar={bokningar} projekt={projekt} onClose={() => setNamnOpen(null)}/>}
    </div>
  )
}

// — Cell-modal: bottom-sheet med projekt-info eller projekt-väljare —
function CellModal({arbetsledare, vecka, befintligBokning, projekt, bokningar, onAdd, onRemove, onClose}) {
  const p = befintligBokning ? projekt.find(x => x.id === befintligBokning.projektId) : null
  const c = p ? PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length] : null
  // Antal anställda (icke-ledare) på projektet denna vecka
  const anstalldaPaProjekt = bokningar.filter(b => b.projektId === befintligBokning?.projektId && b.vecka === vecka)
    .map(b => INIT_KONTAKTER.find(k => k.id === b.anstalldId))
    .filter(k => k && k.roll !== "Arbetsledare")
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"20px 20px 24px",maxWidth:430,width:"100%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:6}}>VECKA {vecka}</div>
        <div style={{textAlign:"center",fontSize:14,fontWeight:600,marginBottom:14}}>{arbetsledare.name}</div>

        {p ? (
          <>
            <div style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
              <div style={{fontSize:11,color:C.mu,letterSpacing:".3px",fontWeight:500}}>LEDER PROJEKT</div>
              <div style={{fontSize:17,fontWeight:600,color:c.text,marginTop:3}}>{p.namn}</div>
              <div style={{fontSize:12,color:C.mu,marginTop:2}}>📍 {p.plats}</div>
              <div style={{fontSize:12,color:C.mu,marginTop:6}}>👥 {anstalldaPaProjekt.length} anställda denna vecka</div>
            </div>
            {anstalldaPaProjekt.length > 0 && (
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10.5,color:C.mu,letterSpacing:".4px",fontWeight:500,marginBottom:6}}>BEMANNING V{vecka}</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {anstalldaPaProjekt.map(k => (
                    <div key={k.id} style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:8,padding:"8px 12px"}}>
                      <IniAvatar name={k.name} size={28}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:500}}>{k.name}</div>
                        <div style={{fontSize:11,color:C.mu}}>{k.roll}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button onClick={() => { onRemove({anstalldId:arbetsledare.id, vecka}); onClose() }} style={{...btnG,padding:"12px",marginBottom:8,color:C.da,borderColor:"rgba(224,82,82,.3)"}}>Ta bort bokning</button>
            <button onClick={onClose} style={btnG}>Stäng</button>
          </>
        ) : (
          <>
            <div style={{fontSize:10.5,color:C.mu,letterSpacing:".4px",fontWeight:500,marginBottom:8,textAlign:"center"}}>VÄLJ PROJEKT ATT LEDA</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
              {projekt.filter(pr => pr.status === "Pågående" || pr.status === "Planering").map(pr => {
                const cc = PROJECT_PALETTE[pr.farg % PROJECT_PALETTE.length]
                return (
                  <button key={pr.id} onClick={() => { onAdd({anstalldId:arbetsledare.id, projektId:pr.id, vecka}); onClose() }} style={{display:"flex",alignItems:"center",gap:10,background:cc.bg,border:`1px solid ${cc.border}`,borderRadius:8,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                    <div style={{width:6,height:36,borderRadius:3,background:cc.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:600,color:cc.text}}>{pr.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:1}}>📍 {pr.plats}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            <button onClick={onClose} style={btnG}>Avbryt</button>
          </>
        )}
      </div>
    </div>
  )
}

// — Arbetsledare-detalj-modal: alla deras projekt + anställda —
function ArbetsledareDetaljModal({arbetsledare, bokningar, projekt, onClose}) {
  // Hämta alla arbetsledarens bokningar + samla per projekt
  const minaBok = bokningar.filter(b => b.anstalldId === arbetsledare.id)
  const projektStat = {}
  minaBok.forEach(b => {
    if (!projektStat[b.projektId]) {
      const p = projekt.find(x => x.id === b.projektId)
      if (!p) return
      projektStat[b.projektId] = {projekt:p, veckor:[]}
    }
    if (projektStat[b.projektId]) projektStat[b.projektId].veckor.push(b.vecka)
  })
  const minaProjekt = Object.values(projektStat).sort((a, b) => Math.min(...a.veckor) - Math.min(...b.veckor))

  // För varje projekt: hämta alla anställda som jobbar på det (oavsett vecka)
  function anstalldaPaProjekt(projektId, veckor) {
    const ids = new Set()
    bokningar.filter(b => b.projektId === projektId && veckor.includes(b.vecka))
      .forEach(b => {
        const k = INIT_KONTAKTER.find(kk => kk.id === b.anstalldId)
        if (k && k.roll !== "Arbetsledare") ids.add(b.anstalldId)
      })
    return [...ids].map(id => INIT_KONTAKTER.find(k => k.id === id)).filter(Boolean)
  }

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
          <IniAvatar name={arbetsledare.name} size={54}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".4px",fontWeight:500}}>ARBETSLEDARE</div>
            <div style={{fontSize:17,fontWeight:600,marginTop:1}}>{arbetsledare.name}</div>
            <div style={{fontSize:12,color:C.mu,marginTop:2}}>📞 {arbetsledare.tel}</div>
          </div>
        </div>

        <div style={{fontSize:11,color:C.mu,letterSpacing:".4px",fontWeight:500,marginBottom:8}}>PROJEKT ({minaProjekt.length})</div>
        {minaProjekt.length === 0 ? (
          <div style={{padding:24,textAlign:"center",color:C.mu,fontSize:13}}>Inga projekt ännu</div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
            {minaProjekt.map(({projekt:p, veckor}) => {
              const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
              const veckorSort = [...veckor].sort((a, b) => a - b)
              const minV = veckorSort[0], maxV = veckorSort[veckorSort.length - 1]
              const anstallda = anstalldaPaProjekt(p.id, veckorSort)
              return (
                <div key={p.id} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:10,padding:"12px 14px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                    <div style={{width:5,minHeight:36,borderRadius:3,background:c.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:600,color:c.text}}>{p.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>📍 {p.plats}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>{veckor.length} v · V{minV}–V{maxV} · 👥 {anstallda.length} anställda</div>
                    </div>
                  </div>
                  {anstallda.length > 0 && (
                    <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${c.border}`,display:"flex",flexWrap:"wrap",gap:4}}>
                      {anstallda.map(k => (
                        <div key={k.id} style={{display:"flex",alignItems:"center",gap:4,background:C.bg,border:`1px solid ${C.b}`,borderRadius:12,padding:"3px 8px 3px 3px",fontSize:11}}>
                          <IniAvatar name={k.name} size={20}/>
                          <span style={{fontWeight:500}}>{k.name}</span>
                          <span style={{color:C.mu,fontSize:10}}>· {k.roll}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <button onClick={onClose} style={btnG}>Stäng</button>
      </div>
    </div>
  )
}

// ── Projektkoll (arbetsledare) ────────────────────────────────
function Projektkoll({navigate, avvikelser, andringar, onAddAndring, dagorder}) {
  const open = avvikelser.filter(a=>a.status==="open")
  const closed = avvikelser.filter(a=>a.status==="closed")
  const [showAndringForm, setShowAndringForm] = useState(false)
  const [andringText, setAndringText] = useState("")
  const [paminnelseSent, setPaminnelseSent] = useState(null) // namnet på arbetaren påminnelsen just skickats till

  // Senaste ändringen + dess kvittenser styr "Kvitterade ändringar"-sektionen
  const senasteAndring = andringar.length > 0 ? andringar[andringar.length - 1] : null
  const kvitt = senasteAndring?.kvittenser || {}
  const seenCount = Object.values(kvitt).filter(k => k.sedd).length

  // ═══════════════════════════════════════════════════════════════════════
  // TODO — RIKTIG PUSHNOTIS-INTEGRATION
  // ───────────────────────────────────────────────────────────────────────
  // När backend finns på plats, ersätt mock-anropet nedan med ett riktigt
  // API-anrop, t.ex.:
  //
  //   await fetch("/api/push/reminder", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       arbetareId: worker.id,
  //       andringId:  senasteAndring.id,
  //       avsandare:  user.id,
  //     })
  //   })
  //
  // Backend ansvarar för att skicka pushnotisen via FCM (Android) / APNs (iOS)
  // till arbetarens registrerade enheter. Logga utskicket för audit-trail.
  // ═══════════════════════════════════════════════════════════════════════
  function sendPaminnelse(worker) {
    // MOCK: simulerar pushnotis genom att visa en bekräftelsedialog
    setPaminnelseSent(worker.name)
  }

  function submitAndring() {
    if (!andringText.trim()) return
    onAddAndring(andringText)
    setAndringText("")
    setShowAndringForm(false)
  }

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px",marginBottom:4}}>Projektkoll</h1>
        <div style={{fontSize:13,color:C.mu,marginBottom:18}}>{dagorder.proj}</div>
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>navigate("skapa-dagorder")} style={{...card,flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",transition:"border-color .15s"}}
            onMouseOver={e=>e.currentTarget.style.borderColor=C.b2}
            onMouseOut={e=>e.currentTarget.style.borderColor=C.b}>
            <span style={{fontSize:24}}>📋</span>
            <span style={{fontSize:13,fontWeight:500,color:C.tx}}>Skapa dagorder</span>
          </button>
          <button onClick={()=>setShowAndringForm(s=>!s)} style={{...card,flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",transition:"border-color .15s",borderColor:showAndringForm?C.ac:C.b}}
            onMouseOver={e=>{if(!showAndringForm)e.currentTarget.style.borderColor=C.b2}}
            onMouseOut={e=>{if(!showAndringForm)e.currentTarget.style.borderColor=C.b}}>
            <span style={{fontSize:24}}>🔔</span>
            <span style={{fontSize:13,fontWeight:500,color:C.tx}}>Lägg till ändring</span>
          </button>
        </div>

        {showAndringForm && (
          <div style={{...card,borderColor:"rgba(232,184,75,.3)",background:"rgba(232,184,75,.06)"}}>
            <label style={lbl}>Beskriv ändringen (syns hos arbetare som "ny ändring")</label>
            <textarea style={{...inp,height:80,resize:"none",marginBottom:10}} placeholder="T.ex. säkerhetszon ändrad, ny mötestid..." value={andringText} onChange={e=>setAndringText(e.target.value)}/>
            <div style={{display:"flex",gap:8}}>
              <button style={{...btnP,flex:1}} onClick={submitAndring}>Publicera ändring</button>
              <button style={{...btnG,flex:1}} onClick={()=>{setShowAndringForm(false);setAndringText("")}}>Avbryt</button>
            </div>
          </div>
        )}

        {andringar.length > 0 && (
          <div style={card}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,marginBottom:12}}>SENASTE ÄNDRINGAR ({andringar.length})</div>
            {andringar.map((a,i) => (
              <div key={a.id} style={{display:"flex",gap:10,paddingBottom:i<andringar.length-1?12:0,marginBottom:i<andringar.length-1?12:0,borderBottom:i<andringar.length-1?`1px solid ${C.b}`:"none"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:a.sedd?C.mu:C.ac,flexShrink:0,marginTop:5}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,lineHeight:1.5}}>{a.text}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:3}}>{a.av} · {a.datum} {a.sedd ? "· ✓ sedd av teamet" : "· ny"}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {senasteAndring && (
          <div style={card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu}}>👁 KVITTERADE ÄNDRINGAR</div>
              <span style={{fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:20,color:seenCount===ANSTALLDA.length?C.ok:C.ac,background:seenCount===ANSTALLDA.length?"rgba(46,125,50,.12)":"rgba(232,184,75,.15)"}}>{seenCount}/{ANSTALLDA.length} sett</span>
            </div>
            <div style={{fontSize:12,color:C.mu,marginBottom:14,fontStyle:"italic",lineHeight:1.5}}>
              "{senasteAndring.text}"
            </div>
            {ANSTALLDA.map((a,i) => {
              const k = kvitt[a.id] || {sedd:false}
              const last = i === ANSTALLDA.length - 1
              return (
                <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,paddingBottom:last?0:10,marginBottom:last?0:10,borderBottom:last?"none":`1px solid ${C.b}`}}>
                  <span style={{fontSize:18,lineHeight:1,flexShrink:0}}>{k.sedd ? "✅" : "⏳"}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:500}}>{a.name}</div>
                    <div style={{fontSize:12,color:k.sedd?C.ok:C.mu,marginTop:2}}>{k.sedd ? `Sedd ${k.tid}` : "Ej sedd"}</div>
                  </div>
                  {!k.sedd && (
                    <button onClick={() => sendPaminnelse(a)} style={{fontSize:12,fontWeight:500,background:C.bg3,border:`1px solid ${C.b2}`,color:C.ac,padding:"7px 12px",borderRadius:6,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}}>
                      🔔 Skicka påminnelse
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div style={card}>
          <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,marginBottom:12}}>ÖPPNA AVVIKELSER ({open.length})</div>
          {open.length === 0 && <div style={{fontSize:13,color:C.mu}}>Inga öppna avvikelser 🎉</div>}
          {open.map((a,i) => (
            <div key={a.id} style={{display:"flex",gap:10,paddingBottom:i<open.length-1?12:0,marginBottom:i<open.length-1?12:0,borderBottom:i<open.length-1?`1px solid ${C.b}`:"none"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:C.da,flexShrink:0,marginTop:5}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,lineHeight:1.5}}>{a.text}</div>
                <div style={{fontSize:11,color:C.mu,marginTop:3}}>{a.av} · {a.datum}</div>
              </div>
            </div>
          ))}
          {open.length > 0 && (
            <button onClick={()=>navigate("avvikelser")} style={{...btnG,marginTop:12,padding:"10px",fontSize:13}}>Hantera avvikelser →</button>
          )}
        </div>

        {closed.length > 0 && (
          <div style={card}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,marginBottom:12}}>STÄNGDA AVVIKELSER ({closed.length})</div>
            {closed.map((a,i) => (
              <div key={a.id} style={{display:"flex",gap:10,paddingBottom:i<closed.length-1?10:0,marginBottom:i<closed.length-1?10:0,borderBottom:i<closed.length-1?`1px solid ${C.b}`:"none",opacity:.7}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:C.ok,flexShrink:0,marginTop:5}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,lineHeight:1.5}}>{a.text}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:3}}>{a.av} · {a.datum}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={card}>
          <div style={{fontSize:11,fontWeight:500,letterSpacing:".6px",color:C.mu,marginBottom:12}}>VEM ÄR PÅ PROJEKTET ({ANSTALLDA.length})</div>
          {ANSTALLDA.map((a,i) => (
            <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i<ANSTALLDA.length-1?10:0}}>
              <div style={{width:38,height:38,borderRadius:"50%",background:"rgba(232,184,75,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,color:C.ac,flexShrink:0}}>{a.name.split(" ").map(n=>n[0]).join("")}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:500}}>{a.name}</div>
                <div style={{fontSize:12,color:C.mu}}>{a.roll}</div>
              </div>
              <a href={`tel:${a.tel.replace(/\s/g,"")}`} style={{fontSize:12,color:C.ac,textDecoration:"none",padding:"6px 10px",borderRadius:6,border:`1px solid ${C.b}`}}>📞 {a.tel}</a>
            </div>
          ))}
        </div>
      </div>

      {paminnelseSent && (
        <div onClick={() => setPaminnelseSent(null)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.45)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,zIndex:100}}>
          <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderRadius:16,padding:"28px 24px",maxWidth:340,width:"100%",textAlign:"center",boxShadow:"0 10px 40px rgba(0,0,0,.18)"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(46,125,50,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 14px",color:C.ok}}>✓</div>
            <div style={{fontSize:17,fontWeight:600,marginBottom:6}}>Påminnelse skickad</div>
            <div style={{fontSize:14,color:C.mu,marginBottom:20,lineHeight:1.5}}>
              En pushnotis har skickats till <strong style={{color:C.tx}}>{paminnelseSent}</strong>.
            </div>
            <button style={btnP} onClick={() => setPaminnelseSent(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Profil ────────────────────────────────────────────────────
function Profil({user, onLogout, navigate}) {
  const showWorkInfo = user.role === "arbetare" || user.role === "arbetsledare"
  const komp = KOMPETENSER[user.role] || []
  const jobb = TIDIGARE_JOBB[user.role] || []
  // Hitta inloggad användares företag i den publika företagslistan
  const minForetag = typeof INIT_FORETAG !== "undefined" ? INIT_FORETAG.find(c => c.namn === user.company) : null

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px",marginBottom:24}}>Profil</h1>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
          <div style={{width:60,height:60,borderRadius:"50%",background:"rgba(232,184,75,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:600,color:C.ac}}>{user.name[0]}</div>
          <div><div style={{fontWeight:600,fontSize:18}}>{user.name}</div><div style={{fontSize:13,color:C.mu,marginTop:2}}>{user.company}</div></div>
        </div>
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:10}}>
        {/* Mitt företag — direktlänk till egen publik företagsprofil */}
        {minForetag && navigate && (
          <button onClick={() => navigate("foretag-profil", minForetag)} style={{display:"flex",alignItems:"center",gap:14,background:`${minForetag.logoBg}10`,border:`1.5px solid ${minForetag.logoBg}50`,borderRadius:12,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",width:"100%"}}>
            <div style={{width:48,height:48,borderRadius:10,background:minForetag.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{minForetag.logoEmoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,color:C.mu,letterSpacing:".4px",fontWeight:500,textTransform:"uppercase"}}>Mitt företag</div>
              <div style={{fontSize:15,fontWeight:600,color:C.tx,marginTop:2}}>{minForetag.namn}</div>
              <div style={{fontSize:11,color:minForetag.logoBg,marginTop:2,fontWeight:500}}>Se publika profilen →</div>
            </div>
            <div style={{fontSize:20,color:C.mu,flexShrink:0}}>›</div>
          </button>
        )}
        <div style={card}><div style={{fontSize:11,color:C.mu,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Roll</div><div style={{fontSize:15,textTransform:"capitalize"}}>{user.role}</div></div>
        <div style={card}><div style={{fontSize:11,color:C.mu,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Företag</div><div style={{fontSize:15}}>{user.company}</div></div>

        {showWorkInfo && komp.length > 0 && (
          <div style={card}>
            <div style={{fontSize:11,color:C.mu,marginBottom:10,textTransform:"uppercase",letterSpacing:".5px"}}>Kompetenser & certifikat</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {komp.map(k => (
                <span key={k} style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"5px 10px",borderRadius:8,border:"1px solid rgba(232,184,75,.2)"}}>{k}</span>
              ))}
            </div>
          </div>
        )}

        {showWorkInfo && jobb.length > 0 && (
          <div style={card}>
            <div style={{fontSize:11,color:C.mu,marginBottom:12,textTransform:"uppercase",letterSpacing:".5px"}}>Tidigare jobb ({jobb.length})</div>
            {jobb.map((j,i) => (
              <div key={i} style={{paddingBottom:i<jobb.length-1?12:0,marginBottom:i<jobb.length-1?12:0,borderBottom:i<jobb.length-1?`1px solid ${C.b}`:"none"}}>
                <div style={{fontSize:14,fontWeight:600,marginBottom:3}}>{j.proj}</div>
                <div style={{fontSize:12,color:C.mu,marginBottom:2}}>📍 {j.plats} · {j.roll}</div>
                <div style={{fontSize:11,color:C.mu}}>{j.period}</div>
              </div>
            ))}
          </div>
        )}

        <button style={{...btnG,marginTop:8}} onClick={onLogout}>Logga ut</button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// INTRANÄT — Hem, Nyheter, Säkerhet, Dokument, Kontakter, Meddelanden,
// Checklistor, Utbildning. Adaptiv chef-/anställd-vy.
// ═══════════════════════════════════════════════════════════════════════

// Hitta inloggad användares anställd-id via namnmatch. null för chef.
function getAnstalldId(user) {
  if (!user) return null
  const k = INIT_KONTAKTER.find(x => x.name === user.name)
  return k ? k.id : null
}

// Initialer-avatar
function IniAvatar({name, size = 38, bg = "rgba(232,184,75,.18)", color = C.ac}) {
  const init = (name || "?").split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase()
  return <div style={{width:size,height:size,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:Math.round(size*.36),fontWeight:600,color,flexShrink:0}}>{init}</div>
}

// Filter-pills (kategorier)
function FilterPills({items, selected, onSelect, allLabel = "Alla", counts = null}) {
  return (
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14,overflowX:"auto"}}>
      <button onClick={() => onSelect(null)} style={{fontSize:12,padding:"6px 11px",borderRadius:14,border:`1px solid ${selected===null?C.ac:C.b}`,background:selected===null?"rgba(21,101,192,.1)":C.bg2,color:selected===null?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:selected===null?500:400,whiteSpace:"nowrap"}}>{allLabel}{counts && ` (${counts.__all ?? 0})`}</button>
      {items.map(it => {
        const sel = it === selected
        return (
          <button key={it} onClick={() => onSelect(sel ? null : it)} style={{fontSize:12,padding:"6px 11px",borderRadius:14,border:`1px solid ${sel?C.ac:C.b}`,background:sel?"rgba(21,101,192,.1)":C.bg2,color:sel?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:sel?500:400,whiteSpace:"nowrap"}}>{it}{counts && ` (${counts[it] ?? 0})`}</button>
        )
      })}
    </div>
  )
}

// Intranät-modul header
function IntranetHdr({title, navigate, back = "intranet-hem", subtitle, action}) {
  return (
    <div style={hdr}>
      <button onClick={() => navigate(back)} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
      <div style={{minWidth:0,flex:1}}>
        <div style={{fontWeight:600,fontSize:15}}>{title}</div>
        {subtitle && <div style={{fontSize:11,color:C.mu,marginTop:1}}>{subtitle}</div>}
      </div>
      {action}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// HEM — Startsidan med kritisk-banner, olästa-stats, snabblänkar
// ─────────────────────────────────────────────────────────────────────────
function IntranetHem({user, nyheter, sakerhet, meddelanden, checklistor, navigate}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)

  const kritiska = nyheter.filter(n => n.kritisk)
  const olastaKritiska = isChef ? [] : kritiska.filter(n => !n.lasningar[aid])
  const olastaNyheter = isChef ? [] : nyheter.filter(n => !n.kritisk && !n.lasningar[aid])
  const minRoll = aid ? (INIT_KONTAKTER.find(x => x.id === aid) || {}).roll : null
  const olastaMeddelanden = isChef ? [] : meddelanden.filter(m => {
    if (m.kvittenser[aid]) return false
    if (m.tillTyp === "alla") return true
    if (m.tillTyp === "roll") return m.tillFilter === minRoll
    if (m.tillTyp === "person") return m.tillFilter === aid
    return false
  })
  const okvitteradeSakerhet = isChef ? [] : sakerhet.filter(s => !s.kvittenser[aid])
  const minChecklist = isChef ? null : checklistor.find(c => c.anstalldId === aid && c.datum === "2026-05-25")
  const checklistOgjord = !isChef && minRoll && (!minChecklist || !minChecklist.klar)

  // Chef-statistik
  const chefNyaIdag = isChef ? nyheter.filter(n => n.datum.startsWith("2026-05-25")).length : 0
  const totalKvittenser = isChef ? nyheter.reduce((s, n) => s + Object.keys(n.lasningar).length, 0) : 0

  const quickLinks = [
    {id:"intranet-nyheter",     e:"📰", l:"Nyheter",     badge: olastaNyheter.length, bg:"rgba(21,101,192,.08)"},
    {id:"intranet-sakerhet",    e:"🦺", l:"Säkerhet",    badge: okvitteradeSakerhet.length, bg:"rgba(232,184,75,.12)"},
    {id:"intranet-dokument",    e:"📂", l:"Dokument",    badge: 0, bg:"rgba(91,156,246,.08)"},
    {id:"intranet-kontakter",   e:"📞", l:"Kontakter",   badge: 0, bg:"rgba(46,125,50,.08)"},
    {id:"intranet-meddelanden", e:"💬", l:"Meddelanden", badge: olastaMeddelanden.length, bg:"rgba(224,82,82,.08)"},
    {id:"intranet-checklistor", e:"✅", l:"Checklistor", badge: checklistOgjord ? 1 : 0, bg:"rgba(46,125,50,.12)"},
    {id:"intranet-utbildning",  e:"🎓", l:"Utbildning",  badge: 0, bg:"rgba(165,99,168,.08)"},
    {id:"dokumentnav-hem",      e:"📁", l:"Dokumentnav", badge: 0, bg:"rgba(21,101,192,.1)"},
    {id:"anstallda-hem",        e:"👥", l:"Anställda",   badge: 0, bg:"rgba(46,125,50,.1)"},
    {id:"intranet-inventarie",  e:"📦", l:"Inventarie",  badge: 0, bg:"rgba(232,184,75,.12)"},
    {id:"foretag-listan",       e:"🏛", l:"Företag",     badge: 0, bg:"rgba(91,156,246,.1)"},
  ]

  return (
    <div>
      <div style={{padding:"18px 20px 12px"}}>
        <div style={{fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,textTransform:"uppercase"}}>🏢 Intranät · Lindqvist Rail AB</div>
        <div style={{fontSize:24,fontWeight:600,marginTop:4}}>Hej {user?.name?.split(" ")[0] || ""} 👋</div>
        <div style={{fontSize:12,color:C.mu,marginTop:2}}>Måndag 25 maj 2026 · V22</div>
      </div>

      {/* KRITISK NYHET — röd banner som kräver kvittering */}
      {olastaKritiska.length > 0 && (
        <div style={{padding:"0 20px 14px"}}>
          {olastaKritiska.map(n => (
            <div key={n.id} onClick={() => navigate("intranet-nyhet-detalj", n)} style={{background:"rgba(224,82,82,.08)",border:"1.5px solid rgba(224,82,82,.55)",borderRadius:12,padding:"14px 16px",marginTop:6,cursor:"pointer",boxShadow:"0 4px 16px rgba(224,82,82,.12)"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                <span style={{fontSize:14}}>⚠️</span>
                <span style={{fontSize:10.5,color:C.da,fontWeight:700,letterSpacing:".6px"}}>KRITISK NYHET · KRÄVER KVITTERING</span>
              </div>
              <div style={{fontSize:15,fontWeight:600,marginBottom:4,color:C.tx,lineHeight:1.35}}>{n.titel}</div>
              <div style={{fontSize:12,color:C.da,fontWeight:500,marginTop:8}}>Tryck för att läsa & kvittera →</div>
            </div>
          ))}
        </div>
      )}

      {/* Stats-rad */}
      {!isChef && (olastaMeddelanden.length > 0 || olastaNyheter.length > 0 || checklistOgjord) && (
        <div style={{padding:"0 20px 14px",display:"flex",gap:8,overflowX:"auto"}}>
          {olastaNyheter.length > 0 && (
            <div onClick={() => navigate("intranet-nyheter")} style={{flex:"0 0 auto",background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"10px 14px",cursor:"pointer",minWidth:130}}>
              <div style={{fontSize:10,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>OLÄSTA NYHETER</div>
              <div style={{fontSize:22,fontWeight:600,color:C.ac,marginTop:2,lineHeight:1}}>{olastaNyheter.length}</div>
            </div>
          )}
          {olastaMeddelanden.length > 0 && (
            <div onClick={() => navigate("intranet-meddelanden")} style={{flex:"0 0 auto",background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"10px 14px",cursor:"pointer",minWidth:130}}>
              <div style={{fontSize:10,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>NYA MEDDELANDEN</div>
              <div style={{fontSize:22,fontWeight:600,color:C.da,marginTop:2,lineHeight:1}}>{olastaMeddelanden.length}</div>
            </div>
          )}
          {checklistOgjord && (
            <div onClick={() => navigate("intranet-checklistor")} style={{flex:"0 0 auto",background:"rgba(232,184,75,.1)",border:"1px solid rgba(232,184,75,.4)",borderRadius:12,padding:"10px 14px",cursor:"pointer",minWidth:160}}>
              <div style={{fontSize:10,color:"#b88a00",fontWeight:500,letterSpacing:".3px"}}>CHECKLISTA IDAG</div>
              <div style={{fontSize:13,fontWeight:600,color:"#b88a00",marginTop:4}}>⏳ Ej genomförd</div>
            </div>
          )}
        </div>
      )}

      {isChef && (
        <div style={{padding:"0 20px 14px",display:"flex",gap:8}}>
          <div style={{flex:1,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"10px 14px"}}>
            <div style={{fontSize:10,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>NYHETER IDAG</div>
            <div style={{fontSize:22,fontWeight:600,color:C.ac,marginTop:2,lineHeight:1}}>{chefNyaIdag}</div>
          </div>
          <div style={{flex:1,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"10px 14px"}}>
            <div style={{fontSize:10,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>TOTALA KVITTENSER</div>
            <div style={{fontSize:22,fontWeight:600,color:C.ok,marginTop:2,lineHeight:1}}>{totalKvittenser}</div>
          </div>
        </div>
      )}

      {/* Snabblänkar grid */}
      <div style={{padding:"4px 20px 24px"}}>
        <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:10}}>Snabblänkar</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {quickLinks.map(q => (
            <button key={q.id} onClick={() => navigate(q.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,background:q.bg,border:`1px solid ${C.b}`,borderRadius:14,padding:"22px 12px",cursor:"pointer",fontFamily:"inherit",position:"relative",minHeight:110}}>
              <div style={{fontSize:34,lineHeight:1}}>{q.e}</div>
              <div style={{fontSize:13,fontWeight:500,color:C.tx}}>{q.l}</div>
              {q.badge > 0 && (
                <div style={{position:"absolute",top:10,right:10,background:C.da,color:"#fff",borderRadius:11,minWidth:22,height:22,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 6px",border:`2px solid ${C.bg}`}}>{q.badge}</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// NYHETER — Lista, detalj, skapa (chef)
// ─────────────────────────────────────────────────────────────────────────
function IntranetNyheter({user, nyheter, navigate}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  const sorted = [...nyheter].sort((a, b) => {
    if (a.kritisk && !b.kritisk) return -1
    if (!a.kritisk && b.kritisk) return 1
    return b.datum.localeCompare(a.datum)
  })

  return (
    <div>
      <IntranetHdr title="Nyheter & info" navigate={navigate}
        action={isChef && <button onClick={() => navigate("intranet-skapa-nyhet")} style={{background:C.ac,color:"#fff",border:"none",borderRadius:8,padding:"7px 12px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>+ Skapa</button>}/>
      <div style={{padding:"14px 20px 24px",display:"flex",flexDirection:"column",gap:10}}>
        {sorted.map(n => {
          const last = isChef ? Object.keys(n.lasningar).length : (n.lasningar[aid] ? 1 : 0)
          const isUnread = !isChef && !n.lasningar[aid]
          return (
            <button key={n.id} onClick={() => navigate("intranet-nyhet-detalj", n)} style={{display:"block",textAlign:"left",background:n.kritisk?"rgba(224,82,82,.05)":C.bg2,border:`1px solid ${n.kritisk?"rgba(224,82,82,.4)":(isUnread?C.ac:C.b)}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                {n.kritisk && <span style={{fontSize:10.5,color:C.da,fontWeight:700,letterSpacing:".5px"}}>⚠️ KRITISK</span>}
                {!n.kritisk && isUnread && <span style={{fontSize:10.5,color:C.ac,fontWeight:600,letterSpacing:".3px"}}>● NY</span>}
                <span style={{fontSize:11,color:C.mu,marginLeft:n.kritisk||isUnread?"auto":0}}>{n.datum.slice(0, 10)}</span>
              </div>
              <div style={{fontSize:14.5,fontWeight:isUnread?600:500,color:C.tx,marginBottom:5,lineHeight:1.3}}>{n.titel}</div>
              <div style={{fontSize:12,color:C.mu,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{n.text}</div>
              <div style={{fontSize:11,color:C.mu,marginTop:8,display:"flex",justifyContent:"space-between"}}>
                <span>{n.publiceradAv}</span>
                {isChef && <span>👁 {last} läsningar</span>}
                {!isChef && n.lasningar[aid] && <span style={{color:C.ok}}>✓ Läst</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function IntranetNyhetDetalj({user, nyhet, navigate, onLas}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  if (!nyhet) return <div style={{padding:30,textAlign:"center"}}>Nyhet hittades inte</div>
  const isUnread = !isChef && !nyhet.lasningar[aid]
  const lasareIds = Object.keys(nyhet.lasningar)

  return (
    <div>
      <IntranetHdr title="Nyhet" navigate={navigate} back="intranet-nyheter"/>
      <div style={{padding:"16px 20px 24px"}}>
        {nyhet.kritisk && (
          <div style={{background:"rgba(224,82,82,.08)",border:"1.5px solid rgba(224,82,82,.5)",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:18}}>⚠️</span>
            <div>
              <div style={{fontSize:11,color:C.da,fontWeight:700,letterSpacing:".5px"}}>KRITISK NYHET</div>
              <div style={{fontSize:12,color:C.tx,marginTop:1}}>Måste kvitteras före vidare arbete</div>
            </div>
          </div>
        )}
        <div style={{fontSize:11,color:C.mu,marginBottom:4}}>{nyhet.datum} · {nyhet.publiceradAv}</div>
        <h1 style={{fontSize:22,fontWeight:600,marginBottom:14,lineHeight:1.3}}>{nyhet.titel}</h1>
        <div style={{fontSize:15,color:C.tx,lineHeight:1.55,whiteSpace:"pre-wrap",marginBottom:24}}>{nyhet.text}</div>

        {isUnread && (
          <button onClick={() => onLas(nyhet.id)} style={{...btnP,background:nyhet.kritisk?C.da:C.ac,padding:"16px",fontSize:15,marginBottom:14}}>
            {nyhet.kritisk ? "⚠️ Jag har läst & förstått" : "✓ Markera som läst"}
          </button>
        )}
        {!isChef && nyhet.lasningar[aid] && (
          <div style={{background:"rgba(46,125,50,.08)",border:"1px solid rgba(46,125,50,.3)",borderRadius:10,padding:"10px 14px",fontSize:13,color:C.ok,marginBottom:14}}>✓ Du läste denna {nyhet.lasningar[aid]}</div>
        )}

        {isChef && (
          <div style={card}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:12}}>Läsningar ({lasareIds.length} / {INIT_KONTAKTER.length})</div>
            {lasareIds.length === 0 ? (
              <div style={{fontSize:13,color:C.mu,fontStyle:"italic"}}>Ingen har läst än</div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {INIT_KONTAKTER.map((k, i) => {
                  const last = nyhet.lasningar[k.id]
                  return (
                    <div key={k.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<INIT_KONTAKTER.length-1?`1px solid ${C.b}`:"none"}}>
                      <span style={{fontSize:16,width:20}}>{last ? "✅" : "⏳"}</span>
                      <IniAvatar name={k.name} size={28}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:500}}>{k.name}</div>
                        <div style={{fontSize:11,color:last?C.ok:C.mu,marginTop:1}}>{last || "Ej läst"}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function IntranetSkapaNyhet({navigate, onSave}) {
  const [data, setData] = useState({titel:"", text:"", kritisk:false})
  const [saved, setSaved] = useState(false)
  const valid = data.titel.trim() && data.text.trim()
  function save() {
    if (!valid) return
    onSave({titel:data.titel, text:data.text, kritisk:data.kritisk})
    setSaved(true)
  }
  if (saved) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:500,padding:"0 24px",textAlign:"center"}}>
      <div style={{fontSize:52,marginBottom:20}}>📰</div>
      <h2 style={{fontSize:22,fontWeight:600,marginBottom:8}}>Nyhet publicerad!</h2>
      <p style={{color:C.mu,fontSize:14,marginBottom:24}}>Alla anställda kan nu läsa & kvittera</p>
      <button style={{...btnP,maxWidth:280}} onClick={() => navigate("intranet-nyheter")}>Tillbaka till nyheter</button>
    </div>
  )
  return (
    <div>
      <IntranetHdr title="Skapa nyhet" navigate={navigate} back="intranet-nyheter"/>
      <div style={{padding:"16px 20px 24px",display:"flex",flexDirection:"column",gap:14}}>
        <div><label style={lbl}>Rubrik *</label><input style={inp} value={data.titel} onChange={e => setData(d => ({...d, titel:e.target.value}))} placeholder="Kort & tydlig rubrik"/></div>
        <div><label style={lbl}>Innehåll *</label><textarea style={{...inp,height:200,resize:"none"}} value={data.text} onChange={e => setData(d => ({...d, text:e.target.value}))} placeholder="Skriv nyheten här..."/></div>
        <button onClick={() => setData(d => ({...d, kritisk:!d.kritisk}))} style={{display:"flex",alignItems:"center",gap:12,background:data.kritisk?"rgba(224,82,82,.08)":C.bg2,border:`1.5px solid ${data.kritisk?C.da:C.b}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
          <div style={{width:22,height:22,borderRadius:5,border:`2px solid ${data.kritisk?C.da:C.b2}`,background:data.kritisk?C.da:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {data.kritisk && <span style={{fontSize:12,color:"#fff",fontWeight:700,lineHeight:1}}>✓</span>}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:600,color:data.kritisk?C.da:C.tx}}>⚠️ Markera som KRITISK</div>
            <div style={{fontSize:12,color:C.mu,marginTop:2}}>Visas som röd banner på alla anställdas startsida tills kvitterad</div>
          </div>
        </button>
        <div style={{display:"flex",gap:10,marginTop:6}}>
          <button onClick={() => navigate("intranet-nyheter")} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={save} disabled={!valid} style={{...btnP,flex:1,background:data.kritisk?C.da:C.ac}}>Publicera</button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// SÄKERHET — Lista med kategorifilter, detalj med kvittering
// ─────────────────────────────────────────────────────────────────────────
function IntranetSakerhet({user, sakerhet, navigate}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  const [kategori, setKategori] = useState(null)
  const counts = {__all: sakerhet.length}
  SAKERHET_KATEGORIER.forEach(k => { counts[k] = sakerhet.filter(s => s.kategori === k).length })
  const filtered = kategori ? sakerhet.filter(s => s.kategori === kategori) : sakerhet
  return (
    <div>
      <IntranetHdr title="Säkerhet" navigate={navigate}/>
      <div style={{padding:"14px 20px 24px"}}>
        <FilterPills items={SAKERHET_KATEGORIER} selected={kategori} onSelect={setKategori} counts={counts}/>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(s => {
            const okvitt = !isChef && !s.kvittenser[aid]
            const totKvitt = Object.keys(s.kvittenser).length
            return (
              <button key={s.id} onClick={() => navigate("intranet-sakerhet-detalj", s)} style={{display:"block",textAlign:"left",background:C.bg2,border:`1px solid ${okvitt?C.ac:C.b}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,fontSize:11,color:C.mu}}>
                  <span style={{fontWeight:500,color:C.ac}}>{s.kategori}</span>
                  <span>· v{s.version}</span>
                  <span>· {s.uppdaterad}</span>
                  {okvitt && <span style={{marginLeft:"auto",fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(232,184,75,.18)",color:"#b88a00",fontWeight:600,letterSpacing:".3px"}}>⏳ EJ KVITTERAD</span>}
                  {!isChef && s.kvittenser[aid] && <span style={{marginLeft:"auto",fontSize:11,color:C.ok}}>✓ Kvitterad</span>}
                </div>
                <div style={{fontSize:14.5,fontWeight:500,color:C.tx,lineHeight:1.35}}>{s.titel}</div>
                {isChef && <div style={{fontSize:11,color:C.mu,marginTop:6}}>👁 {totKvitt} / {INIT_KONTAKTER.length} kvitterat</div>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function IntranetSakerhetDetalj({user, regel, navigate, onKvittera}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  if (!regel) return <div style={{padding:30,textAlign:"center"}}>Regel hittades inte</div>
  const okvitt = !isChef && !regel.kvittenser[aid]
  const kvittIds = Object.keys(regel.kvittenser)
  return (
    <div>
      <IntranetHdr title="Säkerhetsregel" navigate={navigate} back="intranet-sakerhet"/>
      <div style={{padding:"16px 20px 24px"}}>
        <div style={{fontSize:11,color:C.ac,fontWeight:500,marginBottom:4}}>{regel.kategori} · v{regel.version} · uppdaterad {regel.uppdaterad}</div>
        <h1 style={{fontSize:21,fontWeight:600,marginBottom:14,lineHeight:1.3}}>{regel.titel}</h1>
        <div style={{fontSize:14.5,color:C.tx,lineHeight:1.55,marginBottom:18}}>{regel.beskrivning}</div>
        {regel.media && (
          <a href={regel.media} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",marginBottom:18,textDecoration:"none",color:C.tx}}>
            <span style={{fontSize:20}}>🎬</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,color:C.mu,fontWeight:500}}>SE VIDEO / MER INFO</div>
              <div style={{fontSize:13,color:C.ac,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{regel.media}</div>
            </div>
          </a>
        )}
        {okvitt && <button onClick={() => onKvittera(regel.id)} style={{...btnP,padding:"16px",fontSize:15,marginBottom:14}}>✓ Jag har läst & förstått</button>}
        {!isChef && regel.kvittenser[aid] && <div style={{background:"rgba(46,125,50,.08)",border:"1px solid rgba(46,125,50,.3)",borderRadius:10,padding:"10px 14px",fontSize:13,color:C.ok,marginBottom:14}}>✓ Kvitterad {regel.kvittenser[aid]}</div>}

        {isChef && (
          <div style={card}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:12}}>Kvitterat ({kvittIds.length} / {INIT_KONTAKTER.length})</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {INIT_KONTAKTER.map((k, i) => {
                const kv = regel.kvittenser[k.id]
                return (
                  <div key={k.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<INIT_KONTAKTER.length-1?`1px solid ${C.b}`:"none"}}>
                    <span style={{fontSize:16,width:20}}>{kv ? "✅" : "⏳"}</span>
                    <IniAvatar name={k.name} size={28}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:500}}>{k.name}</div>
                      <div style={{fontSize:11,color:kv?C.ok:C.mu,marginTop:1}}>{kv || "Ej kvitterad"}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// DOKUMENT — Sökbar lista med kategori
// ─────────────────────────────────────────────────────────────────────────
function IntranetDokument({dokument, navigate}) {
  const [sok, setSok] = useState("")
  const [kat, setKat] = useState(null)
  const counts = {__all: dokument.length}
  DOKUMENT_KATEGORIER.forEach(k => { counts[k] = dokument.filter(d => d.kategori === k).length })
  const filtered = dokument.filter(d => (!kat || d.kategori === kat) && (!sok.trim() || d.titel.toLowerCase().includes(sok.toLowerCase())))
  return (
    <div>
      <IntranetHdr title="Dokument" navigate={navigate}/>
      <div style={{padding:"14px 20px 24px"}}>
        <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök dokument..." value={sok} onChange={e => setSok(e.target.value)}/>
        <FilterPills items={DOKUMENT_KATEGORIER} selected={kat} onSelect={setKat} counts={counts}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.length === 0 ? (
            <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga dokument hittades</div>
          ) : filtered.map(d => (
            <div key={d.id} onClick={() => alert(`Öppnar ${d.titel}\n(demo — i live-version hämtas PDF:en från servern)`)} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",cursor:"pointer"}}>
              <div style={{width:38,height:46,background:"rgba(224,82,82,.1)",border:"1px solid rgba(224,82,82,.3)",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.da,flexShrink:0}}>PDF</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13.5,fontWeight:500,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.titel}</div>
                <div style={{fontSize:11,color:C.mu,marginTop:2}}>{d.kategori} · v{d.version} · {d.uppdaterad} · {d.storlek}</div>
              </div>
              <div style={{fontSize:18,color:C.mu,flexShrink:0}}>↓</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// KONTAKTER — Sökbar lista med rollfilter, klick → tel/email
// ─────────────────────────────────────────────────────────────────────────
function IntranetKontakter({navigate}) {
  const [sok, setSok] = useState("")
  const [roll, setRoll] = useState(null)
  const [open, setOpen] = useState(null)
  const counts = {__all: INIT_KONTAKTER.length}
  KONTAKT_ROLLER.forEach(r => { counts[r] = INIT_KONTAKTER.filter(k => k.roll === r).length })
  const filtered = INIT_KONTAKTER.filter(k => (!roll || k.roll === roll) && (!sok.trim() || (k.name + " " + k.roll).toLowerCase().includes(sok.toLowerCase())))
  return (
    <div>
      <IntranetHdr title="Kontakter" navigate={navigate}/>
      <div style={{padding:"14px 20px 24px"}}>
        <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök namn eller roll..." value={sok} onChange={e => setSok(e.target.value)}/>
        <FilterPills items={KONTAKT_ROLLER} selected={roll} onSelect={setRoll} counts={counts}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.length === 0 ? (
            <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga kontakter hittades</div>
          ) : filtered.map(k => (
            <button key={k.id} onClick={() => setOpen(k)} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
              <IniAvatar name={k.name} size={42}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:500,color:C.tx}}>{k.name}</div>
                <div style={{fontSize:12,color:C.mu,marginTop:2}}>{k.roll} · {k.tel}</div>
              </div>
              <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div onClick={() => setOpen(null)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
          <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"24px 20px 28px",maxWidth:430,width:"100%",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
              <IniAvatar name={open.name} size={60}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:18,fontWeight:600}}>{open.name}</div>
                <div style={{fontSize:13,color:C.mu,marginTop:2}}>{open.roll} · {open.foretag}</div>
              </div>
            </div>
            <a href={`tel:${open.tel.replace(/\s/g,"")}`} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(46,125,50,.1)",border:"1px solid rgba(46,125,50,.3)",borderRadius:12,padding:"14px 16px",marginBottom:8,textDecoration:"none",color:C.ok,fontWeight:500}}>
              <span style={{fontSize:22}}>📞</span><div><div style={{fontSize:11,color:C.mu,fontWeight:500}}>RING</div><div style={{fontSize:15}}>{open.tel}</div></div>
            </a>
            <a href={`sms:${open.tel.replace(/\s/g,"")}`} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(91,156,246,.08)",border:"1px solid rgba(91,156,246,.3)",borderRadius:12,padding:"14px 16px",marginBottom:8,textDecoration:"none",color:"#3470cf",fontWeight:500}}>
              <span style={{fontSize:22}}>💬</span><div><div style={{fontSize:11,color:C.mu,fontWeight:500}}>SMS</div><div style={{fontSize:15}}>{open.tel}</div></div>
            </a>
            <a href={`mailto:${open.email}`} style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",marginBottom:14,textDecoration:"none",color:C.tx,fontWeight:500}}>
              <span style={{fontSize:22}}>✉️</span><div style={{minWidth:0,flex:1}}><div style={{fontSize:11,color:C.mu,fontWeight:500}}>E-POST</div><div style={{fontSize:14,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{open.email}</div></div>
            </a>
            <button onClick={() => setOpen(null)} style={btnG}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// MEDDELANDEN — Lista, detalj, skapa (chef)
// ─────────────────────────────────────────────────────────────────────────
function IntranetMeddelanden({user, meddelanden, navigate}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  const minRoll = aid ? (INIT_KONTAKTER.find(x => x.id === aid) || {}).roll : null
  const visa = isChef ? meddelanden : meddelanden.filter(m => {
    if (m.tillTyp === "alla") return true
    if (m.tillTyp === "roll") return m.tillFilter === minRoll
    if (m.tillTyp === "person") return m.tillFilter === aid
    return false
  })
  const sorted = [...visa].sort((a, b) => b.datum.localeCompare(a.datum))
  return (
    <div>
      <IntranetHdr title="Meddelanden" navigate={navigate}
        action={isChef && <button onClick={() => navigate("intranet-skapa-meddelande")} style={{background:C.ac,color:"#fff",border:"none",borderRadius:8,padding:"7px 12px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>+ Nytt</button>}/>
      <div style={{padding:"14px 20px 24px",display:"flex",flexDirection:"column",gap:8}}>
        {sorted.length === 0 ? (
          <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga meddelanden</div>
        ) : sorted.map(m => {
          const olast = !isChef && !m.kvittenser[aid]
          const kvitt = Object.keys(m.kvittenser).length
          return (
            <button key={m.id} onClick={() => navigate("intranet-meddelande-detalj", m)} style={{display:"block",textAlign:"left",background:C.bg2,border:`1px solid ${olast?C.ac:C.b}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit",width:"100%"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,fontSize:11,color:C.mu}}>
                <span style={{fontWeight:500,color:C.ac}}>{m.tillTyp === "alla" ? "📢 Broadcast" : m.tillTyp === "roll" ? `👥 ${m.tillLabel}` : `👤 ${m.tillLabel}`}</span>
                <span>{m.datum.slice(0, 10)}</span>
              </div>
              <div style={{fontSize:13,color:C.tx,lineHeight:1.4,marginBottom:5,fontWeight:olast?500:400,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{m.text}</div>
              <div style={{fontSize:11,color:C.mu,marginTop:6,display:"flex",justifyContent:"space-between"}}>
                <span>{m.fran}</span>
                {isChef && <span>👁 {kvitt} kvittenser</span>}
                {olast && <span style={{color:C.ac,fontWeight:500}}>● Olästa</span>}
                {!isChef && m.kvittenser[aid] && <span style={{color:C.ok}}>✓ Kvitterad</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function IntranetMeddelandeDetalj({user, meddelande, navigate, onKvittera}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  if (!meddelande) return <div style={{padding:30,textAlign:"center"}}>Meddelande hittades inte</div>
  const olast = !isChef && !meddelande.kvittenser[aid]
  // Vilka anställda var mottagare?
  const mottagare = meddelande.tillTyp === "alla" ? INIT_KONTAKTER : meddelande.tillTyp === "roll" ? INIT_KONTAKTER.filter(k => k.roll === meddelande.tillFilter) : INIT_KONTAKTER.filter(k => k.id === meddelande.tillFilter)
  const kvittIds = Object.keys(meddelande.kvittenser)
  return (
    <div>
      <IntranetHdr title="Meddelande" navigate={navigate} back="intranet-meddelanden"/>
      <div style={{padding:"16px 20px 24px"}}>
        <div style={{fontSize:11,color:C.mu,marginBottom:4}}>{meddelande.datum} · från {meddelande.fran}</div>
        <div style={{fontSize:12,color:C.ac,fontWeight:500,marginBottom:14}}>{meddelande.tillTyp === "alla" ? "📢 Till alla anställda" : meddelande.tillTyp === "roll" ? `👥 Till ${meddelande.tillLabel}` : `👤 Till ${meddelande.tillLabel}`}</div>
        <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"16px 18px",fontSize:15,color:C.tx,lineHeight:1.55,marginBottom:18,whiteSpace:"pre-wrap"}}>{meddelande.text}</div>
        {olast && <button onClick={() => onKvittera(meddelande.id)} style={{...btnP,padding:"16px",fontSize:15,marginBottom:14}}>✓ Markera som läst</button>}
        {!isChef && meddelande.kvittenser[aid] && <div style={{background:"rgba(46,125,50,.08)",border:"1px solid rgba(46,125,50,.3)",borderRadius:10,padding:"10px 14px",fontSize:13,color:C.ok,marginBottom:14}}>✓ Kvitterad {meddelande.kvittenser[aid]}</div>}

        {isChef && (
          <div style={card}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:12}}>Kvittenser ({kvittIds.length} / {mottagare.length})</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {mottagare.map((k, i) => {
                const kv = meddelande.kvittenser[k.id]
                return (
                  <div key={k.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<mottagare.length-1?`1px solid ${C.b}`:"none"}}>
                    <span style={{fontSize:16,width:20}}>{kv ? "✅" : "⏳"}</span>
                    <IniAvatar name={k.name} size={28}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:500}}>{k.name}</div>
                      <div style={{fontSize:11,color:kv?C.ok:C.mu,marginTop:1}}>{kv || "Ej kvitterad"}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function IntranetSkapaMeddelande({navigate, onSave}) {
  const [tillTyp, setTillTyp] = useState("alla")
  const [tillFilter, setTillFilter] = useState(null)
  const [text, setText] = useState("")
  const [saved, setSaved] = useState(false)
  const valid = text.trim() && (tillTyp === "alla" || tillFilter)
  function save() {
    if (!valid) return
    let tillLabel = "Alla anställda"
    if (tillTyp === "roll") tillLabel = `Alla ${tillFilter}`
    else if (tillTyp === "person") tillLabel = (INIT_KONTAKTER.find(k => k.id === tillFilter) || {}).name
    onSave({tillTyp, tillFilter: tillTyp === "alla" ? null : tillFilter, tillLabel, text})
    setSaved(true)
  }
  if (saved) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:500,padding:"0 24px",textAlign:"center"}}>
      <div style={{fontSize:52,marginBottom:20}}>📤</div>
      <h2 style={{fontSize:22,fontWeight:600,marginBottom:8}}>Meddelande skickat!</h2>
      <p style={{color:C.mu,fontSize:14,marginBottom:24}}>Notis skickad till mottagarna</p>
      <button style={{...btnP,maxWidth:280}} onClick={() => navigate("intranet-meddelanden")}>Tillbaka</button>
    </div>
  )
  return (
    <div>
      <IntranetHdr title="Nytt meddelande" navigate={navigate} back="intranet-meddelanden"/>
      <div style={{padding:"16px 20px 24px",display:"flex",flexDirection:"column",gap:14}}>
        <div>
          <label style={lbl}>Mottagare</label>
          <div style={{display:"flex",gap:6}}>
            {[{k:"alla",l:"📢 Alla"},{k:"roll",l:"👥 Roll"},{k:"person",l:"👤 Person"}].map(o => {
              const sel = tillTyp === o.k
              return (
                <button key={o.k} onClick={() => { setTillTyp(o.k); setTillFilter(null) }} style={{flex:1,padding:"10px",borderRadius:8,border:`1px solid ${sel?C.ac:C.b}`,background:sel?"rgba(21,101,192,.08)":C.bg2,color:sel?C.ac:C.mu,fontWeight:sel?500:400,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>{o.l}</button>
              )
            })}
          </div>
        </div>
        {tillTyp === "roll" && (
          <div>
            <label style={lbl}>Välj roll *</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {KONTAKT_ROLLER.map(r => {
                const sel = tillFilter === r
                const ant = INIT_KONTAKTER.filter(k => k.roll === r).length
                return (
                  <button key={r} onClick={() => setTillFilter(r)} style={{fontSize:12,padding:"7px 11px",borderRadius:14,border:`1px solid ${sel?C.ac:C.b}`,background:sel?"rgba(21,101,192,.1)":C.bg2,color:sel?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:sel?500:400}}>{r} ({ant})</button>
                )
              })}
            </div>
          </div>
        )}
        {tillTyp === "person" && (
          <div>
            <label style={lbl}>Välj person *</label>
            <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:240,overflowY:"auto"}}>
              {INIT_KONTAKTER.map(k => {
                const sel = tillFilter === k.id
                return (
                  <button key={k.id} onClick={() => setTillFilter(k.id)} style={{display:"flex",alignItems:"center",gap:10,background:sel?"rgba(21,101,192,.08)":C.bg2,border:`1px solid ${sel?C.ac:C.b}`,borderRadius:8,padding:"8px 10px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                    <IniAvatar name={k.name} size={28}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:500}}>{k.name}</div>
                      <div style={{fontSize:11,color:C.mu}}>{k.roll}</div>
                    </div>
                    {sel && <span style={{color:C.ac,fontSize:16}}>✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}
        <div><label style={lbl}>Meddelande *</label><textarea style={{...inp,height:140,resize:"none"}} value={text} onChange={e => setText(e.target.value)} placeholder="Skriv ditt meddelande..."/></div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={() => navigate("intranet-meddelanden")} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={save} disabled={!valid} style={{...btnP,flex:1}}>Skicka</button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// CHECKLISTOR — Daglig per roll. Anställd fyller i, chef ser översikt.
// ─────────────────────────────────────────────────────────────────────────
function IntranetChecklistor({user, checklistor, navigate, onSpara}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  const minRoll = aid ? (INIT_KONTAKTER.find(x => x.id === aid) || {}).roll : null
  const idag = "2026-05-25"

  if (isChef) {
    // Chef: översikt — alla anställda med checklist-status idag
    const klart = checklistor.filter(c => c.datum === idag && c.klar).length
    const totalKlistor = INIT_KONTAKTER.length
    return (
      <div>
        <IntranetHdr title="Checklistor — översikt" navigate={navigate} subtitle={`${klart} av ${totalKlistor} klara idag`}/>
        <div style={{padding:"14px 20px 24px"}}>
          <div style={{background:"rgba(46,125,50,.06)",border:"1px solid rgba(46,125,50,.25)",borderRadius:12,padding:"14px 16px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>STATUS IDAG · {idag}</div>
              <div style={{fontSize:13,fontWeight:600,color:C.ok}}>{klart}/{totalKlistor}</div>
            </div>
            <div style={{height:8,background:C.bg3,borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${(klart/totalKlistor)*100}%`,background:C.ok,transition:"width .3s"}}/>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {INIT_KONTAKTER.map(k => {
              const c = checklistor.find(c => c.anstalldId === k.id && c.datum === idag)
              const ant = (CHECKLIST_MALLAR[k.roll] || []).length
              const klara = c ? Object.values(c.svar).filter(v => v).length : 0
              return (
                <div key={k.id} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${c?.klar?"rgba(46,125,50,.4)":"rgba(224,82,82,.3)"}`,borderRadius:10,padding:"10px 12px"}}>
                  <span style={{fontSize:20}}>{c?.klar ? "🟢" : "🔴"}</span>
                  <IniAvatar name={k.name} size={34}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13.5,fontWeight:500}}>{k.name}</div>
                    <div style={{fontSize:11,color:C.mu,marginTop:1}}>{k.roll} · {klara}/{ant} klart{c?.klarTid && ` · ${c.klarTid}`}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Anställd: dagens checklista för sin roll
  const punkter = minRoll ? (CHECKLIST_MALLAR[minRoll] || []) : []
  const min = checklistor.find(c => c.anstalldId === aid && c.datum === idag)
  const [svar, setSvar] = useState(min?.svar || {})
  function toggle(i) { setSvar(s => ({...s, [i]: !s[i]})) }
  const klara = Object.values(svar).filter(v => v).length
  const klar = klara === punkter.length && punkter.length > 0
  return (
    <div>
      <IntranetHdr title="Dagens checklista" navigate={navigate} subtitle={`${minRoll || "Ingen roll"} · ${klara}/${punkter.length} klart`}/>
      <div style={{padding:"14px 20px 24px"}}>
        {min?.klar && <div style={{background:"rgba(46,125,50,.08)",border:"1px solid rgba(46,125,50,.3)",borderRadius:10,padding:"12px 14px",marginBottom:14,fontSize:13,color:C.ok,fontWeight:500}}>✓ Checklista klar — markerad {min.klarTid}</div>}
        {punkter.length === 0 ? (
          <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Ingen checklista finns för din roll.</div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
            {punkter.map((p, i) => {
              const sel = svar[i]
              return (
                <button key={i} onClick={() => toggle(i)} disabled={min?.klar} style={{display:"flex",alignItems:"center",gap:14,background:sel?"rgba(46,125,50,.06)":C.bg2,border:`1.5px solid ${sel?C.ok:C.b}`,borderRadius:10,padding:"14px 16px",cursor:min?.klar?"default":"pointer",textAlign:"left",fontFamily:"inherit",opacity:min?.klar?.7:1}}>
                  <div style={{width:26,height:26,borderRadius:6,border:`2px solid ${sel?C.ok:C.b2}`,background:sel?C.ok:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {sel && <span style={{fontSize:14,color:"#fff",fontWeight:700,lineHeight:1}}>✓</span>}
                  </div>
                  <span style={{fontSize:14.5,color:C.tx,fontWeight:sel?500:400}}>{p}</span>
                </button>
              )
            })}
          </div>
        )}
        {!min?.klar && punkter.length > 0 && (
          <button onClick={() => onSpara({anstalldId:aid, datum:idag, roll:minRoll, svar, klar})} disabled={!klar} style={{...btnP,padding:"16px",fontSize:15,background:klar?C.ok:"#9aa3b0"}}>
            {klar ? "✓ Skicka in klar checklista" : `Bocka i alla ${punkter.length} punkter`}
          </button>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// UTBILDNING — Kurser med video/pdf, quiz, certifikat
// ─────────────────────────────────────────────────────────────────────────
function IntranetUtbildning({user, kurser, navigate}) {
  const aid = getAnstalldId(user)
  const [kat, setKat] = useState(null)
  const counts = {__all: kurser.length}
  KURS_KATEGORIER.forEach(k => { counts[k] = kurser.filter(c => c.kategori === k).length })
  const filtered = kat ? kurser.filter(k => k.kategori === kat) : kurser
  return (
    <div>
      <IntranetHdr title="Utbildning" navigate={navigate}/>
      <div style={{padding:"14px 20px 24px"}}>
        <FilterPills items={KURS_KATEGORIER} selected={kat} onSelect={setKat} counts={counts}/>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(k => {
            const certifikat = aid && k.certifikat[aid]
            return (
              <button key={k.id} onClick={() => navigate("intranet-kurs-detalj", k)} style={{display:"block",textAlign:"left",background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit",width:"100%"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,fontSize:11,color:C.mu}}>
                  <span style={{fontWeight:500,color:"#a563a8"}}>{k.kategori}</span>
                  <span>· {k.langd}</span>
                  {k.video && <span>· 🎬 Video</span>}
                  {k.pdf && <span>· 📄 PDF</span>}
                  {certifikat && <span style={{marginLeft:"auto",fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(46,125,50,.12)",color:C.ok,fontWeight:600,letterSpacing:".3px"}}>✓ CERTIFIERAD</span>}
                </div>
                <div style={{fontSize:14.5,fontWeight:500,color:C.tx,marginBottom:4,lineHeight:1.35}}>{k.titel}</div>
                <div style={{fontSize:12,color:C.mu,lineHeight:1.4,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{k.beskrivning}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function IntranetKursDetalj({user, kurs, navigate, onCertifiera}) {
  const aid = getAnstalldId(user)
  if (!kurs) return <div style={{padding:30,textAlign:"center"}}>Kurs hittades inte</div>
  const har = aid && kurs.certifikat[aid]
  const [quizOpen, setQuizOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [svar, setSvar] = useState({})
  const [klar, setKlar] = useState(false)

  function startaQuiz() { setQuizOpen(true); setStep(0); setSvar({}); setKlar(false) }
  function valj(altIdx) {
    setSvar(s => ({...s, [step]: altIdx}))
    if (step < kurs.quiz.length - 1) setStep(step + 1)
    else { setKlar(true) }
  }
  const ratta = klar ? kurs.quiz.filter((q, i) => svar[i] === q.ratt).length : 0
  const godkant = klar && ratta === kurs.quiz.length

  function spara() {
    onCertifiera(kurs.id)
    setQuizOpen(false)
  }

  return (
    <div>
      <IntranetHdr title="Utbildning" navigate={navigate} back="intranet-utbildning"/>
      <div style={{padding:"16px 20px 24px"}}>
        <div style={{fontSize:11,color:"#a563a8",fontWeight:500,marginBottom:4}}>{kurs.kategori} · {kurs.langd}</div>
        <h1 style={{fontSize:21,fontWeight:600,marginBottom:14,lineHeight:1.3}}>{kurs.titel}</h1>
        <div style={{fontSize:14.5,color:C.tx,lineHeight:1.55,marginBottom:18}}>{kurs.beskrivning}</div>
        {har && <div style={{background:"rgba(46,125,50,.08)",border:"1px solid rgba(46,125,50,.3)",borderRadius:10,padding:"12px 14px",marginBottom:18,fontSize:13,color:C.ok,fontWeight:500}}>✓ Certifierad sedan {har}</div>}

        {kurs.video && (
          <a href={kurs.video} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",marginBottom:8,textDecoration:"none",color:C.tx}}>
            <span style={{fontSize:22}}>🎬</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,color:C.mu,fontWeight:500}}>SE VIDEO</div>
              <div style={{fontSize:13,color:C.ac,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{kurs.video}</div>
            </div>
          </a>
        )}
        {kurs.pdf && (
          <a href={kurs.pdf} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",marginBottom:18,textDecoration:"none",color:C.tx}}>
            <span style={{fontSize:22}}>📄</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,color:C.mu,fontWeight:500}}>LADDA NER PDF</div>
              <div style={{fontSize:13,color:C.ac,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{kurs.pdf}</div>
            </div>
          </a>
        )}
        {!har && aid && (
          <button onClick={startaQuiz} style={{...btnP,padding:"16px",fontSize:15,background:"#a563a8",marginTop:8}}>🎯 Starta quiz ({kurs.quiz.length} frågor)</button>
        )}
      </div>

      {/* Quiz-modal */}
      {quizOpen && (
        <div style={{position:"fixed",inset:0,background:"rgba(13,31,53,.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
          <div style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 28px",maxWidth:430,width:"100%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
            {!klar ? (
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500}}>FRÅGA {step + 1} AV {kurs.quiz.length}</div>
                  <button onClick={() => setQuizOpen(false)} style={{background:"none",border:"none",cursor:"pointer",color:C.mu,fontSize:20}}>✕</button>
                </div>
                <div style={{height:4,background:C.bg3,borderRadius:2,overflow:"hidden",marginBottom:18}}>
                  <div style={{height:"100%",width:`${((step+1)/kurs.quiz.length)*100}%`,background:"#a563a8",transition:"width .3s"}}/>
                </div>
                <h2 style={{fontSize:18,fontWeight:600,marginBottom:18,lineHeight:1.35}}>{kurs.quiz[step].q}</h2>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {kurs.quiz[step].alts.map((a, i) => (
                    <button key={i} onClick={() => valj(i)} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1.5px solid ${C.b}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",fontSize:14}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:C.bg3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,color:C.mu,flexShrink:0}}>{String.fromCharCode(65+i)}</div>
                      <span style={{color:C.tx}}>{a}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:52,marginBottom:14}}>{godkant ? "🎓" : "🔁"}</div>
                <h2 style={{fontSize:22,fontWeight:600,marginBottom:6}}>{godkant ? "Godkänt!" : "Försök igen"}</h2>
                <p style={{color:C.mu,fontSize:14,marginBottom:8}}>{ratta} av {kurs.quiz.length} rätt</p>
                {godkant && <p style={{color:C.ok,fontSize:13,marginBottom:22,fontWeight:500}}>Certifikat sparas på din profil</p>}
                {!godkant && <p style={{color:C.mu,fontSize:13,marginBottom:22}}>Alla frågor måste vara rätt för certifikat</p>}
                <div style={{display:"flex",gap:10}}>
                  <button onClick={() => setQuizOpen(false)} style={{...btnG,flex:1}}>{godkant ? "Stäng" : "Avbryt"}</button>
                  {godkant ? (
                    <button onClick={spara} style={{...btnP,flex:1,background:C.ok}}>✓ Spara certifikat</button>
                  ) : (
                    <button onClick={startaQuiz} style={{...btnP,flex:1,background:"#a563a8"}}>Försök igen</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
// DOKUMENTNAV — Komplett dokumentsystem. Hem + 6 kategorier + detaljer.
// Smart utgångsvarningar, behörighetsstyrt, dela via länk.
// ═══════════════════════════════════════════════════════════════════════

// — Hjälpare —
function dagarTillUtgang(datumStr) {
  if (!datumStr) return null
  const [y, m, d] = datumStr.split("-").map(Number)
  const target = new Date(y, m - 1, d).getTime()
  const idag = new Date(2026, 4, 25).getTime() // demo-datum
  return Math.floor((target - idag) / 86400000)
}
function utgangStatus(datumStr) {
  const d = dagarTillUtgang(datumStr)
  if (d === null) return "noexpiry"
  if (d < 0) return "expired"
  if (d <= 30) return "warning"
  return "ok"
}
// Liten färgad badge för utgångsstatus
function GiltighetBadge({datumStr, kompakt = false}) {
  if (!datumStr) return null
  const dagar = dagarTillUtgang(datumStr)
  const status = utgangStatus(datumStr)
  if (status === "noexpiry") return null
  if (status === "expired") return <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(224,82,82,.16)",color:C.da,fontWeight:600,letterSpacing:".3px",whiteSpace:"nowrap"}}>⛔ UTGÅNGEN ({Math.abs(dagar)}d)</span>
  if (status === "warning") return <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(232,184,75,.18)",color:"#b88a00",fontWeight:600,letterSpacing:".3px",whiteSpace:"nowrap"}}>⚠ GÅR UT OM {dagar}D</span>
  if (kompakt) return null
  return <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(46,125,50,.1)",color:C.ok,fontWeight:500,whiteSpace:"nowrap"}}>✓ Giltig</span>
}
// Generisk dokumentrad (typ-färgad markör + titel + meta + chevron)
function DokRad({dok, typLabel, datum, extra, onClick, giltigTill}) {
  return (
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
      <div style={{width:38,height:46,background:"rgba(224,82,82,.08)",border:"1px solid rgba(224,82,82,.25)",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.da,flexShrink:0,letterSpacing:".3px"}}>PDF</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
          {typLabel && <span style={{fontSize:10.5,padding:"1px 6px",borderRadius:6,background:"rgba(21,101,192,.08)",color:C.ac,fontWeight:500,letterSpacing:".3px"}}>{typLabel}</span>}
          {giltigTill && <GiltighetBadge datumStr={giltigTill}/>}
        </div>
        <div style={{fontSize:13.5,fontWeight:500,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{dok.titel}</div>
        <div style={{fontSize:11,color:C.mu,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{datum}{extra && ` · ${extra}`}{dok.storlek && ` · ${dok.storlek}`}{dok.version && ` · v${dok.version}`}</div>
      </div>
      <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
    </button>
  )
}
function DnHdr({title, navigate, back = "dokumentnav-hem", subtitle, action}) {
  return (
    <div style={hdr}>
      <button onClick={() => navigate(back)} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
      <div style={{minWidth:0,flex:1}}>
        <div style={{fontWeight:600,fontSize:15}}>{title}</div>
        {subtitle && <div style={{fontSize:11,color:C.mu,marginTop:1}}>{subtitle}</div>}
      </div>
      {action}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// DokumentnavHem — Sökfält, varningar, senast uppdaterade, 6 kategori-kort
// ─────────────────────────────────────────────────────────────────────────
function DokumentnavHem({user, navigate, anstalldDokument, fordon, fordonDokument, projektDokument, hmsDokument, foretagDokument, dokument, projekt, avvikelser}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  const [sok, setSok] = useState("")

  // Alla dokument normaliserade som en lista för sök
  const allaDokument = [
    ...anstalldDokument.map(d => ({...d, _kategori:"anstallda", _datum:d.utfardatDatum, _person:(INIT_KONTAKTER.find(k=>k.id===d.anstalldId)||{}).name, _giltig:d.giltigTill})),
    ...fordonDokument.map(d => ({...d, _kategori:"fordon", _datum:d.utfardatDatum, _person:(INIT_FORDON.find(f=>f.id===d.fordonId)||{}).modell, _giltig:d.giltigTill})),
    ...projektDokument.map(d => ({...d, _kategori:"projekt", _datum:d.uppdaterad, _person:(projekt.find(p=>p.id===d.projektId)||{}).namn})),
    ...hmsDokument.map(d => ({...d, _kategori:"hms", _datum:d.datum, _person:d.forfattare})),
    ...foretagDokument.map(d => ({...d, _kategori:"foretag", _datum:d.uppdaterad})),
    ...dokument.filter(d => d.kategori === "Mallar").map(d => ({...d, _kategori:"mallar", _datum:d.uppdaterad})),
  ]

  // Behörighetsfilter: arbetare ser bara egna + projekt de är bokade på
  function filtreraTillgangligt(items) {
    if (isChef) return items
    if (!aid) return items
    return items.filter(it => {
      if (it._kategori === "anstallda") return it.anstalldId === aid
      if (it._kategori === "fordon")    return (INIT_FORDON.find(f => f.id === it.fordonId)||{}).ansvarigId === aid
      return true // projekt/hms/mallar/foretag — alla får se
    })
  }

  // Senaste uppdaterade
  const senaste = filtreraTillgangligt(allaDokument).sort((a, b) => (b._datum || "").localeCompare(a._datum || "")).slice(0, 5)

  // Sökresultat
  const sokQ = sok.trim().toLowerCase()
  const sokResultat = sokQ.length > 1 ? filtreraTillgangligt(allaDokument).filter(d =>
    d.titel.toLowerCase().includes(sokQ) ||
    (d.typ && d.typ.toLowerCase().includes(sokQ)) ||
    (d._person && d._person.toLowerCase().includes(sokQ))
  ).slice(0, 12) : null

  // Utgående/utgångna dokument — varningar för chef
  const varningar = isChef ? [
    ...anstalldDokument.filter(d => d.giltigTill && ["warning","expired"].includes(utgangStatus(d.giltigTill))).map(d => ({...d, _typ:"anstalld"})),
    ...fordonDokument.filter(d => d.giltigTill && ["warning","expired"].includes(utgangStatus(d.giltigTill))).map(d => ({...d, _typ:"fordon"})),
  ] : (aid ? [
    ...anstalldDokument.filter(d => d.anstalldId === aid && d.giltigTill && ["warning","expired"].includes(utgangStatus(d.giltigTill))).map(d => ({...d, _typ:"anstalld"})),
  ] : [])

  // Snabbfilter-pills
  const filtrar = [
    {id:"dokumentnav-anstallda", e:"🎓", l:"Certifikat"},
    {id:"dokumentnav-projekt",   e:"🏗", l:"Projekt"},
    {id:"dokumentnav-fordon",    e:"🚜", l:"Fordon"},
    {id:"dokumentnav-hms",       e:"🦺", l:"HMS"},
    {id:"dokumentnav-mallar",    e:"📋", l:"Mallar"},
  ]

  const kategorier = [
    {id:"dokumentnav-anstallda", e:"🎓", l:"Anställda",     desc:"Certifikat & kompetens",   count: isChef ? anstalldDokument.length : anstalldDokument.filter(d => d.anstalldId === aid).length, bg:"rgba(91,156,246,.08)"},
    {id:"dokumentnav-projekt",   e:"🏗", l:"Projekt",       desc:"Arbetsorder, ritning",     count: projektDokument.length, bg:"rgba(21,101,192,.08)"},
    {id:"dokumentnav-fordon",    e:"🚜", l:"Fordon & maskiner", desc:"Besiktning, service",  count: fordonDokument.length, bg:"rgba(232,184,75,.1)"},
    {id:"dokumentnav-hms",       e:"🦺", l:"HMS",           desc:"Risk, incident, skyddsrond", count: hmsDokument.length + avvikelser.length, bg:"rgba(224,82,82,.06)"},
    {id:"dokumentnav-mallar",    e:"📋", l:"Mallar",        desc:"Standard-mallar",          count: dokument.filter(d => d.kategori === "Mallar").length, bg:"rgba(165,99,168,.08)"},
    {id:"dokumentnav-foretag",   e:"🏛", l:"Företag",       desc:"Avtal, försäkring, policy", count: foretagDokument.length, bg:"rgba(46,125,50,.08)"},
  ]

  return (
    <div>
      <div style={{padding:"18px 20px 4px"}}>
        <div style={{fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,textTransform:"uppercase"}}>📁 Dokumentnav · alla dokument samlade</div>
        <div style={{fontSize:22,fontWeight:600,marginTop:4}}>Hitta vad du behöver</div>
        <div style={{fontSize:12,color:C.mu,marginTop:2}}>{isChef ? `${allaDokument.length} dokument · ${varningar.length} varningar` : `Tillgängliga för dig`}</div>
      </div>

      <div style={{padding:"12px 20px 0"}}>
        <input value={sok} onChange={e => setSok(e.target.value)} placeholder="🔍 Sök namn, projekt, person, typ..." style={{...inp,marginBottom:14}}/>

        {!sokResultat && (
          <div style={{display:"flex",gap:6,marginBottom:18,overflowX:"auto",paddingBottom:2}}>
            {filtrar.map(f => (
              <button key={f.id} onClick={() => navigate(f.id)} style={{flex:"0 0 auto",display:"flex",alignItems:"center",gap:5,fontSize:12,padding:"7px 11px",borderRadius:14,border:`1px solid ${C.b}`,background:C.bg2,color:C.tx,cursor:"pointer",fontFamily:"inherit",fontWeight:500,whiteSpace:"nowrap"}}>{f.e} {f.l}</button>
            ))}
          </div>
        )}

        {/* SÖKRESULTAT */}
        {sokResultat && (
          <div style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:10}}>{sokResultat.length} träffar för "{sok}"</div>
            {sokResultat.length === 0 ? (
              <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga dokument matchade</div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {sokResultat.map(d => (
                  <DokRad key={d.id+"-"+d._kategori} dok={d} typLabel={d.typ || d.kategori} datum={d._datum} extra={d._person} giltigTill={d._giltig} onClick={() => navigate("dokumentnav-detalj", d)}/>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VARNINGAR */}
        {!sokResultat && varningar.length > 0 && (
          <div style={{marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase"}}>⚠️ Varningar ({varningar.length})</div>
              {varningar.length > 3 && <button onClick={() => navigate(isChef ? "dokumentnav-anstallda" : "dokumentnav-anstallda")} style={{background:"none",border:"none",fontSize:12,color:C.ac,cursor:"pointer",fontFamily:"inherit"}}>Se alla ›</button>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {varningar.slice(0, 3).map(v => {
                const expired = utgangStatus(v.giltigTill) === "expired"
                const namn = v._typ === "anstalld" ? (INIT_KONTAKTER.find(k => k.id === v.anstalldId)||{}).name : (INIT_FORDON.find(f => f.id === v.fordonId)||{}).modell
                return (
                  <button key={v.id} onClick={() => navigate("dokumentnav-detalj", {...v, _kategori:v._typ==="anstalld"?"anstallda":"fordon",_person:namn,_giltig:v.giltigTill,_datum:v.utfardatDatum})} style={{display:"flex",alignItems:"center",gap:12,background:expired?"rgba(224,82,82,.06)":"rgba(232,184,75,.06)",border:`1px solid ${expired?"rgba(224,82,82,.35)":"rgba(232,184,75,.4)"}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                    <div style={{fontSize:24}}>{expired ? "⛔" : "⚠️"}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.titel}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>{namn} · giltigt till {v.giltigTill}</div>
                    </div>
                    <GiltighetBadge datumStr={v.giltigTill}/>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* SENAST UPPDATERADE */}
        {!sokResultat && (
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:10}}>Senast uppdaterade</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {senaste.map(d => (
                <DokRad key={d.id+"-"+d._kategori} dok={d} typLabel={d.typ || d.kategori} datum={d._datum} extra={d._person} giltigTill={d._giltig} onClick={() => navigate("dokumentnav-detalj", d)}/>
              ))}
            </div>
          </div>
        )}

        {/* 6 KATEGORIER */}
        {!sokResultat && (
          <div style={{paddingBottom:24}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:10}}>Kategorier</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {kategorier.map(k => (
                <button key={k.id} onClick={() => navigate(k.id)} style={{display:"flex",alignItems:"center",gap:14,background:k.bg,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                  <div style={{fontSize:32,lineHeight:1,flexShrink:0}}>{k.e}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:15,fontWeight:600,color:C.tx}}>{k.l}</div>
                    <div style={{fontSize:12,color:C.mu,marginTop:2}}>{k.desc}</div>
                  </div>
                  <div style={{fontSize:13,color:C.mu,fontWeight:500,flexShrink:0}}>{k.count} ›</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// ANSTÄLLDA — Lista personer med deras certifikat-räkning + varningar
// ─────────────────────────────────────────────────────────────────────────
function DokumentnavAnstallda({user, anstalldDokument, navigate}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  const [sok, setSok] = useState("")
  const visa = isChef ? INIT_KONTAKTER : INIT_KONTAKTER.filter(k => k.id === aid)
  const filtered = visa.filter(k => !sok.trim() || (k.name + " " + k.roll).toLowerCase().includes(sok.toLowerCase()))
  return (
    <div>
      <DnHdr title="Anställda" navigate={navigate} subtitle="Certifikat, kompetensbevis, HMS-kort"/>
      <div style={{padding:"14px 20px 24px"}}>
        {isChef && <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök namn eller roll..." value={sok} onChange={e => setSok(e.target.value)}/>}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.map(k => {
            const mina = anstalldDokument.filter(d => d.anstalldId === k.id)
            const varning = mina.filter(d => d.giltigTill && ["warning","expired"].includes(utgangStatus(d.giltigTill))).length
            return (
              <button key={k.id} onClick={() => navigate("dokumentnav-anstalld-detalj", k)} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${varning>0?"rgba(232,184,75,.4)":C.b}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                <IniAvatar name={k.name} size={42}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:500}}>{k.name}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:2}}>{k.roll} · {mina.length} dokument</div>
                </div>
                {varning > 0 && <span style={{fontSize:10.5,padding:"3px 8px",borderRadius:10,background:"rgba(232,184,75,.18)",color:"#b88a00",fontWeight:600,letterSpacing:".3px",whiteSpace:"nowrap"}}>⚠ {varning}</span>}
                <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DokumentnavAnstalldDetalj({anstalld, anstalldDokument, navigate}) {
  if (!anstalld) return <div style={{padding:30,textAlign:"center"}}>Person hittades inte</div>
  const mina = anstalldDokument.filter(d => d.anstalldId === anstalld.id)
  const grupperat = {}
  mina.forEach(d => { (grupperat[d.typ] = grupperat[d.typ] || []).push(d) })
  return (
    <div>
      <DnHdr title="Anställd" navigate={navigate} back="dokumentnav-anstallda"/>
      <div style={{padding:"18px 20px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
          <IniAvatar name={anstalld.name} size={56}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:18,fontWeight:600}}>{anstalld.name}</div>
            <div style={{fontSize:13,color:C.mu,marginTop:2}}>{anstalld.roll} · {anstalld.foretag}</div>
          </div>
        </div>
        {mina.length === 0 ? (
          <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga dokument finns ännu</div>
        ) : Object.entries(grupperat).map(([typ, docs]) => (
          <div key={typ} style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:8}}>{typ} ({docs.length})</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {docs.map(d => (
                <DokRad key={d.id} dok={d} typLabel={null} datum={`Utf. ${d.utfardatDatum}`} extra={d.utfardatAv} giltigTill={d.giltigTill} onClick={() => navigate("dokumentnav-detalj", {...d, _kategori:"anstallda", _person:anstalld.name, _giltig:d.giltigTill, _datum:d.utfardatDatum})}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// PROJEKT — Lista projekt, klick → dokumentlista per projekt
// ─────────────────────────────────────────────────────────────────────────
function DokumentnavProjekt({projekt, projektDokument, navigate}) {
  const [sok, setSok] = useState("")
  const filtered = projekt.filter(p => !sok.trim() || (p.namn + " " + (p.plats||"")).toLowerCase().includes(sok.toLowerCase()))
  return (
    <div>
      <DnHdr title="Projekt" navigate={navigate} subtitle="Arbetsorder, ritningar, tillstånd"/>
      <div style={{padding:"14px 20px 24px"}}>
        <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök projekt..." value={sok} onChange={e => setSok(e.target.value)}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.map(p => {
            const docs = projektDokument.filter(d => d.projektId === p.id)
            const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
            return (
              <button key={p.id} onClick={() => navigate("dokumentnav-projekt-detalj", p)} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                <div style={{width:6,height:46,borderRadius:3,background:c.text,flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:500,color:c.text}}>{p.namn}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:2}}>{p.plats} · {docs.length} dokument</div>
                </div>
                <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DokumentnavProjektDetalj({projekt, projektDokument, navigate}) {
  if (!projekt) return <div style={{padding:30,textAlign:"center"}}>Projekt hittades inte</div>
  const docs = projektDokument.filter(d => d.projektId === projekt.id)
  const grupperat = {}
  docs.forEach(d => { (grupperat[d.typ] = grupperat[d.typ] || []).push(d) })
  const c = PROJECT_PALETTE[projekt.farg % PROJECT_PALETTE.length]
  return (
    <div>
      <DnHdr title="Projektdokument" navigate={navigate} back="dokumentnav-projekt"/>
      <div style={{padding:"18px 20px 24px"}}>
        <div style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:12,padding:"14px 16px",marginBottom:18}}>
          <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>PROJEKT</div>
          <div style={{fontSize:17,fontWeight:600,color:c.text,marginTop:2}}>{projekt.namn}</div>
          <div style={{fontSize:12,color:C.mu,marginTop:2}}>📍 {projekt.plats} · {docs.length} dokument</div>
        </div>
        {docs.length === 0 ? (
          <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga dokument finns för projektet ännu</div>
        ) : Object.entries(grupperat).map(([typ, ds]) => (
          <div key={typ} style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:8}}>{typ} ({ds.length})</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {ds.map(d => (
                <DokRad key={d.id} dok={d} typLabel={null} datum={`Uppd. ${d.uppdaterad}`} onClick={() => navigate("dokumentnav-detalj", {...d, _kategori:"projekt", _person:projekt.namn, _datum:d.uppdaterad})}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// FORDON & MASKINER — Lista fordon, klick → dokumentlista per fordon
// ─────────────────────────────────────────────────────────────────────────
function DokumentnavFordon({fordon, fordonDokument, navigate}) {
  const [sok, setSok] = useState("")
  const filtered = fordon.filter(f => !sok.trim() || (f.modell + " " + f.regnr + " " + f.typ).toLowerCase().includes(sok.toLowerCase()))
  return (
    <div>
      <DnHdr title="Fordon & maskiner" navigate={navigate} subtitle="Besiktning, service, förarbevis"/>
      <div style={{padding:"14px 20px 24px"}}>
        <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök modell, regnr, typ..." value={sok} onChange={e => setSok(e.target.value)}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.map(f => {
            const docs = fordonDokument.filter(d => d.fordonId === f.id)
            const varning = docs.filter(d => d.giltigTill && ["warning","expired"].includes(utgangStatus(d.giltigTill))).length
            const ansvarig = (INIT_KONTAKTER.find(k => k.id === f.ansvarigId)||{}).name
            return (
              <button key={f.id} onClick={() => navigate("dokumentnav-fordon-detalj", f)} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${varning>0?"rgba(232,184,75,.4)":C.b}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                <div style={{width:42,height:42,borderRadius:"50%",background:"rgba(232,184,75,.16)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{f.typ === "Lastbil" || f.typ === "Servicebil" ? "🚛" : f.typ === "Grävmaskin" ? "🚜" : f.typ === "Rälsklipp" || f.typ === "Spårtramp" ? "🚂" : "🔧"}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:500}}>{f.modell}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:2}}>{f.typ} · {f.regnr} · {ansvarig || "—"}</div>
                </div>
                {varning > 0 && <span style={{fontSize:10.5,padding:"3px 8px",borderRadius:10,background:"rgba(232,184,75,.18)",color:"#b88a00",fontWeight:600,letterSpacing:".3px",whiteSpace:"nowrap"}}>⚠ {varning}</span>}
                <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DokumentnavFordonDetalj({fordon, fordonDokument, anstalldDokument, navigate}) {
  if (!fordon) return <div style={{padding:30,textAlign:"center"}}>Fordon hittades inte</div>
  const docs = fordonDokument.filter(d => d.fordonId === fordon.id)
  const ansvarig = INIT_KONTAKTER.find(k => k.id === fordon.ansvarigId)
  // Förarbevis från ansvarig
  const forarbevis = anstalldDokument.filter(d => d.anstalldId === fordon.ansvarigId && d.typ === "Förarbevis")
  return (
    <div>
      <DnHdr title="Fordonsdokument" navigate={navigate} back="dokumentnav-fordon"/>
      <div style={{padding:"18px 20px 24px"}}>
        <div style={{background:"rgba(232,184,75,.06)",border:"1px solid rgba(232,184,75,.3)",borderRadius:12,padding:"14px 16px",marginBottom:18}}>
          <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>{fordon.typ}</div>
          <div style={{fontSize:17,fontWeight:600,marginTop:2}}>{fordon.modell}</div>
          <div style={{fontSize:12,color:C.mu,marginTop:2}}>{fordon.regnr} · Årsmodell {fordon.arsmodell}{ansvarig && ` · Ansvarig: ${ansvarig.name}`}</div>
        </div>
        {docs.length === 0 ? (
          <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga dokument finns ännu</div>
        ) : (
          <div style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:8}}>Fordonsdokument ({docs.length})</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {docs.map(d => (
                <DokRad key={d.id} dok={d} typLabel={d.typ} datum={`Utf. ${d.utfardatDatum}`} extra={d.utfardatAv} giltigTill={d.giltigTill} onClick={() => navigate("dokumentnav-detalj", {...d, _kategori:"fordon", _person:fordon.modell, _giltig:d.giltigTill, _datum:d.utfardatDatum})}/>
              ))}
            </div>
          </div>
        )}
        {forarbevis.length > 0 && (
          <div>
            <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,textTransform:"uppercase",marginBottom:8}}>Förarbevis ({forarbevis.length})</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {forarbevis.map(d => (
                <DokRad key={d.id} dok={d} typLabel={d.typ} datum={`Utf. ${d.utfardatDatum}`} extra={d.utfardatAv} giltigTill={d.giltigTill} onClick={() => navigate("dokumentnav-detalj", {...d, _kategori:"anstallda", _person:ansvarig?.name, _giltig:d.giltigTill, _datum:d.utfardatDatum})}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// HMS — Riskbedömningar, incidentrapporter (från avvikelser), skyddsronder
// ─────────────────────────────────────────────────────────────────────────
function DokumentnavHMS({hmsDokument, avvikelser, projekt, navigate}) {
  const [typ, setTyp] = useState(null)
  const counts = {__all: hmsDokument.length + avvikelser.length}
  HMS_TYPER.forEach(t => { counts[t] = (t === "Incidentrapport" ? avvikelser.length : hmsDokument.filter(d => d.typ === t).length) })
  // Avvikelser visas som incidentrapporter
  const incidentRader = avvikelser.map(a => ({
    id: a.id, typ:"Incidentrapport", titel: a.beskrivning?.slice(0, 60) || `Avvikelse ${a.id}`, datum: a.datum, forfattare: a.rapporterad || "—",
    projektId: null, version:"1.0", filtyp:"pdf", storlek:"—", _avvikelse: true,
  }))
  const allaItems = [...hmsDokument, ...incidentRader]
  const visa = typ ? allaItems.filter(d => d.typ === typ) : allaItems
  const sorted = [...visa].sort((a, b) => (b.datum || "").localeCompare(a.datum || ""))
  return (
    <div>
      <DnHdr title="HMS" navigate={navigate} subtitle="Risk, incident, skyddsrond, handlingsplan"/>
      <div style={{padding:"14px 20px 24px"}}>
        <FilterPills items={HMS_TYPER} selected={typ} onSelect={setTyp} counts={counts}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {sorted.length === 0 ? (
            <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga dokument</div>
          ) : sorted.map(d => {
            const proj = d.projektId ? projekt.find(p => p.id === d.projektId) : null
            return (
              <button key={d.id+"-"+d.typ} onClick={() => navigate("dokumentnav-detalj", {...d, _kategori:"hms", _person:d.forfattare, _datum:d.datum})} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                <div style={{width:38,height:46,background:d.typ==="Incidentrapport"?"rgba(224,82,82,.08)":"rgba(232,184,75,.08)",border:`1px solid ${d.typ==="Incidentrapport"?"rgba(224,82,82,.25)":"rgba(232,184,75,.25)"}`,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{d.typ === "Riskbedömning" ? "🛡" : d.typ === "Incidentrapport" ? "🚨" : d.typ === "Skyddsrond" ? "👀" : "📝"}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
                    <span style={{fontSize:10.5,padding:"1px 6px",borderRadius:6,background:d.typ==="Incidentrapport"?"rgba(224,82,82,.1)":"rgba(21,101,192,.08)",color:d.typ==="Incidentrapport"?C.da:C.ac,fontWeight:500,letterSpacing:".3px"}}>{d.typ}</span>
                    {d._avvikelse && <span style={{fontSize:10,color:C.mu,fontStyle:"italic"}}>· från Avvikelser</span>}
                  </div>
                  <div style={{fontSize:13.5,fontWeight:500,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.titel}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:2}}>{d.datum} · {d.forfattare}{proj && ` · ${proj.namn}`}</div>
                </div>
                <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// MALLAR — Återanvänder Mallar-kategorin från befintliga INIT_DOKUMENT
// ─────────────────────────────────────────────────────────────────────────
function DokumentnavMallar({dokument, navigate}) {
  const [sok, setSok] = useState("")
  const mallar = dokument.filter(d => d.kategori === "Mallar")
  const filtered = mallar.filter(d => !sok.trim() || d.titel.toLowerCase().includes(sok.toLowerCase()))
  return (
    <div>
      <DnHdr title="Mallar" navigate={navigate} subtitle="Standardmallar att ladda ner"/>
      <div style={{padding:"14px 20px 24px"}}>
        <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök mall..." value={sok} onChange={e => setSok(e.target.value)}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.length === 0 ? (
            <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga mallar matchade</div>
          ) : filtered.map(d => (
            <DokRad key={d.id} dok={d} typLabel="Mall" datum={`Uppd. ${d.uppdaterad}`} onClick={() => navigate("dokumentnav-detalj", {...d, _kategori:"mallar", _datum:d.uppdaterad})}/>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// FÖRETAG — Företagsavtal, försäkringar, policies, org-schema
// ─────────────────────────────────────────────────────────────────────────
function DokumentnavForetag({foretagDokument, navigate}) {
  const [typ, setTyp] = useState(null)
  const counts = {__all: foretagDokument.length}
  FORETAG_DOK_TYPER.forEach(t => { counts[t] = foretagDokument.filter(d => d.typ === t).length })
  const filtered = typ ? foretagDokument.filter(d => d.typ === typ) : foretagDokument
  return (
    <div>
      <DnHdr title="Företag" navigate={navigate} subtitle="Avtal, försäkring, policy"/>
      <div style={{padding:"14px 20px 24px"}}>
        <FilterPills items={FORETAG_DOK_TYPER} selected={typ} onSelect={setTyp} counts={counts}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.map(d => (
            <DokRad key={d.id} dok={d} typLabel={d.typ} datum={`Uppd. ${d.uppdaterad}`} onClick={() => navigate("dokumentnav-detalj", {...d, _kategori:"foretag", _datum:d.uppdaterad})}/>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// DETALJ — Generisk detaljvy för valfritt dokument med dela-funktion
// ─────────────────────────────────────────────────────────────────────────
function DokumentnavDetalj({dok, navigate}) {
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  if (!dok) return <div style={{padding:30,textAlign:"center"}}>Dokument hittades inte</div>
  const utgang = dok._giltig ? utgangStatus(dok._giltig) : null
  // Genererad dela-länk
  const link = `https://rallar.app/dok/${dok._kategori || "fil"}/${dok.id}`
  function kopiera() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(link).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  // Smart "tillbaka" baserat på kategori
  const back = dok._kategori === "anstallda" ? "dokumentnav-anstallda"
             : dok._kategori === "fordon"    ? "dokumentnav-fordon"
             : dok._kategori === "projekt"   ? "dokumentnav-projekt"
             : dok._kategori === "hms"       ? "dokumentnav-hms"
             : dok._kategori === "mallar"    ? "dokumentnav-mallar"
             : dok._kategori === "foretag"   ? "dokumentnav-foretag"
             : "dokumentnav-hem"
  return (
    <div>
      <DnHdr title="Dokument" navigate={navigate} back={back}/>
      <div style={{padding:"18px 20px 24px"}}>
        {/* Banner för utgångsläge */}
        {utgang === "expired" && (
          <div style={{background:"rgba(224,82,82,.08)",border:"1.5px solid rgba(224,82,82,.5)",borderRadius:12,padding:"12px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>⛔</span>
            <div><div style={{fontSize:11,color:C.da,fontWeight:700,letterSpacing:".3px"}}>UTGÅNGEN</div><div style={{fontSize:13,color:C.tx,marginTop:2}}>Gick ut {dok._giltig} ({Math.abs(dagarTillUtgang(dok._giltig))} dagar sedan)</div></div>
          </div>
        )}
        {utgang === "warning" && (
          <div style={{background:"rgba(232,184,75,.08)",border:"1.5px solid rgba(232,184,75,.5)",borderRadius:12,padding:"12px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>⚠️</span>
            <div><div style={{fontSize:11,color:"#b88a00",fontWeight:700,letterSpacing:".3px"}}>GÅR UT SNART</div><div style={{fontSize:13,color:C.tx,marginTop:2}}>Giltigt till {dok._giltig} ({dagarTillUtgang(dok._giltig)} dagar kvar)</div></div>
          </div>
        )}

        {/* PDF-preview placeholder */}
        <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"36px 20px",marginBottom:18,textAlign:"center"}}>
          <div style={{width:80,height:100,margin:"0 auto 14px",background:"rgba(224,82,82,.06)",border:"1px solid rgba(224,82,82,.25)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:C.da,letterSpacing:".5px"}}>PDF</div>
          <div style={{fontSize:11,color:C.mu,letterSpacing:".3px"}}>{(dok.filtyp || "PDF").toUpperCase()}{dok.storlek && ` · ${dok.storlek}`}</div>
        </div>

        {/* Titel + meta */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,flexWrap:"wrap"}}>
          {dok.typ && <span style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:"rgba(21,101,192,.08)",color:C.ac,fontWeight:500,letterSpacing:".3px"}}>{dok.typ}</span>}
          {dok._giltig && <GiltighetBadge datumStr={dok._giltig}/>}
        </div>
        <h1 style={{fontSize:20,fontWeight:600,marginBottom:14,lineHeight:1.3}}>{dok.titel}</h1>

        {/* Info-rader */}
        <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",marginBottom:18,display:"flex",flexDirection:"column",gap:10}}>
          {dok._person && <Rad label={dok._kategori==="anstallda"?"Person":dok._kategori==="fordon"?"Fordon":dok._kategori==="projekt"?"Projekt":"Författare"} v={dok._person}/>}
          {dok.utfardatAv && <Rad label="Utfärdat av" v={dok.utfardatAv}/>}
          {dok.utfardatDatum && <Rad label="Utfärdat" v={dok.utfardatDatum}/>}
          {dok.uppdaterad && <Rad label="Uppdaterad" v={dok.uppdaterad}/>}
          {dok._giltig && <Rad label="Giltigt till" v={dok._giltig}/>}
          {dok.version && <Rad label="Version" v={dok.version}/>}
          {dok.forfattare && !dok._person && <Rad label="Författare" v={dok.forfattare}/>}
        </div>

        {/* Actions */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <button onClick={() => alert(`Laddar ner ${dok.titel}\n(demo — i live-versionen hämtas PDF:en från servern)`)} style={{...btnP,padding:"14px",fontSize:14}}>↓ Ladda ner</button>
          <button onClick={() => setShareOpen(true)} style={{...btnG,padding:"14px",fontSize:14}}>🔗 Dela via länk</button>
          <button onClick={() => alert(`Markerat ${dok.titel} som tillgängligt offline\n(demo)`)} style={{...btnG,padding:"14px",fontSize:14}}>📥 Spara offline</button>
        </div>
      </div>

      {/* Dela-modal */}
      {shareOpen && (
        <div onClick={() => setShareOpen(false)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
          <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 28px",maxWidth:430,width:"100%",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
            <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:12}}>DELA DOKUMENT</div>
            <div style={{fontSize:14,fontWeight:500,marginBottom:10}}>{dok.titel}</div>
            <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",fontSize:12,color:C.tx,fontFamily:"monospace",marginBottom:14,wordBreak:"break-all"}}>{link}</div>
            <div style={{display:"flex",gap:10,marginBottom:8}}>
              <button onClick={kopiera} style={{...btnP,flex:1,background:copied?C.ok:C.ac}}>{copied ? "✓ Kopierad!" : "📋 Kopiera länk"}</button>
            </div>
            <button onClick={() => setShareOpen(false)} style={btnG}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  )
}

// Liten info-rad inuti detaljvyn
function Rad({label, v}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:10}}>
      <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px",textTransform:"uppercase",flexShrink:0}}>{label}</div>
      <div style={{fontSize:13,color:C.tx,fontWeight:500,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis"}}>{v}</div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
// PERSONALREGISTER — Anställda-modul. Lista + komplett profil med
// 5 sektioner: info, certifikat, erfarenhet, projekt, tillgänglighet.
// CV-export + chef kan editera, anställd ser-bara.
// ═══════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
// AnstalldaHem — Lista med sök, roll-filter, personkort
// ─────────────────────────────────────────────────────────────────────────
function AnstalldaHem({user, anstalldDokument, anstalldaProfil, navigate}) {
  const isChef = user?.role === "foretag"
  const aid = getAnstalldId(user)
  const [sok, setSok] = useState("")
  const [roll, setRoll] = useState(null)

  // Anställd får bara se sin egen
  const visa = isChef ? INIT_KONTAKTER : INIT_KONTAKTER.filter(k => k.id === aid)

  function matchar(k) {
    if (roll && k.roll !== roll) return false
    if (!sok.trim()) return true
    const q = sok.toLowerCase()
    if ((k.name + " " + k.roll).toLowerCase().includes(q)) return true
    if ((anstalldaProfil[k.id]?.ort || "").toLowerCase().includes(q)) return true
    // Sök i certifikat
    const certs = anstalldDokument.filter(d => d.anstalldId === k.id)
    if (certs.some(c => (c.titel + " " + c.typ).toLowerCase().includes(q))) return true
    return false
  }
  const filtered = visa.filter(matchar)
  const counts = {__all: visa.length}
  KONTAKT_ROLLER.forEach(r => { counts[r] = visa.filter(k => k.roll === r).length })

  return (
    <div>
      <DnHdr title="Anställda" navigate={navigate} back="intranet-hem" subtitle={isChef ? `${filtered.length} av ${visa.length} anställda` : "Din profil"}/>
      <div style={{padding:"14px 20px 24px"}}>
        {isChef && (
          <>
            <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök namn, roll, certifikat, ort..." value={sok} onChange={e => setSok(e.target.value)}/>
            <FilterPills items={KONTAKT_ROLLER} selected={roll} onSelect={setRoll} counts={counts}/>
          </>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.length === 0 ? (
            <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga anställda matchade</div>
          ) : filtered.map(k => {
            const certs = anstalldDokument.filter(d => d.anstalldId === k.id)
            const utgangna = certs.filter(d => d.giltigTill && utgangStatus(d.giltigTill) === "expired").length
            const utgaende = certs.filter(d => d.giltigTill && utgangStatus(d.giltigTill) === "warning").length
            const profil = anstalldaProfil[k.id] || {}
            return (
              <button key={k.id} onClick={() => navigate("anstalld-profil", k)} style={{display:"flex",alignItems:"center",gap:14,background:C.bg2,border:`1px solid ${utgangna>0?"rgba(224,82,82,.4)":utgaende>0?"rgba(232,184,75,.4)":C.b}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                <IniAvatar name={k.name} size={52}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:600,color:C.tx}}>{k.name}</div>
                  <div style={{fontSize:12,color:C.mu,marginTop:3}}>{k.roll}{profil.ort && ` · ${profil.ort}`}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6,fontSize:11,color:C.mu,flexWrap:"wrap"}}>
                    <span>📞 {k.tel}</span>
                    <span>🎓 {certs.length} cert</span>
                    {utgangna > 0 && <span style={{padding:"1px 7px",borderRadius:9,background:"rgba(224,82,82,.16)",color:C.da,fontWeight:600,letterSpacing:".3px"}}>⛔ {utgangna} UTGÅNGEN</span>}
                    {utgaende > 0 && <span style={{padding:"1px 7px",borderRadius:9,background:"rgba(232,184,75,.18)",color:"#b88a00",fontWeight:600,letterSpacing:".3px"}}>⚠ {utgaende} GÅR UT</span>}
                  </div>
                </div>
                <div style={{fontSize:20,color:C.mu,flexShrink:0}}>›</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// AnstalldProfil — Komplett profil med 5 sektioner
// ─────────────────────────────────────────────────────────────────────────
function AnstalldProfil({user, anstalld, anstalldaProfil, anstalldDokument, projektDokument, projekteringBokningar, projekt, navigate, onAddCert, onUpdateProfil}) {
  const isChef = user?.role === "foretag"
  const [showCV, setShowCV] = useState(false)
  const [addCertOpen, setAddCertOpen] = useState(false)
  const [editProfilOpen, setEditProfilOpen] = useState(false)
  const [editErfarenhetOpen, setEditErfarenhetOpen] = useState(false)
  if (!anstalld) return <div style={{padding:30,textAlign:"center"}}>Person hittades inte</div>

  const profil = anstalldaProfil[anstalld.id] || {erfarenheter:[], maskiner:[]}
  const certs = anstalldDokument.filter(d => d.anstalldId === anstalld.id)

  // Cert-varningar 60/90 dagar (specifika trösklar för Anställd-vyn)
  function certStatus(c) {
    if (!c.giltigTill) return "noexpiry"
    const d = dagarTillUtgang(c.giltigTill)
    if (d < 0) return "expired"
    if (d <= 60) return "red60"
    if (d <= 90) return "yellow90"
    return "ok"
  }

  // Tidigare projekt — alla bokningar från projekteringBokningar för denna person
  const minaBokningar = projekteringBokningar.filter(b => b.anstalldId === anstalld.id)
  const projektStat = {}
  minaBokningar.forEach(b => {
    const p = projekt.find(x => x.id === b.projektId)
    if (!p) return
    if (!projektStat[b.projektId]) projektStat[b.projektId] = {projekt:p, veckor:[]}
    projektStat[b.projektId].veckor.push(b.vecka)
  })
  const tidigareProjekt = Object.values(projektStat).map(x => ({...x, veckor: x.veckor.sort((a,b) => a-b)})).sort((a, b) => Math.min(...b.veckor) - Math.min(...a.veckor))

  // Tillgänglighet — kommande 7 veckor (V22-V28)
  const kommandeWeeks = [22, 23, 24, 25, 26, 27, 28]
  const tillgang = kommandeWeeks.map(v => {
    const bok = projekteringBokningar.filter(b => b.anstalldId === anstalld.id && b.vecka === v)
    return {vecka: v, bokningar: bok.length, projekt: bok.map(b => projekt.find(p => p.id === b.projektId)).filter(Boolean)}
  })

  return (
    <div>
      <DnHdr title="Anställd" navigate={navigate} back="anstallda-hem"
        action={isChef && <button onClick={() => setShowCV(true)} style={{background:C.ac,color:"#fff",border:"none",borderRadius:8,padding:"7px 12px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>📄 CV</button>}/>

      <div style={{padding:"22px 20px 8px",textAlign:"center"}}>
        <IniAvatar name={anstalld.name} size={92}/>
        <h1 style={{fontSize:24,fontWeight:600,marginTop:14,marginBottom:4}}>{anstalld.name}</h1>
        <div style={{fontSize:13,color:C.mu}}>{anstalld.roll}{profil.ort && ` · ${profil.ort}`}</div>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:14}}>
          <a href={`tel:${anstalld.tel.replace(/\s/g,"")}`} style={{display:"flex",alignItems:"center",gap:5,background:"rgba(46,125,50,.1)",border:"1px solid rgba(46,125,50,.3)",color:C.ok,padding:"7px 12px",borderRadius:18,textDecoration:"none",fontSize:13,fontWeight:500}}>📞 Ring</a>
          <a href={`sms:${anstalld.tel.replace(/\s/g,"")}`} style={{display:"flex",alignItems:"center",gap:5,background:"rgba(91,156,246,.08)",border:"1px solid rgba(91,156,246,.3)",color:"#3470cf",padding:"7px 12px",borderRadius:18,textDecoration:"none",fontSize:13,fontWeight:500}}>💬 SMS</a>
          <a href={`mailto:${anstalld.email}`} style={{display:"flex",alignItems:"center",gap:5,background:C.bg2,border:`1px solid ${C.b}`,color:C.tx,padding:"7px 12px",borderRadius:18,textDecoration:"none",fontSize:13,fontWeight:500}}>✉️ Mail</a>
        </div>
      </div>

      <div style={{padding:"18px 20px 24px"}}>
        {/* 1. GENERELL INFO */}
        <Sektion titel="Generell info" action={isChef && <button onClick={() => setEditProfilOpen(true)} style={miniBtn}>✎ Redigera</button>}>
          <Rad label="Roll" v={anstalld.roll}/>
          <Rad label="Telefon" v={anstalld.tel}/>
          <Rad label="E-post" v={anstalld.email}/>
          <Rad label="Ort" v={profil.ort || "—"}/>
          <Rad label="Företag" v={anstalld.foretag}/>
          <Rad label="Anställd sedan" v={profil.anstallningsdatum || "—"}/>
          {profil.anhorig && (
            <>
              <div style={{margin:"6px 0",height:1,background:C.b}}/>
              <div style={{fontSize:10.5,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:4}}>NÄRMASTE ANHÖRIG</div>
              <Rad label="Namn" v={profil.anhorig.namn}/>
              <Rad label="Telefon" v={profil.anhorig.tel}/>
              <Rad label="Relation" v={profil.anhorig.relation}/>
            </>
          )}
        </Sektion>

        {/* 2. KOMPETENSER & CERTIFIKAT */}
        <Sektion titel={`Kompetenser & certifikat (${certs.length})`} action={isChef && <button onClick={() => setAddCertOpen(true)} style={miniBtn}>+ Lägg till</button>}>
          {certs.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga certifikat registrerade</div>
          ) : certs.map(c => {
            const st = certStatus(c)
            const dagar = c.giltigTill ? dagarTillUtgang(c.giltigTill) : null
            const farg = st === "expired" ? C.da : st === "red60" ? C.da : st === "yellow90" ? "#b88a00" : C.ok
            const bg = st === "expired" || st === "red60" ? "rgba(224,82,82,.06)" : st === "yellow90" ? "rgba(232,184,75,.06)" : C.bg2
            const br = st === "expired" || st === "red60" ? "rgba(224,82,82,.35)" : st === "yellow90" ? "rgba(232,184,75,.4)" : C.b
            return (
              <button key={c.id} onClick={() => navigate("dokumentnav-detalj", {...c, _kategori:"anstallda", _person:anstalld.name, _giltig:c.giltigTill, _datum:c.utfardatDatum})} style={{display:"flex",alignItems:"center",gap:12,background:bg,border:`1px solid ${br}`,borderRadius:10,padding:"12px 14px",marginBottom:8,cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                <div style={{width:38,height:46,background:"rgba(224,82,82,.08)",border:"1px solid rgba(224,82,82,.25)",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.da,flexShrink:0,letterSpacing:".3px"}}>PDF</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:10.5,color:C.ac,fontWeight:500,letterSpacing:".3px",marginBottom:2}}>{c.typ}</div>
                  <div style={{fontSize:14,fontWeight:500,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.titel}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:3}}>
                    Utfärdat {c.utfardatDatum} av {c.utfardatAv}
                    {c.giltigTill && st === "expired" && <span style={{color:C.da,fontWeight:600,marginLeft:6}}>· ⛔ UTGÅNGEN ({Math.abs(dagar)}d)</span>}
                    {c.giltigTill && st === "red60" && <span style={{color:C.da,fontWeight:600,marginLeft:6}}>· 🔴 GÅR UT OM {dagar}D</span>}
                    {c.giltigTill && st === "yellow90" && <span style={{color:"#b88a00",fontWeight:600,marginLeft:6}}>· 🟡 GÅR UT OM {dagar}D</span>}
                    {c.giltigTill && st === "ok" && <span style={{color:C.ok,marginLeft:6}}>· ✓ Giltig till {c.giltigTill}</span>}
                  </div>
                </div>
              </button>
            )
          })}
        </Sektion>

        {/* 3. ERFARENHET */}
        <Sektion titel="Erfarenhet" action={isChef && <button onClick={() => setEditErfarenhetOpen(true)} style={miniBtn}>✎ Redigera</button>}>
          {(!profil.erfarenheter || profil.erfarenheter.length === 0) ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga arbetsområden registrerade</div>
          ) : (
            <>
              <div style={{fontSize:10.5,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:8}}>ARBETSOMRÅDEN</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                {profil.erfarenheter.map((e, i) => (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(91,156,246,.08)",border:"1px solid rgba(91,156,246,.25)",borderRadius:14,padding:"6px 12px"}}>
                    <span style={{fontSize:13,fontWeight:500,color:"#3470cf"}}>{e.typ}</span>
                    <span style={{fontSize:11,color:C.mu,background:C.bg,padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.ar}å</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {profil.maskiner && profil.maskiner.length > 0 && (
            <>
              <div style={{fontSize:10.5,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:8}}>MASKINER & FORDON</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {profil.maskiner.map(m => (
                  <span key={m} style={{fontSize:12,fontWeight:500,color:"#b88a00",background:"rgba(232,184,75,.1)",border:"1px solid rgba(232,184,75,.3)",borderRadius:14,padding:"6px 12px"}}>🚜 {m}</span>
                ))}
              </div>
            </>
          )}
        </Sektion>

        {/* 4. TIDIGARE PROJEKT */}
        <Sektion titel={`Tidigare projekt (${tidigareProjekt.length})`}>
          {tidigareProjekt.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga projekt registrerade</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {tidigareProjekt.map(({projekt:p, veckor}) => {
                const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
                const minV = Math.min(...veckor), maxV = Math.max(...veckor)
                const veckorStr = minV === maxV ? `V${minV}` : `V${minV}–V${maxV}`
                return (
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,background:c.bg,border:`1px solid ${c.border}`,borderRadius:10,padding:"12px 14px"}}>
                    <div style={{width:6,height:38,borderRadius:3,background:c.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:600,color:c.text}}>{p.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>📍 {p.plats} · {veckor.length} v · {veckorStr}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Sektion>

        {/* 5. TILLGÄNGLIGHET */}
        <Sektion titel="Tillgänglighet" subtitle="Kommande 7 veckor — kopplad till planeringen">
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
            {tillgang.map(w => {
              const bokad = w.bokningar > 0
              const bg = bokad ? "rgba(224,82,82,.08)" : "rgba(46,125,50,.08)"
              const br = bokad ? "rgba(224,82,82,.35)" : "rgba(46,125,50,.3)"
              const fg = bokad ? C.da : C.ok
              return (
                <div key={w.vecka} style={{flex:"0 0 auto",minWidth:62,padding:"10px 8px",background:bg,border:`1px solid ${br}`,borderRadius:10,textAlign:"center"}}>
                  <div style={{fontSize:10.5,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>VECKA</div>
                  <div style={{fontSize:18,fontWeight:700,color:fg,marginTop:2,lineHeight:1}}>{w.vecka}</div>
                  <div style={{fontSize:16,marginTop:4,lineHeight:1}}>{bokad ? "🔴" : "🟢"}</div>
                  <div style={{fontSize:9.5,color:C.mu,marginTop:2,letterSpacing:".2px"}}>{bokad ? "BOKAD" : "LEDIG"}</div>
                </div>
              )
            })}
          </div>
          <div style={{display:"flex",gap:12,marginTop:12,fontSize:11,color:C.mu}}>
            <span>🟢 Ledig</span><span>🟡 Delvis</span><span>🔴 Bokad</span>
          </div>
        </Sektion>
      </div>

      {/* CV-modal */}
      {showCV && <CVModal anstalld={anstalld} profil={profil} certs={certs} tidigareProjekt={tidigareProjekt} onClose={() => setShowCV(false)}/>}

      {/* Lägg till cert-modal */}
      {addCertOpen && <LaggTillCertModal anstalldId={anstalld.id} anstalldNamn={anstalld.name} onAdd={onAddCert} onClose={() => setAddCertOpen(false)}/>}

      {/* Redigera profil-modal */}
      {editProfilOpen && <RedigeraProfilModal anstalldId={anstalld.id} profil={profil} onSave={onUpdateProfil} onClose={() => setEditProfilOpen(false)}/>}

      {/* Redigera erfarenheter-modal */}
      {editErfarenhetOpen && <RedigeraErfarenhetModal anstalldId={anstalld.id} profil={profil} onSave={onUpdateProfil} onClose={() => setEditErfarenhetOpen(false)}/>}
    </div>
  )
}

// — Stil-helpers —
const miniBtn = {background:"none",border:`1px solid ${C.b}`,borderRadius:6,padding:"4px 9px",fontSize:11.5,color:C.ac,cursor:"pointer",fontFamily:"inherit",fontWeight:500}

function Sektion({titel, subtitle, action, children}) {
  return (
    <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12,gap:8}}>
        <div style={{minWidth:0,flex:1}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:".5px",color:C.tx,textTransform:"uppercase"}}>{titel}</div>
          {subtitle && <div style={{fontSize:11,color:C.mu,marginTop:2}}>{subtitle}</div>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

// — CV-modal — visar formaterad CV med "skriv ut"-knapp —
function CVModal({anstalld, profil, certs, tidigareProjekt, onClose}) {
  const totErfarenhet = (profil.erfarenheter || []).reduce((s, e) => s + e.ar, 0)
  const giltgaCerts = certs.filter(c => !c.giltigTill || dagarTillUtgang(c.giltigTill) > 0)
  function skrivUt() {
    if (typeof window !== "undefined") window.print()
  }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:11,letterSpacing:".5px",color:C.mu,fontWeight:500}}>CV · {anstalld.name.toUpperCase()}</div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:C.mu,fontSize:20}}>✕</button>
        </div>

        <div style={{border:`1px solid ${C.b}`,borderRadius:10,padding:"22px 20px",background:"#fff"}}>
          <div style={{textAlign:"center",borderBottom:`2px solid ${C.ac}`,paddingBottom:14,marginBottom:14}}>
            <div style={{fontSize:20,fontWeight:700,color:C.tx}}>{anstalld.name}</div>
            <div style={{fontSize:13,color:C.mu,marginTop:2}}>{anstalld.roll} · {anstalld.foretag}</div>
            <div style={{fontSize:11,color:C.mu,marginTop:6}}>{anstalld.tel} · {anstalld.email}{profil.ort && ` · ${profil.ort}`}</div>
          </div>

          <CvBlock label="ANSTÄLLNING">
            <div style={cvText}>Anställd sedan {profil.anstallningsdatum || "—"} ({profil.anstallningsdatum ? Math.floor((new Date(2026,4,25) - new Date(profil.anstallningsdatum)) / (1000*60*60*24*365)) : 0} år)</div>
          </CvBlock>

          {profil.erfarenheter && profil.erfarenheter.length > 0 && (
            <CvBlock label="ERFARENHET / KOMPETENSER">
              <div style={{fontSize:11,color:C.mu,marginBottom:4}}>Totalt {totErfarenhet} år samlad branscherfarenhet</div>
              <ul style={{margin:0,paddingLeft:18}}>
                {[...profil.erfarenheter].sort((a, b) => b.ar - a.ar).map((e, i) => (
                  <li key={i} style={cvText}>{e.typ} — {e.ar} år</li>
                ))}
              </ul>
            </CvBlock>
          )}

          {profil.maskiner && profil.maskiner.length > 0 && (
            <CvBlock label="MASKINER & FORDON">
              <div style={cvText}>{profil.maskiner.join(" · ")}</div>
            </CvBlock>
          )}

          {giltgaCerts.length > 0 && (
            <CvBlock label="CERTIFIKAT & UTBILDNINGAR">
              <ul style={{margin:0,paddingLeft:18}}>
                {giltgaCerts.map(c => (
                  <li key={c.id} style={cvText}>{c.titel}{c.utfardatAv && ` — ${c.utfardatAv}`}{c.giltigTill && ` (giltigt till ${c.giltigTill})`}</li>
                ))}
              </ul>
            </CvBlock>
          )}

          {tidigareProjekt.length > 0 && (
            <CvBlock label="PROJEKT">
              <ul style={{margin:0,paddingLeft:18}}>
                {tidigareProjekt.slice(0, 8).map(({projekt:p, veckor}) => (
                  <li key={p.id} style={cvText}>{p.namn} · {p.plats} · {veckor.length} v</li>
                ))}
              </ul>
            </CvBlock>
          )}
        </div>

        <div style={{display:"flex",gap:10,marginTop:14}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Stäng</button>
          <button onClick={skrivUt} style={{...btnP,flex:1}}>🖨 Skriv ut / PDF</button>
        </div>
      </div>
    </div>
  )
}
function CvBlock({label, children}) {
  return (
    <div style={{marginBottom:14}}>
      <div style={{fontSize:10,letterSpacing:".7px",color:C.ac,fontWeight:700,marginBottom:5}}>{label}</div>
      {children}
    </div>
  )
}
const cvText = {fontSize:12,lineHeight:1.5,color:C.tx}

// — Lägg-till-cert-modal —
function LaggTillCertModal({anstalldId, anstalldNamn, onAdd, onClose}) {
  const [data, setData] = useState({typ:"Certifikat", titel:"", utfardatAv:"", utfardatDatum:"2026-05-25", giltigTill:""})
  const [bild, setBild] = useState(null)
  const valid = data.titel.trim() && data.utfardatAv.trim() && data.utfardatDatum
  function spara() {
    if (!valid) return
    onAdd({anstalldId, ...data, giltigTill: data.giltigTill || null, bild})
    onClose()
  }
  function pick(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setBild(reader.result)
    reader.readAsDataURL(f)
  }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:6}}>LÄGG TILL CERTIFIKAT</div>
        <div style={{textAlign:"center",fontSize:13,color:C.tx,marginBottom:16}}>{anstalldNamn}</div>

        <div style={{marginBottom:12}}>
          <label style={lbl}>Typ</label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["Kompetensbevis","Certifikat","HMS-kort","Förarbevis"].map(t => {
              const sel = data.typ === t
              return <button key={t} onClick={() => setData(d => ({...d, typ:t}))} style={{fontSize:12,padding:"6px 11px",borderRadius:14,border:`1px solid ${sel?C.ac:C.b}`,background:sel?"rgba(21,101,192,.08)":C.bg2,color:sel?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:sel?500:400}}>{t}</button>
            })}
          </div>
        </div>

        <div style={{marginBottom:12}}><label style={lbl}>Namn *</label><input style={inp} value={data.titel} onChange={e => setData(d => ({...d, titel:e.target.value}))} placeholder="t.ex. Termitsvets certifikat"/></div>
        <div style={{marginBottom:12}}><label style={lbl}>Utfärdat av *</label><input style={inp} value={data.utfardatAv} onChange={e => setData(d => ({...d, utfardatAv:e.target.value}))} placeholder="t.ex. SIS"/></div>
        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <div style={{flex:1}}><label style={lbl}>Utfärdat *</label><input style={{...inp,colorScheme:"light"}} type="date" value={data.utfardatDatum} onChange={e => setData(d => ({...d, utfardatDatum:e.target.value}))}/></div>
          <div style={{flex:1}}><label style={lbl}>Giltigt till</label><input style={{...inp,colorScheme:"light"}} type="date" value={data.giltigTill} onChange={e => setData(d => ({...d, giltigTill:e.target.value}))}/></div>
        </div>

        <div style={{marginBottom:16}}>
          <label style={lbl}>Bild / PDF (valfritt)</label>
          <label style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:C.bg2,border:`1.5px dashed ${C.b2}`,borderRadius:10,padding:"14px 14px",cursor:"pointer",color:C.mu,fontSize:13}}>
            <span style={{fontSize:20}}>📎</span>
            <span>{bild ? "Bild vald ✓" : "Ladda upp dokument"}</span>
            <input type="file" accept="image/*,application/pdf" capture="environment" onChange={pick} style={{display:"none"}}/>
          </label>
        </div>

        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={spara} disabled={!valid} style={{...btnP,flex:1}}>Lägg till</button>
        </div>
      </div>
    </div>
  )
}

// — Redigera profil-modal (ort, anställningsdatum, anhörig) —
function RedigeraProfilModal({anstalldId, profil, onSave, onClose}) {
  const [data, setData] = useState({
    ort: profil.ort || "",
    anstallningsdatum: profil.anstallningsdatum || "",
    anhorigNamn: profil.anhorig?.namn || "",
    anhorigTel: profil.anhorig?.tel || "",
    anhorigRelation: profil.anhorig?.relation || "",
  })
  function spara() {
    onSave(anstalldId, {
      ort: data.ort,
      anstallningsdatum: data.anstallningsdatum,
      anhorig: data.anhorigNamn ? {namn: data.anhorigNamn, tel: data.anhorigTel, relation: data.anhorigRelation} : null,
    })
    onClose()
  }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:14}}>REDIGERA PROFIL</div>
        <div style={{marginBottom:12}}><label style={lbl}>Ort</label><input style={inp} value={data.ort} onChange={e => setData(d => ({...d, ort:e.target.value}))} placeholder="t.ex. Sundsvall"/></div>
        <div style={{marginBottom:12}}><label style={lbl}>Anställd sedan</label><input style={{...inp,colorScheme:"light"}} type="date" value={data.anstallningsdatum} onChange={e => setData(d => ({...d, anstallningsdatum:e.target.value}))}/></div>
        <div style={{margin:"14px 0 8px",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500}}>NÄRMASTE ANHÖRIG</div>
        <div style={{marginBottom:10}}><label style={lbl}>Namn</label><input style={inp} value={data.anhorigNamn} onChange={e => setData(d => ({...d, anhorigNamn:e.target.value}))}/></div>
        <div style={{marginBottom:10}}><label style={lbl}>Telefon</label><input style={inp} value={data.anhorigTel} onChange={e => setData(d => ({...d, anhorigTel:e.target.value}))} placeholder="070-123 45 67"/></div>
        <div style={{marginBottom:16}}><label style={lbl}>Relation</label><input style={inp} value={data.anhorigRelation} onChange={e => setData(d => ({...d, anhorigRelation:e.target.value}))} placeholder="t.ex. Maka, Far, Sambo"/></div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={spara} style={{...btnP,flex:1}}>Spara</button>
        </div>
      </div>
    </div>
  )
}

// — Redigera erfarenhet-modal (arbetsområden + maskiner) —
function RedigeraErfarenhetModal({anstalldId, profil, onSave, onClose}) {
  const [erfarenheter, setErfarenheter] = useState(profil.erfarenheter || [])
  const [maskiner, setMaskiner] = useState(profil.maskiner || [])
  function toggleErf(typ) {
    setErfarenheter(prev => {
      const finns = prev.find(e => e.typ === typ)
      if (finns) return prev.filter(e => e.typ !== typ)
      return [...prev, {typ, ar:1}]
    })
  }
  function uppdateraAr(typ, ar) {
    setErfarenheter(prev => prev.map(e => e.typ === typ ? {...e, ar: Math.max(1, ar)} : e))
  }
  function toggleMaskin(m) {
    setMaskiner(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }
  function spara() {
    onSave(anstalldId, {erfarenheter, maskiner})
    onClose()
  }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:14}}>REDIGERA ERFARENHET</div>

        <div style={{fontSize:11,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:8}}>ARBETSOMRÅDEN — klicka för att lägga till</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
          {ERFARENHET_TYPER.map(t => {
            const aktiv = erfarenheter.find(e => e.typ === t)
            return <button key={t} onClick={() => toggleErf(t)} style={{fontSize:12,padding:"6px 11px",borderRadius:14,border:`1px solid ${aktiv?C.ac:C.b}`,background:aktiv?"rgba(21,101,192,.08)":C.bg2,color:aktiv?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:aktiv?500:400}}>{aktiv?"✓ ":""}{t}</button>
          })}
        </div>

        {erfarenheter.length > 0 && (
          <>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:8}}>ÅR ERFARENHET</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
              {erfarenheter.map(e => (
                <div key={e.typ} style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:8,padding:"8px 12px"}}>
                  <span style={{flex:1,fontSize:13,fontWeight:500}}>{e.typ}</span>
                  <button onClick={() => uppdateraAr(e.typ, e.ar - 1)} style={{...miniBtn,width:28,padding:0,height:26}}>−</button>
                  <span style={{minWidth:34,textAlign:"center",fontSize:13,fontWeight:600}}>{e.ar} år</span>
                  <button onClick={() => uppdateraAr(e.typ, e.ar + 1)} style={{...miniBtn,width:28,padding:0,height:26}}>+</button>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{fontSize:11,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:8}}>MASKINER & FORDON</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
          {MASKIN_TYPER.map(m => {
            const aktiv = maskiner.includes(m)
            return <button key={m} onClick={() => toggleMaskin(m)} style={{fontSize:12,padding:"6px 11px",borderRadius:14,border:`1px solid ${aktiv?"#b88a00":C.b}`,background:aktiv?"rgba(232,184,75,.12)":C.bg2,color:aktiv?"#b88a00":C.mu,cursor:"pointer",fontFamily:"inherit",fontWeight:aktiv?500:400}}>{aktiv?"✓ ":""}🚜 {m}</button>
          })}
        </div>

        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={spara} style={{...btnP,flex:1}}>Spara</button>
        </div>
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
// INVENTARIE — Lista, detalj, boka ut, markera trasig, historik
// ═══════════════════════════════════════════════════════════════════════
const STATUS_FARG = {
  "Tillgänglig":     {bg:"rgba(46,125,50,.1)",  br:"rgba(46,125,50,.35)",  fg:"#2e7d32", e:"✅"},
  "Ute på projekt":  {bg:"rgba(91,156,246,.1)", br:"rgba(91,156,246,.35)", fg:"#3470cf", e:"🚧"},
  "Service":         {bg:"rgba(232,184,75,.12)",br:"rgba(232,184,75,.4)",  fg:"#b88a00", e:"🔧"},
  "Trasig":          {bg:"rgba(224,82,82,.08)", br:"rgba(224,82,82,.4)",   fg:"#c62828", e:"⚠️"},
}
function isServiceForsenad(item) {
  if (!item.nastaService) return false
  return dagarTillUtgang(item.nastaService) < 0
}

// — InvFoto: foto-platshållare med emoji + färgad bakgrund —
function InvFoto({item, size = 70}) {
  return (
    <div style={{width:size,height:size,borderRadius:10,background:`${item.farg}18`,border:`1px solid ${item.farg}45`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:Math.round(size*.5),flexShrink:0}}>{item.emoji}</div>
  )
}

function IntranetInventarie({user, inventarie, navigate}) {
  const isChef = user?.role === "foretag"
  const [sok, setSok] = useState("")
  const [kategori, setKategori] = useState(null)
  const [status, setStatus] = useState(null)

  function matchar(it) {
    if (kategori && it.kategori !== kategori) return false
    if (status && it.status !== status) return false
    if (!sok.trim()) return true
    const q = sok.toLowerCase()
    return (it.namn + " " + it.kategori + " " + it.serienr).toLowerCase().includes(q)
  }
  const filtered = inventarie.filter(matchar)
  const kCounts = {__all: inventarie.length}
  INVENTARIE_KATEGORIER.forEach(k => { kCounts[k] = inventarie.filter(it => it.kategori === k).length })

  // Top-stat för chef: trasiga + service-försenade
  const trasiga = inventarie.filter(it => it.status === "Trasig").length
  const serviceForsenad = inventarie.filter(isServiceForsenad).length

  return (
    <div>
      <IntranetHdr title="Inventarie" navigate={navigate} subtitle={`${inventarie.length} föremål · ${inventarie.filter(it => it.status === "Tillgänglig").length} tillgängliga`}/>
      <div style={{padding:"14px 20px 24px"}}>

        {/* Varnings-banner för chef */}
        {isChef && (trasiga > 0 || serviceForsenad > 0) && (
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            {trasiga > 0 && (
              <div onClick={() => setStatus("Trasig")} style={{flex:1,background:"rgba(224,82,82,.06)",border:"1px solid rgba(224,82,82,.4)",borderRadius:10,padding:"10px 12px",cursor:"pointer"}}>
                <div style={{fontSize:10,color:C.da,fontWeight:600,letterSpacing:".4px"}}>⚠️ TRASIGA</div>
                <div style={{fontSize:18,fontWeight:600,color:C.da,marginTop:2}}>{trasiga}</div>
              </div>
            )}
            {serviceForsenad > 0 && (
              <div style={{flex:1,background:"rgba(232,184,75,.08)",border:"1px solid rgba(232,184,75,.4)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:"#b88a00",fontWeight:600,letterSpacing:".4px"}}>🔧 SERVICE FÖRSENAD</div>
                <div style={{fontSize:18,fontWeight:600,color:"#b88a00",marginTop:2}}>{serviceForsenad}</div>
              </div>
            )}
          </div>
        )}

        <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök namn, kategori, serienr..." value={sok} onChange={e => setSok(e.target.value)}/>

        <FilterPills items={INVENTARIE_KATEGORIER} selected={kategori} onSelect={setKategori} counts={kCounts}/>

        <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto"}}>
          <button onClick={() => setStatus(null)} style={{fontSize:11,padding:"5px 10px",borderRadius:12,border:`1px solid ${status===null?C.tx:C.b}`,background:status===null?C.bg3:C.bg2,color:C.tx,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",fontWeight:status===null?500:400}}>Alla statusar</button>
          {INVENTARIE_STATUS.map(s => {
            const sel = status === s, sf = STATUS_FARG[s]
            const n = inventarie.filter(it => it.status === s).length
            return <button key={s} onClick={() => setStatus(sel ? null : s)} style={{fontSize:11,padding:"5px 10px",borderRadius:12,border:`1px solid ${sel?sf.fg:sf.br}`,background:sel?sf.bg:C.bg2,color:sel?sf.fg:C.mu,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",fontWeight:sel?500:400}}>{sf.e} {s} ({n})</button>
          })}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.length === 0 ? (
            <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga föremål matchade</div>
          ) : filtered.map(it => {
            const sf = STATUS_FARG[it.status]
            const ansvarig = INIT_KONTAKTER.find(k => k.id === it.ansvarigId)
            const projekt = it.aktivProjektId ? INIT_PROJEKTERING_PROJEKT.find(p => p.id === it.aktivProjektId) : null
            const sForsenad = isServiceForsenad(it)
            return (
              <button key={it.id} onClick={() => navigate("intranet-inventarie-detalj", it)} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${it.status==="Trasig"?"rgba(224,82,82,.4)":sForsenad?"rgba(232,184,75,.35)":C.b}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                <InvFoto item={it} size={54}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
                    <span style={{fontSize:10.5,padding:"1px 6px",borderRadius:6,background:`${it.farg}15`,color:it.farg,fontWeight:500,letterSpacing:".3px"}}>{it.kategori}</span>
                    <span style={{fontSize:10.5,padding:"1px 6px",borderRadius:6,background:sf.bg,color:sf.fg,fontWeight:600,letterSpacing:".3px"}}>{sf.e} {it.status}</span>
                    {sForsenad && it.status !== "Trasig" && <span style={{fontSize:10,padding:"1px 6px",borderRadius:6,background:"rgba(232,184,75,.15)",color:"#b88a00",fontWeight:600,letterSpacing:".3px"}}>⚠ SERVICE FÖRSENAD</span>}
                  </div>
                  <div style={{fontSize:14,fontWeight:500,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.namn}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {it.serienr}
                    {projekt && ` · 📍 ${projekt.namn}`}
                    {!projekt && ansvarig && ` · 👤 ${ansvarig.name}`}
                  </div>
                </div>
                <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function IntranetInventarieDetalj({user, item, projekt, inventarie, navigate, onBokaUt, onAterlamna, onMarkeraTrasig, onLagaTrasig, onServiceKlar}) {
  if (!item) return <div style={{padding:30,textAlign:"center"}}>Föremål hittades inte</div>
  const isChef = user?.role === "foretag"
  const sf = STATUS_FARG[item.status]
  const ansvarig = INIT_KONTAKTER.find(k => k.id === item.ansvarigId)
  const aktivProj = item.aktivProjektId ? projekt.find(p => p.id === item.aktivProjektId) : null
  const sForsenad = isServiceForsenad(item)
  const [bokaOpen, setBokaOpen] = useState(false)
  const [trasigOpen, setTrasigOpen] = useState(false)

  return (
    <div>
      <IntranetHdr title="Föremål" navigate={navigate} back="intranet-inventarie"/>
      <div style={{padding:"18px 20px 24px"}}>

        {/* Hero med stor foto + status */}
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:18}}>
          <InvFoto item={item} size={84}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:11,color:item.farg,fontWeight:500,letterSpacing:".3px",marginBottom:3}}>{item.kategori}</div>
            <div style={{fontSize:17,fontWeight:600,marginBottom:4,lineHeight:1.25}}>{item.namn}</div>
            <div style={{fontSize:11,color:C.mu}}>{item.serienr}</div>
          </div>
        </div>

        {/* Status-banner */}
        <div style={{background:sf.bg,border:`1.5px solid ${sf.br}`,borderRadius:12,padding:"12px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>{sf.e}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:11,color:sf.fg,fontWeight:700,letterSpacing:".3px"}}>STATUS</div>
            <div style={{fontSize:15,fontWeight:600,color:C.tx,marginTop:1}}>{item.status}</div>
            {aktivProj && <div style={{fontSize:12,color:C.mu,marginTop:2}}>📍 {aktivProj.namn} ({aktivProj.plats})</div>}
            {item.status === "Trasig" && item.trasigtAv && (
              <div style={{fontSize:12,color:C.mu,marginTop:2}}>Rapporterad {item.trasigtSedan} av {item.trasigtAv}{item.trasigtKommentar && ` — "${item.trasigtKommentar}"`}</div>
            )}
          </div>
        </div>

        {sForsenad && item.status !== "Trasig" && (
          <div style={{background:"rgba(232,184,75,.08)",border:"1.5px solid rgba(232,184,75,.45)",borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>⚠️</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,color:"#b88a00",fontWeight:700,letterSpacing:".3px"}}>SERVICE FÖRSENAD</div>
              <div style={{fontSize:12,color:C.tx,marginTop:2}}>Service skulle ha gjorts {item.nastaService} ({Math.abs(dagarTillUtgang(item.nastaService))} dagar sedan)</div>
            </div>
          </div>
        )}

        {/* Info-block */}
        <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",marginBottom:14,display:"flex",flexDirection:"column",gap:10}}>
          <Rad label="Kategori" v={item.kategori}/>
          <Rad label="Serienummer" v={item.serienr}/>
          <Rad label="Ansvarig" v={ansvarig?.name || "—"}/>
          {item.senasteService && <Rad label="Senaste service" v={item.senasteService}/>}
          {item.nastaService && <Rad label="Nästa service" v={item.nastaService}/>}
        </div>

        {/* Knappar */}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
          {item.status === "Tillgänglig" && (
            <button onClick={() => setBokaOpen(true)} style={{...btnP,padding:"14px",fontSize:14}}>📍 Boka ut till projekt</button>
          )}
          {item.status === "Ute på projekt" && (
            <button onClick={() => onAterlamna(item.id)} style={{...btnP,padding:"14px",fontSize:14,background:C.ok}}>↩ Återlämna (markera tillgänglig)</button>
          )}
          {item.status !== "Trasig" && (
            <button onClick={() => setTrasigOpen(true)} style={{...btnG,padding:"14px",fontSize:14,color:C.da,borderColor:"rgba(224,82,82,.35)"}}>⚠️ Markera som trasig</button>
          )}
          {item.status === "Trasig" && (
            <button onClick={() => onLagaTrasig(item.id)} style={{...btnP,padding:"14px",fontSize:14,background:C.ok}}>✓ Markera som lagad (åter tillgänglig)</button>
          )}
          {isChef && item.status === "Service" && (
            <button onClick={() => onServiceKlar(item.id)} style={{...btnP,padding:"14px",fontSize:14,background:C.ok}}>✓ Service klar</button>
          )}
        </div>

        {/* Historik */}
        <Sektion titel={`Historik (${(item.historik || []).length + (item.aktivProjektId ? 1 : 0)})`}>
          {(item.historik || []).length === 0 && !item.aktivProjektId ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Ingen historik ännu</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {item.aktivProjektId && aktivProj && (() => {
                const c = PROJECT_PALETTE[aktivProj.farg % PROJECT_PALETTE.length]
                return (
                  <div style={{display:"flex",alignItems:"center",gap:10,background:c.bg,border:`1px solid ${c.border}`,borderRadius:10,padding:"10px 12px"}}>
                    <div style={{width:5,height:36,borderRadius:3,background:c.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,color:c.text}}>{aktivProj.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>📍 {aktivProj.plats} · pågående</div>
                    </div>
                    <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(46,125,50,.15)",color:C.ok,fontWeight:600,letterSpacing:".3px"}}>● NU</span>
                  </div>
                )
              })()}
              {(item.historik || []).map((h, i) => {
                const p = projekt.find(x => x.id === h.projektId)
                if (!p) return null
                const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px"}}>
                    <div style={{width:5,height:36,borderRadius:3,background:c.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:500,color:C.tx}}>{p.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>📍 {p.plats} · {h.fran} — {h.till || "pågående"}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Sektion>
      </div>

      {/* Boka-ut-modal */}
      {bokaOpen && (
        <div onClick={() => setBokaOpen(false)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
          <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
            <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:6}}>BOKA UT TILL PROJEKT</div>
            <div style={{textAlign:"center",fontSize:13,color:C.tx,marginBottom:14}}>{item.namn}</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
              {projekt.filter(p => p.status === "Pågående" || p.status === "Planering").map(p => {
                const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
                return (
                  <button key={p.id} onClick={() => { onBokaUt(item.id, p.id); setBokaOpen(false); navigate("intranet-inventarie") }} style={{display:"flex",alignItems:"center",gap:10,background:c.bg,border:`1px solid ${c.border}`,borderRadius:8,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                    <div style={{width:5,height:36,borderRadius:3,background:c.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:600,color:c.text}}>{p.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:1}}>📍 {p.plats}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            <button onClick={() => setBokaOpen(false)} style={btnG}>Avbryt</button>
          </div>
        </div>
      )}

      {/* Markera-trasig-modal */}
      {trasigOpen && <MarkeraTrasigModal user={user} item={item} onConfirm={(kommentar) => { onMarkeraTrasig(item.id, user?.name || "Okänd", kommentar); setTrasigOpen(false); navigate("intranet-inventarie") }} onClose={() => setTrasigOpen(false)}/>}
    </div>
  )
}

function MarkeraTrasigModal({user, item, onConfirm, onClose}) {
  const [kommentar, setKommentar] = useState("")
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.da,letterSpacing:".5px",fontWeight:700,marginBottom:6}}>⚠️ MARKERA SOM TRASIG</div>
        <div style={{textAlign:"center",fontSize:13,color:C.tx,marginBottom:6}}>{item.namn}</div>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,marginBottom:14}}>Chef får direkt notis</div>
        <label style={lbl}>Vad är fel? *</label>
        <textarea style={{...inp,height:90,resize:"none",marginBottom:14}} placeholder="t.ex. Hydraulikläckage vid lyftarmen..." value={kommentar} onChange={e => setKommentar(e.target.value)}/>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={() => kommentar.trim() && onConfirm(kommentar)} disabled={!kommentar.trim()} style={{...btnP,flex:1,background:C.da}}>Rapportera trasig</button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// PUBLIK FÖRETAGSPROFIL — Företagslista, profil med 5 sektioner, recension
// ═══════════════════════════════════════════════════════════════════════

// Räkna snittbetyg per kategori + total över alla recensioner för ett företag
function beraknaBetyg(recensioner, foretagId) {
  const co = recensioner.filter(r => r.foretagId === foretagId)
  if (co.length === 0) return null
  const k = co.reduce((s, r) => s + r.betyg.kvalitet, 0) / co.length
  const p = co.reduce((s, r) => s + r.betyg.punktlighet, 0) / co.length
  const ko = co.reduce((s, r) => s + r.betyg.kommunikation, 0) / co.length
  return {antal: co.length, kvalitet: k, punktlighet: p, kommunikation: ko, snitt: (k+p+ko)/3}
}

// Stjärn-display (read-only)
function Stjarnor({n, size = 14}) {
  return (
    <span style={{display:"inline-flex",gap:1,verticalAlign:"middle"}}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{fontSize:size,color:i<=Math.round(n)?"#f5b400":C.b2,lineHeight:1}}>★</span>
      ))}
    </span>
  )
}

function ForetagListan({navigate, recensioner}) {
  const [sok, setSok] = useState("")
  const filtered = INIT_FORETAG.filter(c => !sok.trim() || (c.namn + " " + c.ort + " " + c.typ).toLowerCase().includes(sok.toLowerCase()))
  return (
    <div>
      <IntranetHdr title="Företag på plattformen" navigate={navigate} back="intranet-hem" subtitle={`${INIT_FORETAG.length} entreprenörer`}/>
      <div style={{padding:"14px 20px 24px"}}>
        <input style={{...inp,marginBottom:14}} placeholder="🔍 Sök företag, ort..." value={sok} onChange={e => setSok(e.target.value)}/>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(co => {
            const b = beraknaBetyg(recensioner, co.id)
            return (
              <button key={co.id} onClick={() => navigate("foretag-profil", co)} style={{display:"flex",alignItems:"center",gap:14,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                <div style={{width:54,height:54,borderRadius:12,background:co.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{co.logoEmoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:600,color:C.tx}}>{co.namn}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:2}}>{co.typ} · {co.ort}</div>
                  {b && (
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
                      <Stjarnor n={b.snitt}/>
                      <span style={{fontSize:11,color:C.mu}}>{b.snitt.toFixed(1)} ({b.antal})</span>
                    </div>
                  )}
                </div>
                <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ForetagsProfilPublik({user, foretag, navigate, recensioner, inventarie, projekt, onAddRecension, onSkickaForfragan}) {
  if (!foretag) return <div style={{padding:30,textAlign:"center"}}>Företag hittades inte</div>
  const isChef = user?.role === "foretag"
  const [recOpen, setRecOpen] = useState(false)
  const [forfraganOpen, setForfraganOpen] = useState(null) // inventarie-item
  const [forfraganSuccess, setForfraganSuccess] = useState(false)

  const anstallda = INIT_KONTAKTER.filter(k => foretagForAnstalld(k.id) === foretag.id)
  const tidigareJobb = INIT_FORETAG_PROJEKT[foretag.id] || []
  const minaRec = recensioner.filter(r => r.foretagId === foretag.id).sort((a, b) => b.datum.localeCompare(a.datum))
  const b = beraknaBetyg(recensioner, foretag.id)
  // För co1 (NordRail) visar vi inventarie. Övriga företag — mock-data.
  const minaInventarie = foretag.id === "co1" ? inventarie : []

  return (
    <div>
      <IntranetHdr title="Företagsprofil" navigate={navigate} back="foretag-listan"/>

      {/* Hero */}
      <div style={{padding:"20px 20px 8px",textAlign:"center"}}>
        <div style={{width:90,height:90,borderRadius:16,background:foretag.logoBg,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:42,marginBottom:12}}>{foretag.logoEmoji}</div>
        <h1 style={{fontSize:22,fontWeight:600,marginBottom:4}}>{foretag.namn}</h1>
        <div style={{fontSize:13,color:C.mu}}>{foretag.typ} · 📍 {foretag.ort}</div>
        {b && (
          <div style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:10,background:"rgba(232,184,75,.08)",border:"1px solid rgba(232,184,75,.3)",borderRadius:18,padding:"5px 12px"}}>
            <Stjarnor n={b.snitt} size={15}/>
            <span style={{fontSize:13,fontWeight:600,color:"#b88a00"}}>{b.snitt.toFixed(1)}</span>
            <span style={{fontSize:11,color:C.mu}}>({b.antal} recensioner)</span>
          </div>
        )}
      </div>

      <div style={{padding:"18px 20px 24px"}}>
        {/* 1. FÖRETAGSINFO */}
        <Sektion titel="Företagsinfo">
          <Rad label="Org-nummer" v={foretag.orgNr}/>
          <Rad label="Grundat" v={foretag.grundat}/>
          <Rad label="Anställda" v={foretag.antalAnstallda}/>
          <Rad label="Kontaktperson" v={foretag.kontaktNamn}/>
          <Rad label="Telefon" v={foretag.kontaktTel}/>
          <Rad label="E-post" v={foretag.kontaktEmail}/>
          <div style={{margin:"8px 0",height:1,background:C.b}}/>
          <div style={{fontSize:10.5,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:6}}>BESKRIVNING</div>
          <div style={{fontSize:13.5,color:C.tx,lineHeight:1.55}}>{foretag.beskrivning}</div>
        </Sektion>

        {/* 2. ANSTÄLLDA */}
        <Sektion titel={`Anställda (${anstallda.length})`} subtitle="Klicka för kompetenser, certifikat och erfarenhet">
          {anstallda.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga anställda visas</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {anstallda.map(k => (
                <button key={k.id} onClick={() => navigate("foretag-anstalld-publik", {anstalldId: k.id, foretagId: foretag.id})} style={{display:"flex",alignItems:"center",gap:10,background:C.bg,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
                  <IniAvatar name={k.name} size={38}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13.5,fontWeight:500}}>{k.name}</div>
                    <div style={{fontSize:11,color:C.mu,marginTop:1}}>{k.roll}</div>
                  </div>
                  <div style={{fontSize:16,color:C.mu,flexShrink:0}}>›</div>
                </button>
              ))}
            </div>
          )}
        </Sektion>

        {/* 3. MASKINER & UTRUSTNING */}
        <Sektion titel={`Maskiner & utrustning (${minaInventarie.length})`} subtitle={isChef ? "Skicka förfrågan om att hyra" : null}>
          {minaInventarie.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga maskiner registrerade i plattformen</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {minaInventarie.filter(it => it.kategori === "Maskiner" || it.kategori === "Fordon").map(it => {
                const sf = STATUS_FARG[it.status]
                const tillg = it.status === "Tillgänglig"
                return (
                  <div key={it.id} style={{display:"flex",alignItems:"center",gap:12,background:C.bg,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px"}}>
                    <InvFoto item={it} size={48}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                        <span style={{fontSize:10,padding:"1px 6px",borderRadius:6,background:`${it.farg}15`,color:it.farg,fontWeight:500,letterSpacing:".3px"}}>{it.kategori}</span>
                        <span style={{fontSize:10,padding:"1px 6px",borderRadius:6,background:sf.bg,color:sf.fg,fontWeight:600,letterSpacing:".3px"}}>{tillg ? "● Tillgänglig" : "● Bokad"}</span>
                      </div>
                      <div style={{fontSize:13,fontWeight:500,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.namn}</div>
                    </div>
                    {tillg && isChef && (
                      <button onClick={() => setForfraganOpen(it)} style={{background:C.ac,color:"#fff",border:"none",borderRadius:8,padding:"6px 10px",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Hyra</button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </Sektion>

        {/* 4. TIDIGARE JOBB */}
        <Sektion titel={`Tidigare jobb (${tidigareJobb.length})`} subtitle="Avslutade projekt — visar erfarenhet och trovärdighet">
          {tidigareJobb.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga avslutade projekt visas</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {tidigareJobb.map((p, i) => (
                <div key={i} style={{background:C.bg,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px"}}>
                  <div style={{fontSize:13.5,fontWeight:500,color:C.tx}}>{p.namn}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:3}}>📍 {p.plats} · {p.typ}</div>
                  <div style={{fontSize:11,color:C.ac,marginTop:2,fontWeight:500}}>{p.period}</div>
                </div>
              ))}
            </div>
          )}
        </Sektion>

        {/* 5. RECENSIONER */}
        <Sektion titel={`Recensioner (${minaRec.length})`} action={isChef && <button onClick={() => setRecOpen(true)} style={miniBtn}>+ Skriv recension</button>}>
          {b && (
            <div style={{background:C.bg,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
                <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>SNITTBETYG</div>
                <div style={{fontSize:13,fontWeight:600,color:"#b88a00"}}>{b.snitt.toFixed(1)} / 5</div>
              </div>
              <BetygRad label="Kvalitet"      v={b.kvalitet}/>
              <BetygRad label="Punktlighet"   v={b.punktlighet}/>
              <BetygRad label="Kommunikation" v={b.kommunikation}/>
            </div>
          )}
          {minaRec.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga recensioner ännu</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {minaRec.map(r => (
                <div key={r.id} style={{background:C.bg,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:6}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,color:C.tx}}>{r.forfattareNamn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:1}}>{r.projektNamn} · {r.datum}</div>
                    </div>
                    <Stjarnor n={(r.betyg.kvalitet + r.betyg.punktlighet + r.betyg.kommunikation) / 3}/>
                  </div>
                  <div style={{fontSize:13,color:C.tx,lineHeight:1.5,marginTop:6,fontStyle:"italic"}}>"{r.kommentar}"</div>
                  <div style={{display:"flex",gap:10,marginTop:8,fontSize:10.5,color:C.mu}}>
                    <span>Kvalitet <span style={{color:"#f5b400"}}>{"★".repeat(r.betyg.kvalitet)}</span></span>
                    <span>Punkt. <span style={{color:"#f5b400"}}>{"★".repeat(r.betyg.punktlighet)}</span></span>
                    <span>Komm. <span style={{color:"#f5b400"}}>{"★".repeat(r.betyg.kommunikation)}</span></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Sektion>
      </div>

      {recOpen && <LaggTillRecensionModal foretag={foretag} user={user} onSave={(rec) => { onAddRecension(rec); setRecOpen(false) }} onClose={() => setRecOpen(false)}/>}
      {forfraganOpen && <SkickaForfraganModal foretag={foretag} item={forfraganOpen} projekt={projekt} onSend={(p) => { onSkickaForfragan(foretag.id, forfraganOpen.id, p); setForfraganOpen(null); setForfraganSuccess(true); setTimeout(() => setForfraganSuccess(false), 3000) }} onClose={() => setForfraganOpen(null)}/>}
      {forfraganSuccess && (
        <div style={{position:"fixed",bottom:78,left:"50%",transform:"translateX(-50%)",background:C.ok,color:"#fff",padding:"10px 18px",borderRadius:20,fontSize:13,fontWeight:500,zIndex:200,boxShadow:"0 6px 20px rgba(46,125,50,.3)"}}>✓ Förfrågan skickad</div>
      )}
    </div>
  )
}

function BetygRad({label, v}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,marginTop:5}}>
      <div style={{fontSize:11,color:C.mu,minWidth:90,fontWeight:500}}>{label}</div>
      <div style={{flex:1,height:6,background:C.bg3,borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(v/5)*100}%`,background:"#f5b400",borderRadius:3}}/>
      </div>
      <div style={{fontSize:12,fontWeight:600,minWidth:32,textAlign:"right"}}>{v.toFixed(1)}</div>
    </div>
  )
}

// Publik vy av anställd (slim) — bara kompetenser, certifikat, erfarenhet, tidigare projekt
function ForetagsAnstalldPublik({anstalld, anstalldDokument, anstalldaProfil, projekteringBokningar, projekt, foretagId, navigate}) {
  if (!anstalld) return <div style={{padding:30,textAlign:"center"}}>Person hittades inte</div>
  const profil = anstalldaProfil[anstalld.id] || {erfarenheter:[], maskiner:[]}
  const certs = anstalldDokument.filter(d => d.anstalldId === anstalld.id)
  const giltgaCerts = certs.filter(c => !c.giltigTill || dagarTillUtgang(c.giltigTill) > 0)
  // Tidigare projekt
  const minaBokningar = projekteringBokningar.filter(b => b.anstalldId === anstalld.id)
  const projektStat = {}
  minaBokningar.forEach(b => {
    const p = projekt.find(x => x.id === b.projektId)
    if (!p) return
    if (!projektStat[b.projektId]) projektStat[b.projektId] = {projekt:p, veckor:[]}
    projektStat[b.projektId].veckor.push(b.vecka)
  })
  const tidigareProjekt = Object.values(projektStat).sort((a, b) => Math.min(...b.veckor) - Math.min(...a.veckor))

  return (
    <div>
      <IntranetHdr title="Publik profil" navigate={navigate} back="foretag-profil" subtitle="Begränsad info — bara branschrelevant"/>

      <div style={{padding:"22px 20px 8px",textAlign:"center"}}>
        <IniAvatar name={anstalld.name} size={84}/>
        <h1 style={{fontSize:21,fontWeight:600,marginTop:12,marginBottom:4}}>{anstalld.name}</h1>
        <div style={{fontSize:13,color:C.mu}}>{anstalld.roll}</div>
      </div>

      <div style={{padding:"16px 20px 24px"}}>
        {/* Kompetenser */}
        <Sektion titel="Kompetenser">
          {!profil.erfarenheter || profil.erfarenheter.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga arbetsområden registrerade</div>
          ) : (
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {[...profil.erfarenheter].sort((a, b) => b.ar - a.ar).map((e, i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(91,156,246,.08)",border:"1px solid rgba(91,156,246,.25)",borderRadius:14,padding:"6px 12px"}}>
                  <span style={{fontSize:13,fontWeight:500,color:"#3470cf"}}>{e.typ}</span>
                  <span style={{fontSize:11,color:C.mu,background:C.bg,padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.ar}å</span>
                </div>
              ))}
            </div>
          )}
        </Sektion>

        {/* Maskiner */}
        {profil.maskiner && profil.maskiner.length > 0 && (
          <Sektion titel="Kan köra maskiner & fordon">
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {profil.maskiner.map(m => (
                <span key={m} style={{fontSize:12,fontWeight:500,color:"#b88a00",background:"rgba(232,184,75,.1)",border:"1px solid rgba(232,184,75,.3)",borderRadius:14,padding:"6px 12px"}}>🚜 {m}</span>
              ))}
            </div>
          </Sektion>
        )}

        {/* Certifikat — bara giltiga */}
        <Sektion titel={`Giltiga certifikat (${giltgaCerts.length})`}>
          {giltgaCerts.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga giltiga certifikat registrerade</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {giltgaCerts.map(c => (
                <div key={c.id} style={{display:"flex",alignItems:"center",gap:10,background:C.bg,border:`1px solid ${C.b}`,borderRadius:8,padding:"10px 12px"}}>
                  <div style={{width:32,height:40,background:"rgba(224,82,82,.08)",border:"1px solid rgba(224,82,82,.25)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:C.da,flexShrink:0,letterSpacing:".2px"}}>PDF</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:10,color:C.ac,fontWeight:500,letterSpacing:".3px"}}>{c.typ}</div>
                    <div style={{fontSize:13,fontWeight:500,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.titel}</div>
                    <div style={{fontSize:10.5,color:C.mu,marginTop:2}}>{c.utfardatAv}{c.giltigTill && ` · giltigt till ${c.giltigTill}`}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Sektion>

        {/* Tidigare projekt */}
        <Sektion titel={`Tidigare projekt (${tidigareProjekt.length})`}>
          {tidigareProjekt.length === 0 ? (
            <div style={{padding:14,textAlign:"center",color:C.mu,fontSize:13}}>Inga projekt registrerade</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {tidigareProjekt.map(({projekt:p, veckor}) => {
                const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
                const vekSort = [...veckor].sort((a,b) => a-b)
                return (
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,background:c.bg,border:`1px solid ${c.border}`,borderRadius:10,padding:"10px 12px"}}>
                    <div style={{width:5,height:34,borderRadius:3,background:c.text,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,color:c.text}}>{p.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>📍 {p.plats} · V{vekSort[0]}–V{vekSort[vekSort.length-1]}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Sektion>
      </div>
    </div>
  )
}

function LaggTillRecensionModal({foretag, user, onSave, onClose}) {
  const [betyg, setBetyg] = useState({kvalitet: 0, punktlighet: 0, kommunikation: 0})
  const [projektNamn, setProjektNamn] = useState("")
  const [kommentar, setKommentar] = useState("")
  const valid = betyg.kvalitet > 0 && betyg.punktlighet > 0 && betyg.kommunikation > 0 && projektNamn.trim() && kommentar.trim()
  function spara() {
    if (!valid) return
    onSave({foretagId: foretag.id, forfattareNamn: user?.foretag || user?.name || "Beställare", projektNamn, kommentar, betyg, datum: "2026-05-25"})
  }
  function setKategoriBetyg(kat, v) { setBetyg(b => ({...b, [kat]: v})) }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:4}}>SKRIV RECENSION</div>
        <div style={{textAlign:"center",fontSize:14,fontWeight:600,marginBottom:14}}>{foretag.namn}</div>

        <label style={lbl}>Projekt *</label>
        <input style={{...inp,marginBottom:14}} value={projektNamn} onChange={e => setProjektNamn(e.target.value)} placeholder="t.ex. Botniabanan etapp 3"/>

        {[
          {k:"kvalitet",     l:"Kvalitet"},
          {k:"punktlighet",  l:"Punktlighet"},
          {k:"kommunikation",l:"Kommunikation"},
        ].map(({k, l}) => (
          <div key={k} style={{marginBottom:10}}>
            <label style={lbl}>{l} *</label>
            <div style={{display:"flex",gap:4}}>
              {[1,2,3,4,5].map(i => (
                <button key={i} onClick={() => setKategoriBetyg(k, i)} style={{flex:1,background:i<=betyg[k]?"rgba(245,180,0,.1)":C.bg2,border:`1px solid ${i<=betyg[k]?"#f5b400":C.b}`,borderRadius:8,padding:"10px 0",cursor:"pointer",fontFamily:"inherit",fontSize:20,color:i<=betyg[k]?"#f5b400":C.b2}}>★</button>
              ))}
            </div>
          </div>
        ))}

        <label style={lbl}>Kommentar *</label>
        <textarea style={{...inp,height:90,resize:"none",marginBottom:14}} value={kommentar} onChange={e => setKommentar(e.target.value)} placeholder="Hur fungerade samarbetet?"/>

        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={spara} disabled={!valid} style={{...btnP,flex:1}}>Publicera</button>
        </div>
      </div>
    </div>
  )
}

function SkickaForfraganModal({foretag, item, projekt, onSend, onClose}) {
  const [projektId, setProjektId] = useState(null)
  const [meddelande, setMeddelande] = useState("")
  const valid = projektId && meddelande.trim()
  const aktivaProjekt = projekt.filter(p => p.status === "Pågående" || p.status === "Planering")
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:4}}>HYRESFÖRFRÅGAN</div>
        <div style={{textAlign:"center",fontSize:13,color:C.tx,marginBottom:14}}>{item.namn} · {foretag.namn}</div>

        <label style={lbl}>För vilket projekt? *</label>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
          {aktivaProjekt.map(p => {
            const c = PROJECT_PALETTE[p.farg % PROJECT_PALETTE.length]
            const sel = projektId === p.id
            return (
              <button key={p.id} onClick={() => setProjektId(p.id)} style={{display:"flex",alignItems:"center",gap:10,background:sel?c.bg:C.bg2,border:`1px solid ${sel?c.text:C.b}`,borderRadius:8,padding:"8px 10px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                <div style={{width:5,height:30,borderRadius:3,background:c.text,flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,color:sel?c.text:C.tx}}>{p.namn}</div>
                  <div style={{fontSize:11,color:C.mu}}>📍 {p.plats}</div>
                </div>
                {sel && <span style={{color:c.text,fontSize:16,fontWeight:700}}>✓</span>}
              </button>
            )
          })}
        </div>

        <label style={lbl}>Meddelande *</label>
        <textarea style={{...inp,height:80,resize:"none",marginBottom:14}} value={meddelande} onChange={e => setMeddelande(e.target.value)} placeholder="Period, omfattning, övriga önskemål..."/>

        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={() => valid && onSend({projektId, meddelande})} disabled={!valid} style={{...btnP,flex:1}}>📤 Skicka förfrågan</button>
        </div>
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
// ChefAvvikelser — hanteringsvy för foretag/beställare. Ingen rapportering.
// Dashboard + 3 flikar: Inkomna (oassignerade), Delegerade, Klara.
// ═══════════════════════════════════════════════════════════════════════
function ChefAvvikelser({user, avvikelser, projekt, onDelegera, onMarkeraAtgardad, onAteroppna}) {
  const [tab, setTab] = useState("inkomna") // inkomna | delegerade | klara
  const [delegeraOpen, setDelegeraOpen] = useState(null) // avvikelse-id som ska delegeras

  // Klassificera per fliksektion
  const inkomna     = avvikelser.filter(a => a.status === "open"   && !a.ansvarigId)
  const delegerade  = avvikelser.filter(a => a.status === "open"   &&  a.ansvarigId)
  const klara       = avvikelser.filter(a => a.status === "closed")

  const TABS = [
    {id:"inkomna",    e:"🔴", l:"Inkomna",    n:inkomna.length,    fg:C.da,      bg:"rgba(224,82,82,.08)",  br:"rgba(224,82,82,.35)"},
    {id:"delegerade", e:"🟡", l:"Delegerade", n:delegerade.length, fg:"#b88a00", bg:"rgba(232,184,75,.1)",  br:"rgba(232,184,75,.4)"},
    {id:"klara",      e:"✅", l:"Klara",      n:klara.length,      fg:C.ok,      bg:"rgba(46,125,50,.08)",  br:"rgba(46,125,50,.3)"},
  ]
  const visa = tab === "inkomna" ? inkomna : tab === "delegerade" ? delegerade : klara
  const sorted = [...visa].sort((a, b) => (b.datum || "").localeCompare(a.datum || ""))

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Avvikelser</h1>
        <div style={{fontSize:13,color:C.mu,marginTop:2,marginBottom:14}}>Hantera inkommande, delegera och följ upp</div>
      </div>

      {/* Dashboard — 3 stora siffror, färgkodade */}
      <div style={{padding:"0 20px 14px",display:"flex",gap:8}}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{flex:1,background:t.bg,border:`1.5px solid ${tab===t.id?t.fg:t.br}`,borderRadius:12,padding:"12px 8px",cursor:"pointer",fontFamily:"inherit",textAlign:"center"}}>
            <div style={{fontSize:18,lineHeight:1,marginBottom:6}}>{t.e}</div>
            <div style={{fontSize:24,fontWeight:700,color:t.fg,lineHeight:1}}>{t.n}</div>
            <div style={{fontSize:10,color:t.fg,fontWeight:600,letterSpacing:".5px",marginTop:5,textTransform:"uppercase"}}>{t.l}</div>
          </button>
        ))}
      </div>

      {/* Flikar */}
      <div style={{padding:"0 20px 16px",display:"flex",gap:6,borderBottom:`1px solid ${C.b}`,marginBottom:14}}>
        {TABS.map(t => {
          const sel = tab === t.id
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{flex:1,padding:"10px 4px",border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:sel?600:400,color:sel?t.fg:C.mu,borderBottom:`2px solid ${sel?t.fg:"transparent"}`,marginBottom:-1}}>{t.e} {t.l} ({t.n})</button>
          )
        })}
      </div>

      <div style={{padding:"0 20px 24px"}}>
        {sorted.length === 0 ? (
          <div style={{padding:40,textAlign:"center",color:C.mu,fontSize:13}}>
            {tab === "inkomna"    && "Inga inkomna avvikelser — bra jobbat!"}
            {tab === "delegerade" && "Inga pågående delegationer"}
            {tab === "klara"      && "Inga avslutade ärenden ännu"}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {sorted.map(a => <AvvikelseKort key={a.id} a={a} tab={tab} onDelegera={() => setDelegeraOpen(a.id)} onKlar={() => onMarkeraAtgardad(a.id, user?.name || "Chef")} onAteroppna={() => onAteroppna(a.id)}/>)}
          </div>
        )}
      </div>

      {/* Delegera-modal */}
      {delegeraOpen && (
        <DelegeraModal
          avvikelse={avvikelser.find(a => a.id === delegeraOpen)}
          onDelegera={(ansvarigId, ansvarigNamn) => { onDelegera(delegeraOpen, ansvarigId, ansvarigNamn); setDelegeraOpen(null) }}
          onClose={() => setDelegeraOpen(null)}
        />
      )}
    </div>
  )
}

// — Avvikelse-kort som anpassar sig till aktuell flik —
function AvvikelseKort({a, tab, onDelegera, onKlar, onAteroppna}) {
  const fargkant = tab === "inkomna" ? "rgba(224,82,82,.35)" : tab === "delegerade" ? "rgba(232,184,75,.4)" : "rgba(46,125,50,.3)"
  return (
    <div style={{background:C.bg2,border:`1px solid ${fargkant}`,borderRadius:12,padding:"14px 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8,gap:8}}>
        <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>#{a.id} · {a.datum}</div>
        {tab === "inkomna" && <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(224,82,82,.15)",color:C.da,fontWeight:600,letterSpacing:".3px"}}>● NY</span>}
        {tab === "delegerade" && <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(232,184,75,.18)",color:"#b88a00",fontWeight:600,letterSpacing:".3px"}}>● PÅGÅR</span>}
        {tab === "klara" && <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"rgba(46,125,50,.12)",color:C.ok,fontWeight:600,letterSpacing:".3px"}}>✓ KLAR</span>}
      </div>

      <div style={{fontSize:14,color:C.tx,lineHeight:1.5,marginBottom:10}}>{a.text}</div>

      {/* Meta-rader */}
      <div style={{display:"flex",flexDirection:"column",gap:4,fontSize:12,color:C.mu,marginBottom:a.photo?10:12}}>
        <div>👤 Rapporterad av <span style={{color:C.tx,fontWeight:500}}>{a.av}</span></div>
        {a.km && <div>📍 Km-läge: <span style={{color:C.tx,fontWeight:500}}>{a.km}</span></div>}
        {a.gps && <div>🛰 GPS: <span style={{color:C.tx,fontWeight:500}}>{a.gps.lat.toFixed(4)}, {a.gps.lng.toFixed(4)}</span></div>}
        {tab !== "inkomna" && a.ansvarigNamn && (
          <div>🎯 Ansvarig: <span style={{color:C.tx,fontWeight:500}}>{a.ansvarigNamn}</span>{a.delegeradTid && <span> · delegerad {a.delegeradTid}</span>}</div>
        )}
        {tab === "klara" && a.atgardadAv && (
          <div>✓ Åtgärdad av <span style={{color:C.ok,fontWeight:500}}>{a.atgardadAv}</span>{a.atgardadTid && <span> · {a.atgardadTid}</span>}</div>
        )}
      </div>

      {a.photo && (
        <div style={{marginBottom:12}}>
          <img src={a.photo} alt="" style={{width:"100%",maxHeight:180,objectFit:"cover",borderRadius:8,border:`1px solid ${C.b}`}}/>
        </div>
      )}

      {/* Knappar — kontextuella per flik */}
      <div style={{display:"flex",gap:8}}>
        {tab === "inkomna" && (
          <button onClick={onDelegera} style={{...btnP,flex:1,padding:"10px",fontSize:13}}>🎯 Delegera</button>
        )}
        {tab === "delegerade" && (
          <button onClick={onKlar} style={{...btnP,flex:1,padding:"10px",fontSize:13,background:C.ok}}>✓ Markera klar</button>
        )}
        {tab === "klara" && (
          <button onClick={onAteroppna} style={{...btnG,flex:1,padding:"10px",fontSize:13}}>↻ Återöppna</button>
        )}
      </div>
    </div>
  )
}

// — DelegeraModal — välj arbetsledare som ansvarig —
function DelegeraModal({avvikelse, onDelegera, onClose}) {
  const arbetsledare = INIT_KONTAKTER.filter(k => k.roll === "Arbetsledare")
  const [valdId, setValdId] = useState(null)
  if (!avvikelse) return null
  function bekrafta() {
    if (!valdId) return
    const a = INIT_KONTAKTER.find(k => k.id === valdId)
    if (a) onDelegera(a.id, a.name)
  }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:6}}>DELEGERA AVVIKELSE</div>
        <div style={{textAlign:"center",fontSize:13,color:C.tx,marginBottom:4,lineHeight:1.4,fontWeight:500}}>#{avvikelse.id}</div>
        <div style={{textAlign:"center",fontSize:12,color:C.mu,marginBottom:16,lineHeight:1.4,fontStyle:"italic"}}>"{avvikelse.text.slice(0, 80)}{avvikelse.text.length > 80 ? "..." : ""}"</div>

        <div style={{fontSize:11,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:8}}>VÄLJ ANSVARIG ARBETSLEDARE</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
          {arbetsledare.map(a => {
            const sel = valdId === a.id
            return (
              <button key={a.id} onClick={() => setValdId(a.id)} style={{display:"flex",alignItems:"center",gap:10,background:sel?"rgba(21,101,192,.08)":C.bg2,border:`1px solid ${sel?C.ac:C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                <IniAvatar name={a.name} size={36}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:500,color:sel?C.ac:C.tx}}>{a.name}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:1}}>{a.roll} · {a.tel}</div>
                </div>
                {sel && <span style={{fontSize:18,color:C.ac,fontWeight:700}}>✓</span>}
              </button>
            )
          })}
        </div>

        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={bekrafta} disabled={!valdId} style={{...btnP,flex:1}}>🎯 Delegera</button>
        </div>
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
// AVVIKELSER — ny rollbaserad logik
// • ArbetareAvvikelser: behåller befintlig Avvikelser (form + lista) + ny
//   "Delegerade till dig"-sektion med 2-stegs-flöde (Markera sedd → Markera klar)
// • ArbetsledareAvvikelser: 3 statussiffror + lista med delegera-knapp + timeline
// • BestallareAvvikelser: read-only 3 statussiffror + lista med nuvarande status
// ═══════════════════════════════════════════════════════════════════════

// — Klassificera en avvikelse till en av fyra status-faser —
function avvikelseFas(a) {
  if (a.status === "closed") return "klar"
  if (a.ansvarigId && a.seddTid) return "sedd"
  if (a.ansvarigId) return "delegerad"
  return "inkommen"
}

// — Färgsystem per fas —
const FAS_FARG = {
  inkommen:   {fg:C.da,      bg:"rgba(224,82,82,.08)",  br:"rgba(224,82,82,.35)",  e:"🔴", l:"Inkommen"},
  delegerad:  {fg:"#b88a00", bg:"rgba(232,184,75,.1)",  br:"rgba(232,184,75,.4)",  e:"🟡", l:"Delegerad"},
  sedd:       {fg:"#1565c0", bg:"rgba(91,156,246,.08)", br:"rgba(91,156,246,.35)", e:"👁",  l:"Sedd · åtgärdas"},
  klar:       {fg:C.ok,      bg:"rgba(46,125,50,.08)",  br:"rgba(46,125,50,.3)",   e:"✅", l:"Klar"},
}

// ─────────────────────────────────────────────────────────────────────────
// ARBETARE — Röd sticky-banner HÖGST UPP med delegerade-att-åtgärda + form
// ─────────────────────────────────────────────────────────────────────────
function ArbetareAvvikelser({user, avvikelser, onAdd, onStang, onMarkSedd, onMarkeraKlart}) {
  const aid = getAnstalldId(user)
  const minaDelegerade = avvikelser.filter(a => a.ansvarigId === aid && a.status === "open")
  const minaAvslutade  = avvikelser.filter(a => a.ansvarigId === aid && a.status === "closed")

  return (
    <div>
      {/* 🔴 STICKY RÖD BANNER + KORT — högst upp, syns hela tiden */}
      {minaDelegerade.length > 0 && (
        <div style={{
          position:"sticky",
          top:0,
          zIndex:20,
          background:C.bg,
          paddingBottom:0,
          borderBottom:`1px solid ${C.b}`,
          boxShadow:"0 4px 14px rgba(0,0,0,.06)",
        }}>
          <div style={{padding:"16px 20px 14px"}}>
            <div style={{
              display:"flex",alignItems:"center",gap:12,
              background:"rgba(224,82,82,.08)",
              border:"1.5px solid rgba(224,82,82,.4)",
              borderRadius:12,
              padding:"14px 16px",
            }}>
              <span style={{fontSize:26,lineHeight:1}}>🔴</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15.5,fontWeight:700,color:C.da,letterSpacing:"-.1px",lineHeight:1.3}}>
                  Du har {minaDelegerade.length} avvikelse{minaDelegerade.length === 1 ? "" : "r"} att åtgärda
                </div>
                <div style={{fontSize:12,color:C.mu,marginTop:3,lineHeight:1.4}}>
                  Tryck igenom stegen för varje avvikelse nedan
                </div>
              </div>
            </div>
          </div>
          <div style={{padding:"0 20px 16px",display:"flex",flexDirection:"column",gap:10}}>
            {minaDelegerade.map(a => (
              <ArbetareDelegeradKort
                key={a.id}
                a={a}
                userName={user.name}
                onMarkSedd={onMarkSedd}
                onMarkeraKlart={onMarkeraKlart}
              />
            ))}
          </div>
        </div>
      )}

      {/* ✅ GRÖN RAD — om användaren har avslutat delegerade men inga öppna kvar */}
      {minaDelegerade.length === 0 && minaAvslutade.length > 0 && (
        <div style={{padding:"16px 20px 0"}}>
          <div style={{
            display:"flex",alignItems:"center",gap:12,
            background:"rgba(46,125,50,.08)",
            border:"1px solid rgba(46,125,50,.3)",
            borderRadius:12,
            padding:"12px 16px",
          }}>
            <span style={{fontSize:22,lineHeight:1}}>✅</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:600,color:C.ok,letterSpacing:"-.1px"}}>
                Inga avvikelser att åtgärda
              </div>
              <div style={{fontSize:12,color:C.mu,marginTop:2}}>
                Du har slutfört {minaAvslutade.length} delegera{minaAvslutade.length === 1 ? "d" : "de"} avvikels{minaAvslutade.length === 1 ? "e" : "er"} — bra jobbat!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Befintlig form + lista — orörd, renderas alltid */}
      <Avvikelser role="arbetare" user={user} avvikelser={avvikelser} onAdd={onAdd} onStang={onStang}/>
    </div>
  )
}

function ArbetareDelegeradKort({a, userName, onMarkSedd, onMarkeraKlart}) {
  const harSetts = !!a.seddTid

  // Status-text per steg
  const statusText = harSetts
    ? "Sedd — markera klar när jobbet är åtgärdat"
    : "Väntar på att du markerar sedd"

  return (
    <div style={{
      background:"#fff",
      border:`1px solid ${C.b}`,
      borderLeft:`5px solid ${C.da}`,
      borderRadius:10,
      padding:"14px 16px",
      boxShadow:"0 1px 3px rgba(0,0,0,.04)",
    }}>
      {/* Status-badge överst */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:10}}>
        <span style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>#{a.id}</span>
        <span style={{fontSize:10.5,padding:"3px 9px",borderRadius:10,background:harSetts?"rgba(91,156,246,.18)":"rgba(232,184,75,.22)",color:harSetts?"#1565c0":"#b88a00",fontWeight:700,letterSpacing:".3px"}}>
          {harSetts ? "👁️ STEG 2 — MARKERA KLAR" : "🟡 STEG 1 — MARKERA SEDD"}
        </span>
      </div>

      {/* Beskrivning */}
      <div style={{fontSize:14.5,lineHeight:1.5,marginBottom:10,fontWeight:500,color:C.tx}}>{a.text}</div>

      {/* Plats/km-läge */}
      {(a.km || a.gps) && (
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
          {a.km && <span style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"4px 9px",borderRadius:6,border:"1px solid rgba(232,184,75,.2)"}}>📍 {a.km}</span>}
          {a.gps && <span style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"4px 9px",borderRadius:6,border:"1px solid rgba(232,184,75,.2)"}}>🛰 {a.gps.lat.toFixed(5)}, {a.gps.lng.toFixed(5)}</span>}
        </div>
      )}

      {a.photo && <img src={a.photo} alt="" style={{width:"100%",borderRadius:8,maxHeight:200,objectFit:"cover",marginBottom:10,display:"block"}}/>}

      {/* Rapporterad av + delegerad av */}
      <div style={{fontSize:12,color:C.mu,marginBottom:10,lineHeight:1.55,padding:"8px 10px",background:C.bg2,borderRadius:8,border:`1px solid ${C.b}`}}>
        <div>👷 Rapporterad av <strong style={{color:C.tx,fontWeight:600}}>{a.av}</strong> · {a.datum}</div>
        {a.delegeradAv && <div style={{marginTop:3}}>👤 Delegerad till dig av <strong style={{color:C.tx,fontWeight:600}}>{a.delegeradAv}</strong>{a.delegeradTid && <span> · {a.delegeradTid}</span>}</div>}
        {harSetts && <div style={{marginTop:3,color:"#1565c0"}}>👁️ Sedd av dig · {a.seddTid}</div>}
      </div>

      {/* Status-text */}
      <div style={{
        fontSize:12,
        color:harSetts?"#1565c0":"#b88a00",
        fontWeight:500,
        marginBottom:12,
        padding:"6px 10px",
        background:harSetts?"rgba(91,156,246,.06)":"rgba(232,184,75,.08)",
        border:`1px dashed ${harSetts?"rgba(91,156,246,.3)":"rgba(232,184,75,.4)"}`,
        borderRadius:6,
        lineHeight:1.4,
      }}>
        Status: {statusText}
      </div>

      {/* Två-stegs knappar */}
      <div style={{display:"flex",gap:8}}>
        {!harSetts && (
          <button
            onClick={() => onMarkSedd(a.id, userName)}
            style={{
              flex:1,
              background:"#e8b84b",
              color:"#3a2c00",
              border:"none",
              padding:"14px",
              borderRadius:10,
              fontSize:14,
              fontWeight:600,
              cursor:"pointer",
              fontFamily:"inherit",
              boxShadow:"0 2px 6px rgba(232,184,75,.3)",
            }}
          >👁️ Markera sedd</button>
        )}
        <button
          onClick={harSetts ? () => onMarkeraKlart(a.id, userName) : undefined}
          disabled={!harSetts}
          style={{
            flex:1,
            background: harSetts ? C.ok : C.bg3,
            color: harSetts ? "#fff" : C.mu,
            border: harSetts ? "none" : `1px solid ${C.b}`,
            padding:"14px",
            borderRadius:10,
            fontSize:14,
            fontWeight:600,
            cursor: harSetts ? "pointer" : "not-allowed",
            fontFamily:"inherit",
            opacity: harSetts ? 1 : 0.6,
            boxShadow: harSetts ? "0 2px 6px rgba(46,125,50,.3)" : "none",
          }}
        >
          {harSetts ? "✅ Markera klar" : "🔒 Markera klar"}
        </button>
      </div>

      {/* Hint för låst läge */}
      {!harSetts && (
        <div style={{fontSize:11,color:C.mu,marginTop:6,textAlign:"center",fontStyle:"italic",lineHeight:1.4}}>
          "Markera klar" låses upp när du tryckt "Markera sedd"
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// ARBETSLEDARE — delegera + timeline-vy per avvikelse
// ─────────────────────────────────────────────────────────────────────────
function ArbetsledareAvvikelser({user, avvikelser, onDelegera}) {
  const [tab, setTab] = useState("inkomna")
  const [delegeraOpen, setDelegeraOpen] = useState(null)

  const inkomna     = avvikelser.filter(a => avvikelseFas(a) === "inkommen")
  const delegerade  = avvikelser.filter(a => avvikelseFas(a) === "delegerad" || avvikelseFas(a) === "sedd")
  const klara       = avvikelser.filter(a => avvikelseFas(a) === "klar")

  const TABS = [
    {id:"inkomna",    e:"🔴", l:"Inkomna",    n:inkomna.length,    fg:C.da,      bg:"rgba(224,82,82,.08)",  br:"rgba(224,82,82,.35)"},
    {id:"delegerade", e:"🟡", l:"Delegerade", n:delegerade.length, fg:"#b88a00", bg:"rgba(232,184,75,.1)",  br:"rgba(232,184,75,.4)"},
    {id:"klara",      e:"✅", l:"Klara",      n:klara.length,      fg:C.ok,      bg:"rgba(46,125,50,.08)",  br:"rgba(46,125,50,.3)"},
  ]
  const visa = tab === "inkomna" ? inkomna : tab === "delegerade" ? delegerade : klara
  const sorted = [...visa].sort((a, b) => (b.datum || "").localeCompare(a.datum || ""))

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Avvikelser</h1>
        <div style={{fontSize:13,color:C.mu,marginTop:2,marginBottom:14}}>Delegera till arbetare och följ flödet</div>
      </div>

      {/* Stat-dashboard */}
      <div style={{padding:"0 20px 14px",display:"flex",gap:8}}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{flex:1,background:t.bg,border:`1.5px solid ${tab===t.id?t.fg:t.br}`,borderRadius:12,padding:"12px 8px",cursor:"pointer",fontFamily:"inherit",textAlign:"center"}}>
            <div style={{fontSize:18,lineHeight:1,marginBottom:6}}>{t.e}</div>
            <div style={{fontSize:24,fontWeight:700,color:t.fg,lineHeight:1}}>{t.n}</div>
            <div style={{fontSize:10,color:t.fg,fontWeight:600,letterSpacing:".5px",marginTop:5,textTransform:"uppercase"}}>{t.l}</div>
          </button>
        ))}
      </div>

      {/* Flikar */}
      <div style={{padding:"0 20px 16px",display:"flex",gap:6,borderBottom:`1px solid ${C.b}`,marginBottom:14}}>
        {TABS.map(t => {
          const sel = tab === t.id
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{flex:1,padding:"10px 4px",border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:sel?600:400,color:sel?t.fg:C.mu,borderBottom:`2px solid ${sel?t.fg:"transparent"}`,marginBottom:-1}}>{t.e} {t.l} ({t.n})</button>
          )
        })}
      </div>

      <div style={{padding:"0 20px 24px"}}>
        {sorted.length === 0 ? (
          <div style={{padding:40,textAlign:"center",color:C.mu,fontSize:13}}>
            {tab === "inkomna"    && "Inga inkomna avvikelser — bra jobbat!"}
            {tab === "delegerade" && "Inga pågående delegationer"}
            {tab === "klara"      && "Inga avslutade ärenden ännu"}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {sorted.map(a => (
              <ArbetsledareAvvikelseKort
                key={a.id}
                a={a}
                visarDelegera={avvikelseFas(a) === "inkommen"}
                onDelegera={() => setDelegeraOpen(a.id)}
              />
            ))}
          </div>
        )}
      </div>

      {delegeraOpen && (
        <DelegeraTillArbetareModal
          avvikelse={avvikelser.find(a => a.id === delegeraOpen)}
          delegeraAv={user.name}
          onDelegera={(ansvarigId, ansvarigNamn) => { onDelegera(delegeraOpen, ansvarigId, ansvarigNamn, user.name); setDelegeraOpen(null) }}
          onClose={() => setDelegeraOpen(null)}
        />
      )}
    </div>
  )
}

// — Kort med fullt timeline-flöde (för arbetsledare och beställare) —
function AvvikelseTimeline({a, kompakt = false}) {
  const fas = avvikelseFas(a)
  const steps = [
    {id:"inkommen",  l:"Inkommen",  done:true, e:"✓", tid:a.datum,        vem:a.av,            beskr:`rapporterad av ${a.av}`},
    {id:"delegerad", l:"Delegerad", done:!!a.ansvarigId, e:a.ansvarigId?"✓":"⏳", tid:a.delegeradTid, vem:a.ansvarigNamn, beskr:a.ansvarigNamn ? `till ${a.ansvarigNamn}${a.delegeradAv?` av ${a.delegeradAv}`:""}` : "ej delegerad än"},
    {id:"sedd",      l:"Sedd",      done:!!a.seddTid, e:a.seddTid?"✓":"⏳", tid:a.seddTid,        vem:a.ansvarigNamn, beskr:a.seddTid ? `sedd av ${a.ansvarigNamn}` : "ej sedd än"},
    {id:"klar",      l:"Klar",      done:a.status==="closed", e:a.status==="closed"?"✓":"⏳", tid:a.atgardadTid, vem:a.atgardadAv, beskr:a.status==="closed" ? `åtgärdad av ${a.atgardadAv}` : "ej klar"},
  ]
  return (
    <div style={{background:C.bg3,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px",marginBottom:0}}>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {steps.map((s, i) => {
          const cur = fas === s.id && !s.done
          return (
            <div key={s.id} style={{display:"flex",alignItems:"flex-start",gap:8,opacity:s.done?1:cur?1:.5}}>
              <div style={{width:18,height:18,borderRadius:"50%",background:s.done?C.ok:cur?"#b88a00":C.b2,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,marginTop:1}}>{s.done?"✓":cur?"●":""}</div>
              <div style={{flex:1,minWidth:0,fontSize:11.5,lineHeight:1.45}}>
                <span style={{fontWeight:600,color:s.done?C.tx:cur?"#b88a00":C.mu}}>{s.l}</span>
                <span style={{color:C.mu,marginLeft:6}}>{s.beskr}</span>
                {s.tid && <span style={{color:C.mu,marginLeft:6,fontVariantNumeric:"tabular-nums"}}>· {s.tid}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ArbetsledareAvvikelseKort({a, visarDelegera, onDelegera}) {
  const fas = avvikelseFas(a)
  const f = FAS_FARG[fas]
  return (
    <div style={{background:C.bg2,border:`1px solid ${f.br}`,borderRadius:12,padding:"14px 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8,gap:8}}>
        <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>#{a.id} · {a.datum}</div>
        <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:f.bg,color:f.fg,fontWeight:600,letterSpacing:".3px"}}>{f.e} {f.l.toUpperCase()}</span>
      </div>

      <div style={{fontSize:14,color:C.tx,lineHeight:1.5,marginBottom:10}}>{a.text}</div>

      {(a.km || a.gps) && (
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
          {a.km && <span style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"3px 8px",borderRadius:6}}>📍 {a.km}</span>}
          {a.gps && <span style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"3px 8px",borderRadius:6}}>🛰 {a.gps.lat.toFixed(4)}, {a.gps.lng.toFixed(4)}</span>}
        </div>
      )}

      {a.photo && <img src={a.photo} alt="" style={{width:"100%",maxHeight:180,objectFit:"cover",borderRadius:8,marginBottom:10,display:"block"}}/>}

      {/* Realtids-timeline */}
      <AvvikelseTimeline a={a}/>

      {/* Delegera-knapp om inkommen */}
      {visarDelegera && (
        <button onClick={onDelegera} style={{...btnP,padding:"12px",fontSize:13,marginTop:12}}>🎯 Delegera till arbetare</button>
      )}
    </div>
  )
}

// — Delegera-modal som filtrerar till arbetare (ej arbetsledare) —
function DelegeraTillArbetareModal({avvikelse, delegeraAv, onDelegera, onClose}) {
  const arbetare = INIT_KONTAKTER.filter(k => k.roll !== "Arbetsledare")
  const [valdId, setValdId] = useState(null)
  if (!avvikelse) return null
  function bekrafta() {
    if (!valdId) return
    const a = INIT_KONTAKTER.find(k => k.id === valdId)
    if (a) onDelegera(a.id, a.name)
  }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:6}}>DELEGERA TILL ARBETARE</div>
        <div style={{textAlign:"center",fontSize:13,color:C.tx,marginBottom:4,fontWeight:500}}>#{avvikelse.id}</div>
        <div style={{textAlign:"center",fontSize:12,color:C.mu,marginBottom:16,lineHeight:1.4,fontStyle:"italic"}}>"{avvikelse.text.slice(0, 80)}{avvikelse.text.length > 80 ? "..." : ""}"</div>

        <div style={{fontSize:11,color:C.mu,letterSpacing:".3px",fontWeight:500,marginBottom:8}}>VÄLJ ARBETARE</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14,maxHeight:340,overflowY:"auto"}}>
          {arbetare.map(a => {
            const sel = valdId === a.id
            return (
              <button key={a.id} onClick={() => setValdId(a.id)} style={{display:"flex",alignItems:"center",gap:10,background:sel?"rgba(21,101,192,.08)":C.bg2,border:`1px solid ${sel?C.ac:C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                <IniAvatar name={a.name} size={36}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:500,color:sel?C.ac:C.tx}}>{a.name}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:1}}>{a.roll} · {a.tel}</div>
                </div>
                {sel && <span style={{fontSize:18,color:C.ac,fontWeight:700}}>✓</span>}
              </button>
            )
          })}
        </div>

        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={bekrafta} disabled={!valdId} style={{...btnP,flex:1}}>🎯 Delegera</button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// BESTÄLLARE/FÖRETAG — Avvikelser med klickbara filter, sökning, sortering
// + detaljvy + foto-lightbox. Read-only — ingen redigering.
// ═══════════════════════════════════════════════════════════════════════

// — Foto-lightbox för stor visning av thumbnails —
function PhotoLightbox({url, onClose}) {
  if (!url) return null
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20,cursor:"zoom-out"}}>
      <img src={url} alt="" style={{maxWidth:"100%",maxHeight:"100%",borderRadius:6,boxShadow:"0 12px 50px rgba(0,0,0,.5)"}} onClick={e => e.stopPropagation()}/>
      <button onClick={onClose} style={{position:"absolute",top:18,right:18,width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",color:"#fff",fontSize:22,cursor:"pointer",fontFamily:"inherit",padding:0,lineHeight:1,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
    </div>
  )
}

function BestallareAvvikelser({avvikelser, navigate, projekt}) {
  // Filter & sortering — state
  const [statusFilter, setStatusFilter] = useState(null)   // null | "inkommen" | "delegerad" | "klar"
  const [sok, setSok] = useState("")
  const [projektFilter, setProjektFilter] = useState("")
  const [fromDatum, setFromDatum] = useState("")
  const [tillDatum, setTillDatum] = useState("")
  const [rapportFilter, setRapportFilter] = useState("")
  const [sortBy, setSortBy] = useState("datum")
  const [sortDir, setSortDir] = useState("desc")
  const [photoUrl, setPhotoUrl] = useState(null)

  // Statistik baseras alltid på full data (oavsett aktiva filter)
  const inkomna     = avvikelser.filter(a => avvikelseFas(a) === "inkommen")
  const delegerade  = avvikelser.filter(a => ["delegerad","sedd"].includes(avvikelseFas(a)))
  const klara       = avvikelser.filter(a => avvikelseFas(a) === "klar")

  const STAT_KORT = [
    {id:"inkommen",  e:"🔴", l:"Inkomna",    n:inkomna.length,    fg:C.da,      bg:"rgba(224,82,82,.08)",  br:"rgba(224,82,82,.35)"},
    {id:"delegerad", e:"🟡", l:"Delegerade", n:delegerade.length, fg:"#b88a00", bg:"rgba(232,184,75,.1)",  br:"rgba(232,184,75,.4)"},
    {id:"klar",      e:"✅", l:"Klara",      n:klara.length,      fg:C.ok,      bg:"rgba(46,125,50,.08)",  br:"rgba(46,125,50,.3)"},
  ]

  // Unika rapportörer och projekt-IDn ur datan (för dropdowns)
  const rapportorer = [...new Set(avvikelser.map(a => a.av).filter(Boolean))].sort()
  const projektIds  = [...new Set(avvikelser.map(a => a.projektId).filter(Boolean))]
  const projektListan = (projekt || []).filter(p => projektIds.includes(p.id))

  // Filtrering
  const filtrerade = avvikelser.filter(a => {
    if (statusFilter) {
      const fas = avvikelseFas(a)
      if (statusFilter === "delegerad") {
        if (!["delegerad","sedd"].includes(fas)) return false
      } else if (fas !== statusFilter) return false
    }
    if (sok.trim()) {
      const q = sok.toLowerCase()
      const heter = ((a.text||"") + " " + (a.av||"") + " " + (a.km||"") + " " + (a.ansvarigNamn||"")).toLowerCase()
      if (!heter.includes(q)) return false
    }
    if (projektFilter && a.projektId !== projektFilter) return false
    if (fromDatum && (a.datum || "") < fromDatum) return false
    if (tillDatum && (a.datum || "") > tillDatum) return false
    if (rapportFilter && a.av !== rapportFilter) return false
    return true
  })

  // Sortering
  const sorterade = [...filtrerade].sort((a, b) => {
    let cmp = 0
    if (sortBy === "datum") cmp = (a.datum || "").localeCompare(b.datum || "")
    else if (sortBy === "status") {
      const ordning = {inkommen:0, delegerad:1, sedd:2, klar:3}
      cmp = (ordning[avvikelseFas(a)] || 0) - (ordning[avvikelseFas(b)] || 0)
    }
    else if (sortBy === "projekt") cmp = (a.projektId || "").localeCompare(b.projektId || "")
    else if (sortBy === "rapportor") cmp = (a.av || "").localeCompare(b.av || "")
    return sortDir === "asc" ? cmp : -cmp
  })

  function toggleStatus(id) {
    setStatusFilter(curr => curr === id ? null : id)
  }
  function toggleSort(kol) {
    if (sortBy === kol) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortBy(kol); setSortDir("desc") }
  }
  function aterstall() {
    setStatusFilter(null); setSok(""); setProjektFilter("")
    setFromDatum(""); setTillDatum(""); setRapportFilter("")
    setSortBy("datum"); setSortDir("desc")
  }

  const harAktivtFilter = statusFilter || sok.trim() || projektFilter || fromDatum || tillDatum || rapportFilter

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Avvikelser</h1>
        <div style={{fontSize:13,color:C.mu,marginTop:2,marginBottom:14}}>Översikt — läsvy</div>
      </div>

      {/* Klickbara stat-kort — toggle-filter */}
      <div style={{padding:"0 20px 12px",display:"flex",gap:8}}>
        {STAT_KORT.map(s => {
          const aktiv = statusFilter === s.id
          return (
            <button
              key={s.id}
              onClick={() => toggleStatus(s.id)}
              style={{
                flex:1,
                background: aktiv ? s.fg : s.bg,
                border:`2px solid ${aktiv ? s.fg : s.br}`,
                borderRadius:12,
                padding:"12px 8px",
                cursor:"pointer",
                fontFamily:"inherit",
                textAlign:"center",
                color: aktiv ? "#fff" : s.fg,
                transition:"all .12s",
                position:"relative",
              }}
            >
              <div style={{fontSize:18,lineHeight:1,marginBottom:6}}>{s.e}</div>
              <div style={{fontSize:24,fontWeight:700,lineHeight:1,color:aktiv ? "#fff" : s.fg}}>{s.n}</div>
              <div style={{fontSize:10,fontWeight:600,letterSpacing:".5px",marginTop:5,textTransform:"uppercase",color:aktiv ? "#fff" : s.fg}}>{s.l}</div>
              {aktiv && <div style={{position:"absolute",top:6,right:6,fontSize:10,color:"#fff",fontWeight:700}}>✓</div>}
            </button>
          )
        })}
      </div>

      {/* Filterfält */}
      <div style={{padding:"0 20px 12px"}}>
        <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"12px"}}>
          <input
            style={{...inp,marginBottom:8,fontSize:13.5}}
            placeholder="🔍 Sök på beskrivning, plats, km, rapportör..."
            value={sok}
            onChange={e => setSok(e.target.value)}
          />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <select value={projektFilter} onChange={e => setProjektFilter(e.target.value)} style={selStyle}>
              <option value="">Alla projekt</option>
              {projektListan.map(p => <option key={p.id} value={p.id}>{p.namn}</option>)}
            </select>
            <select value={rapportFilter} onChange={e => setRapportFilter(e.target.value)} style={selStyle}>
              <option value="">Alla rapportörer</option>
              {rapportorer.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:8,alignItems:"center"}}>
            <div>
              <div style={{fontSize:10,color:C.mu,fontWeight:600,letterSpacing:".3px",marginBottom:3}}>FRÅN</div>
              <input type="date" value={fromDatum} onChange={e => setFromDatum(e.target.value)} style={{...selStyle,padding:"7px 9px"}}/>
            </div>
            <div>
              <div style={{fontSize:10,color:C.mu,fontWeight:600,letterSpacing:".3px",marginBottom:3}}>TILL</div>
              <input type="date" value={tillDatum} onChange={e => setTillDatum(e.target.value)} style={{...selStyle,padding:"7px 9px"}}/>
            </div>
            <button
              onClick={aterstall}
              disabled={!harAktivtFilter}
              style={{
                background: harAktivtFilter ? "rgba(224,82,82,.08)" : C.bg3,
                border:`1px solid ${harAktivtFilter ? "rgba(224,82,82,.3)" : C.b}`,
                color: harAktivtFilter ? C.da : C.mu,
                padding:"8px 12px",
                borderRadius:8,
                fontSize:12,
                fontWeight:500,
                cursor: harAktivtFilter ? "pointer" : "not-allowed",
                fontFamily:"inherit",
                marginTop:14,
                whiteSpace:"nowrap",
              }}
            >Återställ</button>
          </div>
        </div>
      </div>

      {/* Sortera-rad */}
      <div style={{padding:"0 20px 10px",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
        <span style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginRight:4}}>SORTERA:</span>
        {[
          {id:"datum",     l:"Datum"},
          {id:"status",    l:"Status"},
          {id:"projekt",   l:"Projekt"},
          {id:"rapportor", l:"Rapportör"},
        ].map(k => {
          const aktiv = sortBy === k.id
          return (
            <button
              key={k.id}
              onClick={() => toggleSort(k.id)}
              style={{
                background: aktiv ? "rgba(21,101,192,.1)" : C.bg2,
                border:`1px solid ${aktiv ? C.ac : C.b}`,
                color: aktiv ? C.ac : C.mu,
                padding:"5px 10px",
                borderRadius:14,
                fontSize:11.5,
                fontWeight: aktiv ? 600 : 500,
                cursor:"pointer",
                fontFamily:"inherit",
              }}
            >{k.l}{aktiv && (sortDir === "asc" ? " ↑" : " ↓")}</button>
          )
        })}
      </div>

      {/* Resultat */}
      <div style={{padding:"0 20px 24px"}}>
        <div style={{fontSize:11,fontWeight:500,letterSpacing:".5px",color:C.mu,marginBottom:10,textTransform:"uppercase"}}>
          {harAktivtFilter ? `${sorterade.length} av ${avvikelser.length}` : `Alla avvikelser (${sorterade.length})`}
        </div>
        {sorterade.length === 0 ? (
          <TomState
            emoji="🔍"
            text={harAktivtFilter ? "Inga avvikelser matchade dina filter." : "Inga avvikelser ännu."}
            knapp={harAktivtFilter ? "Återställ filter" : null}
            onKnapp={aterstall}
          />
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {sorterade.map(a => (
              <BestallareAvvikelseKort
                key={a.id}
                a={a}
                projekt={projekt}
                onClick={() => navigate("avvikelse-detalj", a)}
                onPhotoClick={url => setPhotoUrl(url)}
              />
            ))}
          </div>
        )}
      </div>

      <PhotoLightbox url={photoUrl} onClose={() => setPhotoUrl(null)}/>
    </div>
  )
}

const selStyle = {
  background: C.bg,
  border: `1px solid ${C.b}`,
  borderRadius: 8,
  padding: "9px 10px",
  fontSize: 13,
  fontFamily: "inherit",
  color: C.tx,
  width: "100%",
}

// — Listkort: kompakt, alla viktiga fakta synliga —
function BestallareAvvikelseKort({a, projekt, onClick, onPhotoClick}) {
  const fas = avvikelseFas(a)
  const f = FAS_FARG[fas]
  const proj = a.projektId ? (projekt || []).find(p => p.id === a.projektId) : null

  return (
    <button
      onClick={onClick}
      style={{
        display:"block",
        textAlign:"left",
        width:"100%",
        background:C.bg2,
        border:`1px solid ${f.br}`,
        borderRadius:12,
        padding:"14px 16px",
        cursor:"pointer",
        fontFamily:"inherit",
        transition:"border-color .12s",
      }}
    >
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8,gap:8}}>
        <div style={{fontSize:11,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>
          #{a.id} · {a.datum}
          {proj && <span style={{color:C.ac,marginLeft:6}}>· {proj.namn}</span>}
        </div>
        <span style={{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:f.bg,color:f.fg,fontWeight:700,letterSpacing:".3px",whiteSpace:"nowrap"}}>{f.e} {f.l.toUpperCase()}</span>
      </div>

      <div style={{fontSize:14,color:C.tx,lineHeight:1.5,marginBottom:a.km||a.gps||a.photo?10:8}}>{a.text}</div>

      {(a.km || a.gps) && (
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
          {a.km && <span style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"3px 8px",borderRadius:6,border:"1px solid rgba(232,184,75,.2)"}}>📍 {a.km}</span>}
          {a.gps && <span style={{fontSize:12,background:"rgba(232,184,75,.12)",color:C.ac,padding:"3px 8px",borderRadius:6,border:"1px solid rgba(232,184,75,.2)"}}>🛰 {a.gps.lat.toFixed(4)}, {a.gps.lng.toFixed(4)}</span>}
        </div>
      )}

      <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
        <div style={{flex:1,minWidth:0,fontSize:12,color:C.mu,lineHeight:1.55}}>
          <div>👷 <strong style={{color:C.tx,fontWeight:600}}>{a.av}</strong> rapporterade · {a.datum}</div>
          {a.ansvarigNamn && (
            <div style={{marginTop:3}}>
              👤 Delegerad till <strong style={{color:C.tx,fontWeight:600}}>{a.ansvarigNamn}</strong>
              {a.delegeradTid && <span style={{color:C.mu}}> · {a.delegeradTid}</span>}
            </div>
          )}
          {a.seddTid && <div style={{marginTop:2}}>👁️ Sedd · {a.seddTid}</div>}
          {a.atgardadTid && <div style={{marginTop:2,color:C.ok}}>✅ Klar · {a.atgardadTid}</div>}
        </div>
        {a.photo && (
          <button
            onClick={e => { e.stopPropagation(); onPhotoClick(a.photo) }}
            style={{padding:0,background:"none",border:"none",cursor:"pointer",flexShrink:0}}
            title="Klicka för stor vy"
          >
            <img
              src={a.photo}
              alt=""
              style={{width:64,height:64,borderRadius:8,objectFit:"cover",display:"block",border:`1px solid ${C.b}`}}
            />
          </button>
        )}
      </div>
    </button>
  )
}

// — Detaljvy: fullständig läsvy med komplett tidslinje + stort foto —
function BestallareAvvikelseDetalj({avvikelse, navigate, projekt}) {
  const [photoOpen, setPhotoOpen] = useState(false)
  if (!avvikelse) {
    return (
      <div style={{padding:30,textAlign:"center"}}>
        <div style={{fontSize:13,color:C.mu,marginBottom:14}}>Avvikelse hittades inte</div>
        <button onClick={() => navigate("avvikelser")} style={{...btnG,maxWidth:240,margin:"0 auto"}}>Tillbaka</button>
      </div>
    )
  }
  const a = avvikelse
  const fas = avvikelseFas(a)
  const f = FAS_FARG[fas]
  const proj = a.projektId ? (projekt || []).find(p => p.id === a.projektId) : null

  // Komplett timeline-data
  const steps = [
    {e:"📥", l:"Inkommen",      tid:a.datum,        beskr:`Rapporterad av ${a.av}`,                done:true,                  highlight:"red"},
    {e:"👤", l:"Delegerad till", tid:a.delegeradTid, beskr:a.ansvarigNamn ? `Till ${a.ansvarigNamn}${a.delegeradAv ? ` · av ${a.delegeradAv}` : ""}` : "Ej delegerad än", done:!!a.ansvarigId,        highlight:"yellow"},
    {e:"👁️", l:"Sedd av arbetaren",       tid:a.seddTid,      beskr:a.seddTid ? `Sedd av ${a.ansvarigNamn}` : "Ej sedd än",  done:!!a.seddTid,            highlight:"blue"},
    {e:"✅", l:"Markerad klar", tid:a.atgardadTid,  beskr:a.atgardadAv ? `Av ${a.atgardadAv}` : "Ej klar än",                done:a.status === "closed", highlight:"green"},
  ]
  const fargPunkt = (h, d) => {
    if (!d) return {bg:C.bg3, fg:C.mu, br:C.b}
    if (h === "red")    return {bg:"rgba(224,82,82,.08)",  fg:C.da,      br:"rgba(224,82,82,.3)"}
    if (h === "yellow") return {bg:"rgba(232,184,75,.1)",  fg:"#b88a00", br:"rgba(232,184,75,.4)"}
    if (h === "blue")   return {bg:"rgba(91,156,246,.08)", fg:"#1565c0", br:"rgba(91,156,246,.35)"}
    if (h === "green")  return {bg:"rgba(46,125,50,.08)",  fg:C.ok,      br:"rgba(46,125,50,.3)"}
    return {bg:C.bg3, fg:C.mu, br:C.b}
  }

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("avvikelser")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:11,color:C.mu}}>Avvikelse #{a.id}</div>
          <div style={{fontWeight:600,fontSize:15,letterSpacing:"-.2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{proj?.namn || a.datum}</div>
        </div>
        <span style={{fontSize:10.5,padding:"4px 10px",borderRadius:10,background:f.bg,color:f.fg,fontWeight:700,letterSpacing:".3px"}}>{f.e} {f.l.toUpperCase()}</span>
      </div>

      <div style={{padding:"18px 20px 30px",display:"flex",flexDirection:"column",gap:14}}>

        {/* Beskrivning */}
        <div style={{...card,padding:"14px 16px"}}>
          <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:6}}>BESKRIVNING</div>
          <div style={{fontSize:15,color:C.tx,lineHeight:1.55,fontWeight:500}}>{a.text}</div>
        </div>

        {/* Plats-info */}
        {(a.km || a.gps || proj) && (
          <div style={{...card,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:10}}>PLATS & PROJEKT</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,fontSize:13.5,color:C.tx,lineHeight:1.45}}>
              {proj && <div>🏗 <strong style={{fontWeight:600}}>{proj.namn}</strong> <span style={{color:C.mu}}>· {proj.nummer}</span></div>}
              {a.km && <div>📍 Km-läge: <strong style={{fontWeight:600}}>{a.km}</strong></div>}
              {a.gps && <div>🛰 GPS: <span style={{fontFamily:"monospace",fontSize:12.5}}>{a.gps.lat.toFixed(5)}, {a.gps.lng.toFixed(5)}</span></div>}
            </div>
          </div>
        )}

        {/* Foto i full storlek */}
        {a.photo && (
          <div style={{...card,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:10}}>FOTO</div>
            <button
              onClick={() => setPhotoOpen(true)}
              style={{padding:0,background:"none",border:"none",cursor:"zoom-in",width:"100%",fontFamily:"inherit"}}
            >
              <img src={a.photo} alt="" style={{width:"100%",borderRadius:8,maxHeight:360,objectFit:"contain",display:"block",background:C.bg}}/>
            </button>
            <div style={{fontSize:11,color:C.mu,marginTop:6,textAlign:"center"}}>Tryck för att förstora</div>
          </div>
        )}

        {/* Full tidslinje med alla 4 steg */}
        <div style={{...card,padding:"14px 16px"}}>
          <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:14}}>TIDSLINJE</div>
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {steps.map((s, i) => {
              const farg = fargPunkt(s.highlight, s.done)
              const sista = i === steps.length - 1
              return (
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",position:"relative",paddingBottom:sista?0:18}}>
                  {!sista && <div style={{position:"absolute",left:17,top:36,bottom:0,width:2,background:s.done?farg.fg:C.b,opacity:.4}}/>}
                  <div style={{width:36,height:36,borderRadius:"50%",background:farg.bg,border:`2px solid ${farg.fg}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,position:"relative",zIndex:1}}>
                    {s.done ? s.e : "⏳"}
                  </div>
                  <div style={{flex:1,minWidth:0,paddingTop:2}}>
                    <div style={{fontSize:13,fontWeight:600,color:s.done?farg.fg:C.mu,letterSpacing:"-.1px"}}>{s.l}</div>
                    {s.tid && <div style={{fontSize:11.5,color:C.mu,fontVariantNumeric:"tabular-nums",marginTop:2}}>{s.tid}</div>}
                    <div style={{fontSize:12.5,color:s.done?C.tx:C.mu,lineHeight:1.5,marginTop:3}}>{s.beskr}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Info-text */}
        <div style={{fontSize:11.5,color:C.mu,textAlign:"center",padding:"8px 12px",background:C.bg3,border:`1px solid ${C.b}`,borderRadius:8,lineHeight:1.5}}>
          🔒 Läsvy — beställaren/chefen kan följa flödet men inte redigera. Åtgärder hanteras av arbetsledare och arbetare.
        </div>
      </div>

      {photoOpen && <PhotoLightbox url={a.photo} onClose={() => setPhotoOpen(false)}/>}
    </div>
  )
}



// ═══════════════════════════════════════════════════════════════════════
// CHATT — Meddelanden-flik för foretag/beställare
// ═══════════════════════════════════════════════════════════════════════
function getUserForetagId(user) {
  if (!user) return null
  const f = INIT_FORETAG.find(c => c.namn === user.company)
  return f?.id || null
}

// — Förkorta meddelande för listvyn —
function snippetMeddelande(m) {
  if (!m) return "Ingen aktivitet"
  if (m.typ === "system") return "🔒 System: " + m.text.slice(0, 50)
  if (m.typ === "avrop") return `📋 Delade ett avrop: ${m.data?.proj || "Avrop"}`
  if (m.typ === "pdf")   return `📎 ${m.data?.filnamn || "Dokument"}`
  if (m.typ === "bild")  return `🖼️ Bild`
  return m.text.slice(0, 80)
}

// — Tid (HH:MM) ur YYYY-MM-DD HH:MM —
function tidKort(s) {
  if (!s) return ""
  return s.includes(" ") ? s.split(" ")[1] : s
}

// — Datum för dag-separator —
function datumDel(s) {
  if (!s) return ""
  return s.split(" ")[0]
}

// ─────────────────────────────────────────────────────────────────────────
// MEDDELANDEN — startsida med konversationslista
// ─────────────────────────────────────────────────────────────────────────
function MeddelandenStart({user, navigate, konversationer, chattMeddelanden, onStartaKonv}) {
  const minId = getUserForetagId(user)
  const [sok, setSok] = useState("")
  const [nyOpen, setNyOpen] = useState(false)

  // Bygger en lista över konversationer med senaste meddelandet + olast-räkning
  const konvData = konversationer.map(k => {
    const partner = INIT_FORETAG.find(c => c.id === k.partnerForetagId)
    const meddelanden = chattMeddelanden.filter(m => m.konvId === k.id)
    const senast = meddelanden.length ? meddelanden[meddelanden.length - 1] : null
    const olast = meddelanden.filter(m => m.fran !== minId && m.fran !== "system" && !m.sedd).length
    return {k, partner, senast, olast, senastTid: senast?.tid || ""}
  }).filter(d => d.partner)

  const filtrerade = konvData
    .filter(d => !sok.trim() || (d.partner.namn + " " + (d.senast?.text || "")).toLowerCase().includes(sok.toLowerCase()))
    .sort((a, b) => b.senastTid.localeCompare(a.senastTid))

  function valjForetag(foretagId) {
    const konvId = onStartaKonv(foretagId)
    setNyOpen(false)
    navigate("meddelande-chatt", {konvId})
  }

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>Meddelanden</h1>
          <button onClick={() => setNyOpen(true)} style={{background:C.ac,color:"#fff",border:"none",borderRadius:18,padding:"6px 12px",fontSize:12.5,fontWeight:500,cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:14,fontWeight:700,lineHeight:1}}>+</span>
            <span>Ny konversation</span>
          </button>
        </div>
        <input style={{...inp,marginBottom:14}} placeholder="🔍 Sök konversationer, företag..." value={sok} onChange={e => setSok(e.target.value)}/>
      </div>

      <div style={{padding:"0 20px 24px",display:"flex",flexDirection:"column",gap:6}}>
        {filtrerade.length === 0 ? (
          <div style={{padding:40,textAlign:"center",color:C.mu,fontSize:13}}>
            {konversationer.length === 0 ? "Inga konversationer ännu — börja en ny" : "Inga konversationer matchade"}
          </div>
        ) : filtrerade.map(({k, partner, senast, olast, senastTid}) => (
          <button key={k.id} onClick={() => navigate("meddelande-chatt", {konvId: k.id})} style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${olast > 0 ? "rgba(224,82,82,.3)" : C.b}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}>
            <div style={{width:46,height:46,borderRadius:12,background:partner.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,position:"relative"}}>
              {partner.logoEmoji}
              {olast > 0 && <span style={{position:"absolute",top:-4,right:-4,minWidth:18,height:18,padding:"0 5px",borderRadius:9,background:C.da,color:"#fff",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${C.bg2}`}}>{olast}</span>}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:3}}>
                <span style={{fontSize:14.5,fontWeight:olast > 0 ? 600 : 500,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{partner.namn}</span>
                <span style={{fontSize:10.5,color:olast > 0 ? C.da : C.mu,fontWeight:olast > 0 ? 600 : 400,flexShrink:0}}>{tidKort(senastTid)}</span>
              </div>
              <div style={{fontSize:12.5,color:olast > 0 ? C.tx : C.mu,fontWeight:olast > 0 ? 500 : 400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{snippetMeddelande(senast)}</div>
            </div>
          </button>
        ))}
      </div>

      {nyOpen && <NyKonversationModal user={user} konversationer={konversationer} onValj={valjForetag} onClose={() => setNyOpen(false)}/>}
    </div>
  )
}

// — Modal för att välja företag att starta konversation med —
function NyKonversationModal({user, konversationer, onValj, onClose}) {
  const minId = getUserForetagId(user)
  const [sok, setSok] = useState("")
  const tillgangliga = INIT_FORETAG.filter(c => c.id !== minId)
  const filt = tillgangliga.filter(c => !sok.trim() || (c.namn + " " + c.ort).toLowerCase().includes(sok.toLowerCase()))
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:6}}>NY KONVERSATION</div>
        <div style={{textAlign:"center",fontSize:13,color:C.tx,marginBottom:14}}>Välj företag att skicka meddelande till</div>
        <input style={{...inp,marginBottom:12}} placeholder="🔍 Sök företag, ort..." value={sok} onChange={e => setSok(e.target.value)}/>
        <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:380,overflowY:"auto"}}>
          {filt.length === 0 ? (
            <div style={{padding:14,textAlign:"center",fontSize:13,color:C.mu}}>Inga företag matchade</div>
          ) : filt.map(c => {
            const harKonv = konversationer.some(k => k.partnerForetagId === c.id)
            return (
              <button key={c.id} onClick={() => onValj(c.id)} style={{display:"flex",alignItems:"center",gap:10,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                <div style={{width:38,height:38,borderRadius:10,background:c.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{c.logoEmoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13.5,fontWeight:500,color:C.tx}}>{c.namn}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:1}}>{c.typ} · {c.ort}</div>
                </div>
                {harKonv && <span style={{fontSize:10.5,padding:"2px 7px",borderRadius:10,background:"rgba(46,125,50,.1)",color:C.ok,fontWeight:600,letterSpacing:".3px",flexShrink:0}}>BEFINTLIG</span>}
              </button>
            )
          })}
        </div>
        <button onClick={onClose} style={{...btnG,marginTop:14}}>Avbryt</button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// MEDDELANDE-CHATT — chat-vy inuti en konversation
// ─────────────────────────────────────────────────────────────────────────
function MeddelandeChatt({user, navigate, konvId, konversationer, chattMeddelanden, onAdd, onMarkLast}) {
  const minId = getUserForetagId(user)
  const konv = konversationer.find(k => k.id === konvId)
  const partner = konv ? INIT_FORETAG.find(c => c.id === konv.partnerForetagId) : null
  const meddelanden = chattMeddelanden.filter(m => m.konvId === konvId)

  const [text, setText] = useState("")
  const [delaAvropOpen, setDelaAvropOpen] = useState(false)
  const pdfInputRef = useRef(null)
  const bildInputRef = useRef(null)

  // Markera meddelanden från partner som sedda när användaren öppnar konvon
  useEffect(() => {
    if (konvId && minId && onMarkLast) onMarkLast(konvId, minId)
  }, [konvId])

  if (!konv || !partner) {
    return (
      <div style={{padding:30,textAlign:"center"}}>
        <div style={{fontSize:13,color:C.mu,marginBottom:14}}>Konversation hittades inte</div>
        <button onClick={() => navigate("meddelanden")} style={{...btnG,maxWidth:240,margin:"0 auto"}}>Tillbaka</button>
      </div>
    )
  }

  function skicka() {
    if (!text.trim()) return
    onAdd(konvId, minId, text.trim(), "text")
    setText("")
  }
  function handlePdf(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = ev => onAdd(konvId, minId, "", "pdf", {filnamn: f.name, url: ev.target.result, storlek: Math.round(f.size/1024)})
    r.readAsDataURL(f)
    e.target.value = ""
  }
  function handleBild(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = ev => onAdd(konvId, minId, "", "bild", {url: ev.target.result, filnamn: f.name})
    r.readAsDataURL(f)
    e.target.value = ""
  }
  function delaAvrop(avropObj) {
    onAdd(konvId, minId, "", "avrop", {avropId: avropObj.id, proj: avropObj.proj, plats: avropObj.plats, deadline: avropObj.deadline, best: avropObj.best})
    setDelaAvropOpen(false)
  }

  // Senaste mitt meddelande för Sett ✅-display
  const minaMeddelanden = meddelanden.filter(m => m.fran === minId)
  const sistaMitt = minaMeddelanden[minaMeddelanden.length - 1]

  // Dag-separator: gruppera meddelanden per datum
  const renderRader = []
  let senastDag = null
  meddelanden.forEach(m => {
    const dag = datumDel(m.tid)
    if (dag !== senastDag) {
      renderRader.push({typ:"dag", dag, id:`dag-${dag}-${m.id}`})
      senastDag = dag
    }
    renderRader.push({typ:"msg", m, id:m.id})
  })

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"calc(100vh - 80px)"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 20px",borderBottom:`1px solid ${C.b}`,background:C.bg,position:"sticky",top:0,zIndex:5}}>
        <button onClick={() => navigate("meddelanden")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1,padding:0,fontFamily:"inherit"}}>←</button>
        <div style={{width:36,height:36,borderRadius:10,background:partner.logoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{partner.logoEmoji}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14.5,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{partner.namn}</div>
          <div style={{fontSize:11,color:C.mu,marginTop:1}}>{partner.typ}</div>
        </div>
        <button onClick={() => navigate("foretag-profil", partner)} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"6px 10px",fontSize:11.5,fontWeight:500,color:C.tx,cursor:"pointer",fontFamily:"inherit"}}>Profil</button>
      </div>

      {/* Meddelanden */}
      <div style={{flex:1,padding:"16px 16px 20px",display:"flex",flexDirection:"column",gap:6,overflowY:"auto"}}>
        {meddelanden.length === 0 ? (
          <div style={{padding:40,textAlign:"center",color:C.mu,fontSize:13}}>Inga meddelanden ännu — skriv det första</div>
        ) : renderRader.map(r => {
          if (r.typ === "dag") return (
            <div key={r.id} style={{textAlign:"center",margin:"10px 0 6px"}}>
              <span style={{fontSize:11,color:C.mu,background:C.bg3,padding:"3px 10px",borderRadius:10,fontWeight:500}}>{r.dag}</span>
            </div>
          )
          const m = r.m
          const minMsg = m.fran === minId
          const sysMsg = m.fran === "system"
          if (sysMsg) return <SystemMeddelandeBubbla key={m.id} m={m} navigate={navigate}/>
          return <ChattBubbla key={m.id} m={m} minMsg={minMsg} navigate={navigate} sistaMitt={sistaMitt?.id === m.id}/>
        })}
      </div>

      {/* Composer — texfält + actions */}
      <div style={{position:"sticky",bottom:0,background:C.bg,borderTop:`1px solid ${C.b}`,padding:"10px 14px 12px"}}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Skriv ett meddelande..."
          style={{...inp,height:48,minHeight:48,maxHeight:120,resize:"none",padding:"12px 14px",fontSize:14,marginBottom:8}}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); skicka() } }}
        />
        <div style={{display:"flex",gap:6}}>
          <button onClick={() => pdfInputRef.current?.click()} style={chattAttKnp} title="Bifoga PDF">📎</button>
          <button onClick={() => bildInputRef.current?.click()} style={chattAttKnp} title="Bifoga bild">🖼️</button>
          <button onClick={() => setDelaAvropOpen(true)} style={{...chattAttKnp,padding:"8px 12px",fontSize:12,gap:5,display:"flex",alignItems:"center"}}>📋 Avrop</button>
          <input ref={pdfInputRef} type="file" accept=".pdf" onChange={handlePdf} style={{display:"none"}}/>
          <input ref={bildInputRef} type="file" accept="image/*" onChange={handleBild} style={{display:"none"}}/>
          <button onClick={skicka} disabled={!text.trim()} style={{flex:1,padding:"10px",borderRadius:10,background:text.trim()?C.ac:C.bg3,color:text.trim()?"#fff":C.mu,border:"none",cursor:text.trim()?"pointer":"not-allowed",fontFamily:"inherit",fontSize:13.5,fontWeight:500}}>Skicka ▶</button>
        </div>
      </div>

      {delaAvropOpen && <DelaAvropModal onValj={delaAvrop} onClose={() => setDelaAvropOpen(false)}/>}
    </div>
  )
}

// — Generell chattbubbla (text/pdf/bild/avrop) —
function ChattBubbla({m, minMsg, navigate, sistaMitt}) {
  const align = minMsg ? "flex-end" : "flex-start"
  const bg = minMsg ? C.ac : C.bg3
  const fg = minMsg ? "#fff" : C.tx
  const tidFg = minMsg ? "rgba(255,255,255,.7)" : C.mu

  function renderInnehall() {
    if (m.typ === "pdf") {
      return (
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px 4px"}}>
          <div style={{width:36,height:44,background:minMsg?"rgba(255,255,255,.18)":"#fff",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:minMsg?"#fff":C.da,flexShrink:0,letterSpacing:".2px",border:minMsg?"1px solid rgba(255,255,255,.3)":"1px solid rgba(224,82,82,.3)"}}>PDF</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:500,color:fg,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.data?.filnamn || "Dokument"}</div>
            {m.data?.storlek && <div style={{fontSize:11,color:tidFg,marginTop:1}}>{m.data.storlek} KB</div>}
          </div>
        </div>
      )
    }
    if (m.typ === "bild" && m.data?.url) {
      return (
        <div style={{padding:"3px 3px 0"}}>
          <img src={m.data.url} alt="" style={{maxWidth:240,maxHeight:240,borderRadius:8,display:"block"}}/>
          {m.text && <div style={{padding:"6px 8px 4px",fontSize:13.5,color:fg,lineHeight:1.45}}>{m.text}</div>}
        </div>
      )
    }
    if (m.typ === "avrop") {
      return (
        <button onClick={() => {
          // Hitta avropet och navigera. För demo: MINA_AVROP, AVROP eller privata.
          const id = m.data?.avropId
          let avrop = MINA_AVROP.find(a => a.id === id) || AVROP.find(a => a.id === id)
          if (avrop) navigate("avrop", avrop)
        }} style={{display:"block",width:"100%",background:minMsg?"rgba(255,255,255,.12)":C.bg,border:minMsg?"1px solid rgba(255,255,255,.25)":`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
          <div style={{fontSize:10.5,color:minMsg?"rgba(255,255,255,.85)":C.ac,fontWeight:700,letterSpacing:".4px",marginBottom:4}}>📋 DELAT AVROP</div>
          <div style={{fontSize:13,fontWeight:600,color:fg,marginBottom:3,lineHeight:1.35}}>{m.data?.proj || "Avrop"}</div>
          {m.data?.plats && <div style={{fontSize:11,color:tidFg,marginBottom:m.data?.deadline?2:0}}>📍 {m.data.plats}</div>}
          {m.data?.deadline && <div style={{fontSize:11,color:tidFg}}>Deadline: {m.data.deadline}</div>}
          <div style={{fontSize:11,color:minMsg?"rgba(255,255,255,.85)":C.ac,fontWeight:500,marginTop:6}}>Tryck för att öppna ›</div>
        </button>
      )
    }
    return <div style={{fontSize:14,color:fg,lineHeight:1.5,whiteSpace:"pre-wrap",padding:"8px 12px 4px"}}>{m.text}</div>
  }

  return (
    <div style={{display:"flex",justifyContent:align,marginBottom:2}}>
      <div style={{maxWidth:"82%",display:"flex",flexDirection:"column",alignItems:align}}>
        <div style={{background:bg,borderRadius:14,borderBottomLeftRadius:minMsg?14:4,borderBottomRightRadius:minMsg?4:14,paddingBottom:6,minWidth:60}}>
          {renderInnehall()}
          <div style={{padding:"0 12px 6px",fontSize:10,color:tidFg,textAlign:"right",fontVariantNumeric:"tabular-nums"}}>{tidKort(m.tid)}</div>
        </div>
        {minMsg && sistaMitt && (
          <div style={{fontSize:10.5,color:m.sedd?C.ok:C.mu,marginTop:3,fontWeight:500}}>
            {m.sedd ? "Sett ✅" : "Skickat"}
          </div>
        )}
      </div>
    </div>
  )
}

// — Systemmeddelande (centered, special style) —
function SystemMeddelandeBubbla({m, navigate}) {
  return (
    <div style={{display:"flex",justifyContent:"center",margin:"8px 0"}}>
      <div style={{background:"rgba(232,184,75,.08)",border:"1px solid rgba(232,184,75,.3)",borderRadius:10,padding:"10px 14px",maxWidth:"90%",textAlign:"center"}}>
        <div style={{fontSize:12,color:C.tx,lineHeight:1.5,fontWeight:500}}>{m.text}</div>
        {m.data?.avropId && (
          <div style={{fontSize:11,color:C.mu,marginTop:4,fontVariantNumeric:"tabular-nums"}}>{tidKort(m.tid)}</div>
        )}
      </div>
    </div>
  )
}

// — Modal för att dela ett avrop i chatten —
function DelaAvropModal({onValj, onClose}) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:6}}>DELA AVROP</div>
        <div style={{textAlign:"center",fontSize:13,color:C.tx,marginBottom:14}}>Välj ett av dina avrop att dela i chatten</div>
        {MINA_AVROP.length === 0 ? (
          <div style={{padding:14,textAlign:"center",fontSize:13,color:C.mu}}>Du har inga avrop att dela</div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:380,overflowY:"auto",marginBottom:14}}>
            {MINA_AVROP.map(a => (
              <button key={a.id} onClick={() => onValj(a)} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                <div style={{fontSize:10.5,color:C.mu,fontWeight:500,letterSpacing:".4px",marginBottom:3}}>{a.best?.toUpperCase()}</div>
                <div style={{fontSize:14,fontWeight:600,color:C.tx,marginBottom:5}}>{a.proj}</div>
                <div style={{fontSize:11.5,color:C.mu}}>📍 {a.plats} · Deadline {a.deadline}</div>
              </button>
            ))}
          </div>
        )}
        <button onClick={onClose} style={btnG}>Avbryt</button>
      </div>
    </div>
  )
}

// — Style för action-knappar i chatten —
const chattAttKnp = {
  background: C.bg2,
  border: `1px solid ${C.b}`,
  borderRadius: 10,
  padding: "8px 12px",
  fontSize: 16,
  cursor: "pointer",
  fontFamily: "inherit",
  color: C.tx,
  lineHeight: 1,
}


// ═══════════════════════════════════════════════════════════════════════
// STÄDAD NAVIGATION — Hem-dashboard, hub-sidor, tom-states, notiser
// ═══════════════════════════════════════════════════════════════════════

// — Återanvändbart hub-kort: stor klickbar rad med ikon, titel, beskrivning, valbar badge —
function HubKort({emoji, titel, beskr, badge, badgeColor, onClick, accent}) {
  const c = accent || C.ac
  return (
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:14,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",width:"100%",transition:"border-color .15s"}}>
      <div style={{width:48,height:48,borderRadius:12,background:`${c}15`,color:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{emoji}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:15,fontWeight:600,color:C.tx,letterSpacing:"-.1px"}}>{titel}</div>
        {beskr && <div style={{fontSize:12.5,color:C.mu,marginTop:3,lineHeight:1.45}}>{beskr}</div>}
      </div>
      {badge !== undefined && badge !== null && (
        <span style={{fontSize:11,padding:"3px 9px",borderRadius:10,background:badgeColor||"rgba(224,82,82,.12)",color:badgeColor?"#fff":C.da,fontWeight:700,letterSpacing:".3px",flexShrink:0}}>{badge}</span>
      )}
      <div style={{fontSize:20,color:C.mu,flexShrink:0}}>›</div>
    </button>
  )
}

// — Tomt-tillstånd: ikon + text + valbar primärknapp —
function TomState({emoji, text, knapp, onKnapp}) {
  return (
    <div style={{padding:"50px 20px 30px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:14,opacity:.45}}>{emoji}</div>
      <div style={{fontSize:14,color:C.mu,marginBottom:knapp?20:0,lineHeight:1.55,maxWidth:320,margin:"0 auto"}}>{text}</div>
      {knapp && <button onClick={onKnapp} style={{...btnP,maxWidth:260,marginTop:18,marginLeft:"auto",marginRight:"auto",display:"block"}}>{knapp}</button>}
    </div>
  )
}

// — Sektionsrubrik för kategorier i hub-sidorna —
function HubSektion({titel, children}) {
  return (
    <>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.mu,padding:"4px 4px",marginTop:14,marginBottom:6,textTransform:"uppercase"}}>{titel}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>{children}</div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// FÖRETAG HEM — dashboard med 5 stat-kort + snabblänkar
// ─────────────────────────────────────────────────────────────────────────
function ForetagHem({user, navigate, privatNotiser, ansokningar, avvikelser, projekteringBokningar, chattMeddelanden, konversationer}) {
  const minId = INIT_FORETAG.find(c => c.namn === user?.company)?.id

  // Beräkna stats från befintliga state-listor — ingen ny data
  const olastaNotiser = (privatNotiser || []).filter(n => n.foretagId === minId && !n.sedd).length
  const aktivaAvrop = MINA_AVROP.length
  const oppnaAnsokningar = (ansokningar || []).filter(a => a.status === "open").length
  const oppnaAvvikelser = (avvikelser || []).filter(a => a.status === "open").length
  const bokadeV22 = (projekteringBokningar || []).filter(b => b.vecka === 22).length
  const olastaMeddelanden = (chattMeddelanden || []).filter(m => m.fran !== minId && m.fran !== "system" && !m.sedd && (konversationer || []).some(k => k.id === m.konvId)).length

  const idag = new Date("2026-05-25")
  const veckodag = ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"][idag.getDay()]

  return (
    <div>
      <div style={{padding:"22px 20px 0"}}>
        <div style={{fontSize:12,color:C.mu,fontWeight:500,letterSpacing:".3px"}}>{veckodag.toUpperCase()} 25 MAJ 2026</div>
        <h1 style={{fontSize:24,fontWeight:600,letterSpacing:"-.3px",marginTop:3}}>Hej {user?.name?.split(" ")[0] || ""}!</h1>
        <p style={{fontSize:13.5,color:C.mu,marginTop:4,marginBottom:18,lineHeight:1.5}}>Här är vad som händer i {user?.company} idag.</p>
      </div>

      {/* Stat-rutnät — 5 kort, klickbara */}
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:10}}>

        {/* Olästa notiser */}
        <DashKort
          icon="🔴" rubrik="OLÄSTA NOTISER"
          siffra={olastaNotiser} suffix={olastaNotiser === 1 ? "notis" : "notiser"}
          accent={olastaNotiser > 0 ? C.da : C.mu}
          beskr={olastaNotiser > 0 ? "Tryck för att se privata avrop" : "Inga olästa notiser"}
          onClick={() => navigate("marketplace")}
        />

        {/* Aktiva avrop */}
        <DashKort
          icon="📋" rubrik="AKTIVA AVROP"
          siffra={aktivaAvrop} suffix={aktivaAvrop === 1 ? "avrop" : "avrop"}
          subSiffra={oppnaAnsokningar > 0 ? oppnaAnsokningar : null}
          subSuffix={oppnaAnsokningar > 0 ? (oppnaAnsokningar === 1 ? "ny ansökan" : "nya ansökningar") : null}
          accent={C.ac}
          beskr="Tryck för att se mina avrop"
          onClick={() => navigate("mina-avrop")}
        />

        {/* Öppna avvikelser */}
        <DashKort
          icon="⚠️" rubrik="ÖPPNA AVVIKELSER"
          siffra={oppnaAvvikelser} suffix={oppnaAvvikelser === 1 ? "öppen" : "öppna"}
          accent={oppnaAvvikelser > 0 ? "#b88a00" : C.ok}
          beskr={oppnaAvvikelser > 0 ? "Tryck för att granska" : "Inga öppna avvikelser"}
          onClick={() => navigate("avvikelser")}
        />

        {/* Bokade denna vecka */}
        <DashKort
          icon="👷" rubrik="BOKADE DENNA VECKA (V22)"
          siffra={bokadeV22} suffix={bokadeV22 === 1 ? "anställd" : "anställda"}
          accent={C.ok}
          beskr="Tryck för att se planeringen"
          onClick={() => navigate("planering")}
        />

        {/* Olästa meddelanden */}
        <DashKort
          icon="💬" rubrik="OLÄSTA MEDDELANDEN"
          siffra={olastaMeddelanden} suffix={olastaMeddelanden === 1 ? "olast" : "olästa"}
          accent={olastaMeddelanden > 0 ? C.da : C.mu}
          beskr={olastaMeddelanden > 0 ? "Tryck för att svara" : "Inga olästa meddelanden"}
          onClick={() => navigate("meddelanden")}
        />

        {/* Snabblänkar */}
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.mu,padding:"4px",marginTop:10,marginBottom:0,textTransform:"uppercase"}}>Snabblänkar</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <button onClick={() => navigate("skapa-avrop")} style={snabbKnp}>➕<span>Nytt avrop</span></button>
          <button onClick={() => navigate("tid-chef")} style={snabbKnp}>⏱️<span>Tidsrapportering</span></button>
          <button onClick={() => navigate("anstallda-hem")} style={snabbKnp}>👥<span>Anställda</span></button>
          <button onClick={() => navigate("profil")} style={snabbKnp}>👤<span>Min profil</span></button>
        </div>

        <div style={{height:18}}/>
      </div>
    </div>
  )
}

// — Dashboard-kort med ikon, stor siffra, beskrivning —
function DashKort({icon, rubrik, siffra, suffix, subSiffra, subSuffix, accent, beskr, onClick}) {
  return (
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:14,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",width:"100%"}}>
      <div style={{width:46,height:46,borderRadius:12,background:`${accent}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:10.5,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:2}}>{rubrik}</div>
        <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:2}}>
          <span style={{fontSize:24,fontWeight:700,color:accent,lineHeight:1}}>{siffra}</span>
          <span style={{fontSize:13,color:C.mu,fontWeight:500}}>{suffix}</span>
          {subSiffra !== null && subSiffra !== undefined && (
            <>
              <span style={{fontSize:13,color:C.mu,marginLeft:4}}>·</span>
              <span style={{fontSize:14,fontWeight:600,color:C.da,marginLeft:2}}>{subSiffra}</span>
              <span style={{fontSize:12,color:C.mu}}>{subSuffix}</span>
            </>
          )}
        </div>
        <div style={{fontSize:12,color:C.mu,lineHeight:1.4}}>{beskr}</div>
      </div>
      <div style={{fontSize:18,color:C.mu,flexShrink:0}}>›</div>
    </button>
  )
}

const snabbKnp = {
  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6,
  background:C.bg2, border:`1px solid ${C.b}`, borderRadius:10, padding:"14px 8px", cursor:"pointer",
  fontFamily:"inherit", fontSize:13, color:C.tx, fontWeight:500, minHeight:78,
}

// ─────────────────────────────────────────────────────────────────────────
// HUB-SIDOR — grupperar undersidor med tydliga rubriker
// ─────────────────────────────────────────────────────────────────────────
function AvropHub({navigate, ansokningar}) {
  const oppnaAns = (ansokningar || []).filter(a => a.status === "open").length
  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>📋 Avrop & Jobb</h1>
        <p style={{fontSize:13,color:C.mu,marginTop:3,marginBottom:18}}>Hitta jobb, hantera dina avrop, publicera nytt</p>
      </div>
      <div style={{padding:"0 20px 24px",display:"flex",flexDirection:"column",gap:8}}>
        <HubKort emoji="🏠" titel="Marketplace" beskr="Bläddra bland öppna avrop från beställare" onClick={() => navigate("marketplace")}/>
        <HubKort emoji="📂" titel="Mina avrop" beskr="Avrop ditt företag publicerat — och inkomna ansökningar" badge={oppnaAns > 0 ? `${oppnaAns} ny${oppnaAns === 1 ? "" : "a"}` : null} onClick={() => navigate("mina-avrop")}/>
        <HubKort emoji="➕" titel="Nytt avrop" beskr="Publicera ett nytt avrop med AI-stöd eller manuellt" accent={C.ok} onClick={() => navigate("skapa-avrop")}/>
      </div>
    </div>
  )
}

function OrganisationHub({navigate, projekteringBokningar}) {
  const veckaCount = (projekteringBokningar || []).filter(b => b.vecka === 22).length
  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>👥 Organisation</h1>
        <p style={{fontSize:13,color:C.mu,marginTop:3,marginBottom:18}}>Personal, planering och bemanning</p>
      </div>
      <div style={{padding:"0 20px 24px",display:"flex",flexDirection:"column",gap:8}}>
        <HubKort emoji="👥" titel="Anställda" beskr="Personalregister med kompetenser och certifikat" accent={C.ok} onClick={() => navigate("anstallda-hem")}/>
        <HubKort emoji="📅" titel="Planering" beskr={`Veckoplanering · ${veckaCount} bokade denna vecka`} accent="#b88a00" onClick={() => navigate("planering")}/>
      </div>
    </div>
  )
}

function ProjektHub({navigate, projekt, avvikelser}) {
  const aktiva = (projekt || []).filter(p => p.status === "Pågående" || p.status === "Planering").length
  const oppnaAvvik = (avvikelser || []).filter(a => a.status === "open").length
  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>🏗 Projekt</h1>
        <p style={{fontSize:13,color:C.mu,marginTop:3,marginBottom:18}}>Projektering och avvikelsehantering</p>
      </div>
      <div style={{padding:"0 20px 24px",display:"flex",flexDirection:"column",gap:8}}>
        <HubKort emoji="🏗" titel="Projektering" beskr={aktiva > 0 ? `${aktiva} aktiva projekt` : "Inga aktiva projekt"} onClick={() => navigate("projektering")}/>
        <HubKort emoji="⚠️" titel="Avvikelser" beskr="Översikt och hantering av inkomna avvikelser" badge={oppnaAvvik > 0 ? oppnaAvvik : null} onClick={() => navigate("avvikelser")}/>
      </div>
    </div>
  )
}

function ForetagHub({navigate}) {
  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>📚 Företag</h1>
        <p style={{fontSize:13,color:C.mu,marginTop:3,marginBottom:18}}>Intranät, dokument, inventarie och företagsprofil</p>
      </div>
      <div style={{padding:"0 20px 24px",display:"flex",flexDirection:"column",gap:8}}>
        <HubKort emoji="🏢" titel="Intranät" beskr="Nyheter, säkerhet, kontakter, meddelanden, checklistor" onClick={() => navigate("intranet-hem")}/>
        <HubKort emoji="📁" titel="Dokumentnav" beskr="Alla dokument samlat — anställda, projekt, fordon, HMS" accent="#b88a00" onClick={() => navigate("dokumentnav-hem")}/>
        <HubKort emoji="📦" titel="Inventarie" beskr="Maskiner, verktyg, fordon och utrustning" accent="#b88a00" onClick={() => navigate("intranet-inventarie")}/>
        <HubKort emoji="🏛" titel="Företagsprofil" beskr="Företag på plattformen — se publika profiler" accent={C.ok} onClick={() => navigate("foretag-listan")}/>
        <HubKort emoji="👤" titel="Min profil" beskr="Inloggningsuppgifter och inställningar" onClick={() => navigate("profil")}/>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// UTE-NOTISER — för arbetare/arbetsledare, surfar befintliga ändringar
// ─────────────────────────────────────────────────────────────────────────
function UteNotiser({user, navigate, andringar, projektNotiser}) {
  // Notiser kombineras från andringar (publicerade ändringar) + projektNotiser
  const allNotiser = [
    ...(andringar || []).map(a => ({id:`a${a.id}`, typ:"andring", titel:"📝 Ny ändring", text:a.text, av:a.av, datum:a.datum, sedd:a.sedd, raw:a})),
    ...(projektNotiser || []).map(n => ({id:`p${n.id}`, typ:"projekt", titel:`📋 ${n.titel || "Projekt-uppdatering"}`, text:n.text, av:n.av || "Arbetsledare", datum:n.datum, sedd:n.sedd, raw:n})),
  ].sort((a, b) => (b.datum || "").localeCompare(a.datum || ""))
  const olasta = allNotiser.filter(n => !n.sedd).length

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>💬 Notiser</h1>
        <p style={{fontSize:13,color:C.mu,marginTop:3,marginBottom:14}}>
          {olasta > 0 ? `${olasta} olästa · ` : ""}Ändringar och projekt-uppdateringar
        </p>
      </div>
      <div style={{padding:"0 20px 24px"}}>
        {allNotiser.length === 0 ? (
          <TomState emoji="💬" text="Inga notiser ännu — du får meddelanden här när din arbetsledare publicerar ändringar eller nya uppdrag."/>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {allNotiser.map(n => (
              <div key={n.id} style={{display:"flex",alignItems:"flex-start",gap:10,background:n.sedd?C.bg2:"rgba(224,82,82,.04)",border:`1px solid ${n.sedd?C.b:"rgba(224,82,82,.25)"}`,borderRadius:10,padding:"12px 14px"}}>
                {!n.sedd && <div style={{width:8,height:8,borderRadius:"50%",background:C.da,flexShrink:0,marginTop:8}}/>}
                <div style={{flex:1,minWidth:0,marginLeft:n.sedd?16:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:3}}>
                    <div style={{fontSize:13,fontWeight:600,color:n.sedd?C.tx:C.da}}>{n.titel}</div>
                    <div style={{fontSize:11,color:C.mu,flexShrink:0,fontVariantNumeric:"tabular-nums"}}>{n.datum}</div>
                  </div>
                  <div style={{fontSize:13,color:C.tx,lineHeight:1.5,marginBottom:5}}>{n.text}</div>
                  {n.av && <div style={{fontSize:11,color:C.mu}}>från {n.av}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// — Hjälper: räkna ut vilken bottom-nav-flik som är aktiv baserat på screen+role —
function aktivNavId(screen, role) {
  if (role === "foretag") {
    if (["marketplace","avrop","ansok","skapa-avrop","mina-avrop","ansokningar","ansokan"].includes(screen)) return "avrop-hub"
    if (["anstallda-hem","anstalld-profil","planering"].includes(screen)) return "org-hub"
    if (["projektering","projekt-detalj","avvikelser","avvikelse-detalj","skapa-dagorder","skapa-projekt"].includes(screen)) return "projekt-hub"
    if (screen === "meddelanden" || screen === "meddelande-chatt") return "meddelanden"
    if (screen === "hem") return "hem"
    // Allt övrigt under Företag-paraplyet
    if (screen && (screen.startsWith("intranet-") || screen.startsWith("dokumentnav") || screen === "foretag-listan" || screen === "foretag-profil" || screen === "foretag-anstalld-publik" || screen === "profil")) return "foretag-hub"
    return screen
  }
  // arbetare / arbetsledare
  if (screen === "dagorder") return "dagorder"
  if (screen === "mina-arbeten" || screen === "arbete") return "mina-arbeten"
  if (screen === "min-tid" || screen === "stampla" || screen === "manuell-tid" || screen === "tid-historik" || screen === "tid-chef" || screen === "rapportera-tid") return "min-tid"
  if (screen === "projektkoll" || screen === "skapa-dagorder") return "projektkoll"
  if (screen === "avvikelser") return "avvikelser"
  if (screen === "ute-notiser" || screen === "ute-notis-detalj") return "ute-notiser"
  if (screen === "profil") return "profil"
  // Allt intranet-relaterat går till profil-fliken för enkelhet på arbetare
  return screen
}


// ═══════════════════════════════════════════════════════════════════════
// NOTIS-SYSTEM — gemensam NotisRad-komponent + TackaNejModal
// Varje notis har action-knappar baserat på typ. Inga auto-dismiss.
// ═══════════════════════════════════════════════════════════════════════

// — Definierar om en notistyp kräver action (röd 🔴) eller är info (grå ⚪) —
function notisKraverAction(typ) {
  // Action-typer: användaren MÅSTE välja något (öppna/tacka nej/granska)
  return ["privat-avrop-inkommen","ansokan-inkommen","delegerad-avvikelse","nytt-jobb"].includes(typ)
}

// — Färgaccent per typ —
function notisAccent(typ) {
  switch (typ) {
    case "privat-avrop-inkommen": return C.ac
    case "tacka-nej-svar":        return C.mu
    case "ansokan-inkommen":      return C.ok
    case "tillagd-projekt":       return C.ok
    case "delegerad-avvikelse":   return "#b88a00"
    case "dagorder-andring":      return C.ac
    case "nytt-jobb":             return C.ok
    case "nytt-meddelande":       return C.ac
    case "nytt-dokument":         return "#b88a00"
    case "certifikat-utgang":     return C.da
    default:                       return C.mu
  }
}

// — Gemensam NotisRad: ikon + titel + text + tid + action-knappar —
function NotisRad({notis, actions}) {
  const kraverAction = notisKraverAction(notis.typ)
  const accent = notisAccent(notis.typ)
  const sedd = notis.sedd
  const punktIkon = kraverAction ? "🔴" : "⚪"

  return (
    <div style={{
      background: sedd ? C.bg2 : (kraverAction ? "rgba(224,82,82,.04)" : "rgba(91,156,246,.03)"),
      border: `1px solid ${sedd ? C.b : (kraverAction ? "rgba(224,82,82,.3)" : "rgba(91,156,246,.2)")}`,
      borderRadius: 12,
      padding: "12px 14px",
      opacity: sedd ? 0.7 : 1,
      transition: "opacity .15s",
    }}>
      <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom: actions && actions.length > 0 && !sedd ? 12 : 0}}>
        <span style={{fontSize:14,lineHeight:1.4,flexShrink:0}}>{sedd ? "✓" : punktIkon}</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:3,flexWrap:"wrap"}}>
            <div style={{fontSize:13.5,fontWeight:600,color:sedd?C.tx:accent}}>{notis.titel}</div>
            <div style={{fontSize:10.5,color:C.mu,flexShrink:0,fontVariantNumeric:"tabular-nums"}}>{notis.tid}</div>
          </div>
          <div style={{fontSize:13,color:C.tx,lineHeight:1.5}}>{notis.meddelande}</div>
          {notis.kommentar && (
            <div style={{fontSize:12,color:C.mu,marginTop:6,padding:"6px 10px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:6,fontStyle:"italic",lineHeight:1.5}}>
              "{notis.kommentar}"
            </div>
          )}
          {notis.av && <div style={{fontSize:11,color:C.mu,marginTop:5}}>från {notis.av}</div>}
          {sedd && <div style={{fontSize:11,color:C.ok,fontWeight:500,marginTop:5}}>Sedd ✓</div>}
        </div>
      </div>

      {!sedd && actions && actions.length > 0 && (
        <div style={{display:"flex",gap:8,marginLeft:24}}>
          {actions.map((a, i) => (
            <button key={i} onClick={a.onClick} disabled={a.disabled} style={{
              flex: a.flex || 1,
              padding:"9px 12px",
              borderRadius:8,
              border: a.primary ? "none" : a.danger ? `1px solid rgba(224,82,82,.35)` : `1px solid ${C.b}`,
              background: a.primary ? C.ac : a.danger ? "rgba(224,82,82,.06)" : C.bg,
              color: a.primary ? "#fff" : a.danger ? C.da : C.tx,
              fontSize:12.5,
              fontWeight: a.primary ? 500 : 400,
              cursor: a.disabled ? "not-allowed" : "pointer",
              fontFamily:"inherit",
              opacity: a.disabled ? 0.5 : 1,
              whiteSpace:"nowrap",
              overflow:"hidden",
              textOverflow:"ellipsis",
            }}>{a.label}</button>
          ))}
        </div>
      )}
    </div>
  )
}

// — Bekräftelse-modal för Tacka nej —
function TackaNejModal({notis, avropProj, onConfirm, onClose}) {
  const [kommentar, setKommentar] = useState("")
  // Hämta projektnamn för rubrik — från avropProj-prop eller notis
  const projNamn = avropProj || notis?.avropProj || ""
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.da,letterSpacing:".5px",fontWeight:700,marginBottom:6}}>❌ TACKA NEJ</div>
        <div style={{textAlign:"center",fontSize:15.5,color:C.tx,fontWeight:600,marginBottom:6}}>Tacka nej till avropet?</div>
        {projNamn && (
          <div style={{textAlign:"center",fontSize:12.5,color:C.mu,marginBottom:10,fontStyle:"italic"}}>"{projNamn}"</div>
        )}
        <div style={{textAlign:"center",fontSize:12.5,color:C.mu,marginBottom:18,lineHeight:1.5,maxWidth:340,margin:"0 auto 18px"}}>
          Beställaren får besked om att ni tackat nej. Avropet försvinner från er marketplace. Detta går inte att ångra.
        </div>
        <label style={lbl}>Anledning (valfritt)</label>
        <textarea
          style={{...inp,height:84,resize:"none",marginBottom:14,fontSize:13.5}}
          placeholder="t.ex. Fullbokade den perioden, eller Saknar rätt kompetens"
          value={kommentar}
          onChange={e => setKommentar(e.target.value)}
        />
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={() => onConfirm(kommentar)} style={{...btnP,flex:1.4,background:C.da}}>Bekräfta — tacka nej</button>
        </div>
      </div>
    </div>
  )
}

// — Ersätter den enklare UteNotiser-versionen — nu med action-knappar per typ —
function UteNotiserV2({user, navigate, andringar, projektNotiser, onMarkAndringSeen}) {
  // Bygg unifierad notis-lista från befintliga datakällor
  const fromAndringar = (andringar || []).map(a => ({
    id:`a${a.id}`,
    typ:"dagorder-andring",
    titel:"🔔 Dagorder ändrad",
    meddelande: a.text,
    tid: a.datum,
    av: a.av,
    sedd: a.sedd,
    raw:a,
  }))
  const fromProjektNotiser = (projektNotiser || []).map(n => ({
    id:`p${n.id}`,
    typ:"tillagd-projekt",
    titel:`👷 ${n.titel || "Tillagd på projekt"}`,
    meddelande: n.text,
    tid: n.datum,
    av: n.av || "Arbetsledare",
    sedd: n.sedd,
    raw:n,
  }))
  const allNotiser = [...fromAndringar, ...fromProjektNotiser].sort((a, b) => (b.tid || "").localeCompare(a.tid || ""))
  const olasta = allNotiser.filter(n => !n.sedd).length
  const krAction = allNotiser.filter(n => !n.sedd && notisKraverAction(n.typ)).length

  function handleMark(notis) {
    if (notis.typ === "dagorder-andring" && onMarkAndringSeen) {
      onMarkAndringSeen(notis.raw.id)
    }
    // För projekt-notiser finns ingen central setter här — skulle behöva propsen.
    // Visning uppdateras vid nästa render om datan ändras.
  }

  function notisActions(n) {
    if (n.sedd) return []
    switch (n.typ) {
      case "dagorder-andring":
        return [{label:"⚪ Markera sedd", primary:true, onClick: () => handleMark(n)}]
      case "tillagd-projekt":
        return [{label:"⚪ Markera sedd", primary:true, onClick: () => handleMark(n)}]
      default:
        return [{label:"Markera sedd", primary:true, onClick: () => handleMark(n)}]
    }
  }

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>💬 Notiser</h1>
        <p style={{fontSize:13,color:C.mu,marginTop:3,marginBottom:14}}>
          {krAction > 0
            ? <span><strong style={{color:C.da}}>{krAction} kräver action</strong>{olasta - krAction > 0 ? ` · ${olasta - krAction} info` : ""}</span>
            : olasta > 0 ? `${olasta} oläst${olasta === 1 ? "" : "a"}` : "Inga olästa notiser"}
        </p>
      </div>
      <div style={{padding:"0 20px 24px"}}>
        {allNotiser.length === 0 ? (
          <TomState emoji="💬" text="Inga notiser ännu — du får meddelanden här när din arbetsledare publicerar ändringar eller nya uppdrag."/>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {allNotiser.map(n => <NotisRad key={n.id} notis={n} actions={notisActions(n)}/>)}
          </div>
        )}
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════
// ARBETSLEDARE-NOTISER — list + full detaljvy med action-knappar
// Notiser deriveras från befintlig data + statisk demo-data.
// Sedd/actionDone trackas via två Set:s i RallarApp.
// ═══════════════════════════════════════════════════════════════════════

// — Hjälper: bygg lista av alla notiser för arbetsledare —
function beraknaArbetsledareNotiser(avvikelser, andringar, extraNotiser, seddIds, actionDoneIds) {
  const list = []

  // ⚠️ Inkomna avvikelser (kräver action: Delegera)
  ;(avvikelser || []).filter(a => avvikelseFas(a) === "inkommen").forEach(a => {
    const id = `inkommen-${a.id}`
    list.push({
      id, typ:"inkommen-avvikelse",
      titel:"⚠️ Ny avvikelse inkommen",
      meddelande:a.text,
      av:a.av, tid:a.datum,
      kraverAction:true,
      actionDone: !!a.ansvarigId || actionDoneIds.has(id),
      sedd: seddIds.has(id),
      avvikelse:a,
    })
  })

  // 👁️ Avvikelse sedd av arbetare (info)
  ;(avvikelser || []).filter(a => avvikelseFas(a) === "sedd").forEach(a => {
    const id = `sedd-${a.id}`
    list.push({
      id, typ:"sedd-av-arbetare",
      titel:"👁️ Avvikelse sedd av arbetare",
      meddelande:`${a.ansvarigNamn} har markerat avvikelsen som sedd. Åtgärd pågår.\n\nAvvikelse: "${a.text}"`,
      av:a.ansvarigNamn, tid:a.seddTid,
      kraverAction:false,
      sedd: seddIds.has(id),
      avvikelse:a,
    })
  })

  // ✅ Avvikelse markerad klar (info)
  ;(avvikelser || []).filter(a => avvikelseFas(a) === "klar").forEach(a => {
    const id = `klar-${a.id}`
    list.push({
      id, typ:"klar-av-arbetare",
      titel:"✅ Avvikelse markerad klar",
      meddelande:`${a.atgardadAv} har slutfört avvikelsen.\n\nAvvikelse: "${a.text}"`,
      av:a.atgardadAv, tid:a.atgardadTid,
      kraverAction:false,
      sedd: seddIds.has(id),
      avvikelse:a,
    })
  })

  // 🔔 Ändring på dagorder + 👷 Arbetare ej markerat sedd
  ;(andringar || []).forEach(a => {
    // Ändring-notis
    const idA = `andring-${a.id}`
    list.push({
      id:idA, typ:"andring-dagorder",
      titel:"🔔 Ändring publicerad på dagorder",
      meddelande:a.text,
      av:a.av, tid:a.datum,
      kraverAction:false,
      sedd: seddIds.has(idA),
      andring:a,
    })
    // Arbetare som ej markerat sedd
    const ejSedda = Object.entries(a.kvittenser || {})
      .filter(([k, v]) => !v?.sedd)
      .map(([k]) => INIT_KONTAKTER.find(x => x.id === k))
      .filter(Boolean)
    if (ejSedda.length > 0) {
      const idE = `ej-sedd-${a.id}`
      list.push({
        id:idE, typ:"arbetare-ej-sedd",
        titel:"👷 Arbetare har inte markerat sedd",
        meddelande:`${ejSedda.length} arbetare har inte markerat dagorder-ändringen som sedd: "${a.text}".\n\nEj sett av: ${ejSedda.map(p => p.name).join(", ")}`,
        av:a.av, tid:a.datum,
        kraverAction:true,
        actionDone: actionDoneIds.has(idE),
        sedd: seddIds.has(idE),
        andring:a,
        ejSedda,
      })
    }
  })

  // Statisk demo-data (kan-ej-utfora, nytt-dokument)
  ;(extraNotiser || []).forEach(n => {
    const isAction = n.typ === "kan-ej-utfora"
    list.push({
      ...n,
      kraverAction:isAction,
      actionDone: isAction ? actionDoneIds.has(n.id) : undefined,
      sedd: seddIds.has(n.id),
    })
  })

  // Sortera: kräver-action-pending först, sen tidsstämpel desc
  list.sort((a, b) => {
    const aHard = (a.kraverAction && !a.actionDone) ? 0 : 1
    const bHard = (b.kraverAction && !b.actionDone) ? 0 : 1
    if (aHard !== bHard) return aHard - bHard
    return (b.tid || "").localeCompare(a.tid || "")
  })

  return list
}

// — Räkna olästa för nav-badge —
function arbetsledareOlastaCount(notiser) {
  return notiser.filter(n => n.kraverAction ? !n.actionDone : !n.sedd).length
}

// — Lista-komponent —
function ArbetsledareNotiser({user, navigate, avvikelser, andringar, extraNotiser, seddIds, actionDoneIds}) {
  const notiser = beraknaArbetsledareNotiser(avvikelser, andringar, extraNotiser, seddIds, actionDoneIds)
  const olastaCount = arbetsledareOlastaCount(notiser)
  const krAction = notiser.filter(n => n.kraverAction && !n.actionDone).length

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>💬 Notiser</h1>
        <p style={{fontSize:13,color:C.mu,marginTop:3,marginBottom:14}}>
          {krAction > 0
            ? <span><strong style={{color:C.da}}>{krAction} kräver action</strong>{olastaCount - krAction > 0 ? ` · ${olastaCount - krAction} info olästa` : ""}</span>
            : olastaCount > 0 ? `${olastaCount} oläst${olastaCount === 1 ? "" : "a"} info` : "Inga olästa notiser"}
        </p>
      </div>
      <div style={{padding:"0 20px 24px"}}>
        {notiser.length === 0 ? (
          <TomState emoji="💬" text="Inga notiser ännu — du får meddelanden här när avvikelser kommer in, dagorder ändras eller arbetare rapporterar status."/>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {notiser.map(n => <ArbetsledareNotisRad key={n.id} n={n} onClick={() => navigate("ute-notis-detalj", n)}/>)}
          </div>
        )}
      </div>
    </div>
  )
}

// — Kompakt klickbar rad i listan —
function ArbetsledareNotisRad({n, onClick}) {
  // Badge-status: 🔴 om action-required-inte-klar ELLER info-inte-sedd, ⚪ annars
  const oklarat = n.kraverAction ? !n.actionDone : !n.sedd
  const badge = oklarat ? "🔴" : "⚪"
  const badgeLabel = oklarat ? "Ej sedd" : "Sedd"
  return (
    <button
      onClick={onClick}
      style={{
        display:"block",
        width:"100%",
        textAlign:"left",
        background: oklarat ? "rgba(224,82,82,.04)" : C.bg2,
        border:`1px solid ${oklarat ? "rgba(224,82,82,.3)" : C.b}`,
        borderRadius:12,
        padding:"12px 14px",
        cursor:"pointer",
        fontFamily:"inherit",
        opacity: oklarat ? 1 : 0.75,
      }}
    >
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:5}}>
        <div style={{fontSize:13.5,fontWeight:600,color:oklarat?C.tx:C.mu,letterSpacing:"-.1px"}}>{n.titel}</div>
        <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:oklarat?"rgba(224,82,82,.12)":C.bg3,color:oklarat?C.da:C.mu,fontWeight:700,letterSpacing:".3px",whiteSpace:"nowrap",flexShrink:0}}>{badge} {badgeLabel.toUpperCase()}</span>
      </div>
      <div style={{fontSize:12.5,color:C.mu,lineHeight:1.5,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{n.meddelande.split("\n")[0]}</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:6}}>
        <span style={{fontSize:11,color:C.mu}}>{n.av && `från ${n.av}`}</span>
        <span style={{fontSize:11,color:C.mu,fontVariantNumeric:"tabular-nums"}}>{n.tid}</span>
      </div>
    </button>
  )
}

// — Bekräftelsedialog för Skicka påminnelse —
function PaminnelseModal({notis, onConfirm, onClose}) {
  if (!notis) return null
  const arbetareNamn = (notis.ejSedda || []).map(p => p.name).join(", ")
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
        <div style={{textAlign:"center",fontSize:11,color:C.ac,letterSpacing:".5px",fontWeight:700,marginBottom:6}}>📢 SKICKA PÅMINNELSE</div>
        <div style={{textAlign:"center",fontSize:14.5,color:C.tx,fontWeight:600,marginBottom:8}}>Skicka påminnelse till {(notis.ejSedda || []).length} arbetare?</div>
        <div style={{textAlign:"center",fontSize:12.5,color:C.mu,marginBottom:18,lineHeight:1.55,padding:"0 8px"}}>
          {arbetareNamn} kommer att få en push-notis att markera dagorder-ändringen som sedd.
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={onConfirm} style={{...btnP,flex:1.2}}>📢 Skicka påminnelse</button>
        </div>
      </div>
    </div>
  )
}

// — Detaljvy med action-knappar per typ —
function ArbetsledareNotisDetalj({user, navigate, notis, avvikelser, onMarkSedd, onMarkActionDone, onDelegera}) {
  const [confirmation, setConfirmation] = useState(null)
  const [delegeraOpen, setDelegeraOpen] = useState(false)
  const [paminnelseOpen, setPaminnelseOpen] = useState(false)

  if (!notis) {
    // Skydd om navigation utan data
    return (
      <div style={{padding:30,textAlign:"center"}}>
        <div style={{fontSize:13,color:C.mu,marginBottom:14}}>Notis hittades inte</div>
        <button onClick={() => navigate("ute-notiser")} style={{...btnG,maxWidth:240,margin:"0 auto"}}>Tillbaka till notiser</button>
      </div>
    )
  }

  // Färska data: leta upp uppdaterad avvikelse om typen är avvikelse-relaterad
  const fasthAvvikelse = notis.avvikelse?.id ? (avvikelser || []).find(a => a.id === notis.avvikelse.id) || notis.avvikelse : null

  // Beräkna oklarad-status (för att hindra stängning utan action)
  const isAction = notis.kraverAction
  const isResolved = isAction ? notis.actionDone : notis.sedd

  function visaKlart() {
    setConfirmation("Klart ✅")
    setTimeout(() => { setConfirmation(null); navigate("ute-notiser") }, 2000)
  }

  function handleMarkSedd() {
    onMarkSedd(notis.id)
    visaKlart()
  }
  function handleActionDone() {
    onMarkActionDone(notis.id)
    visaKlart()
  }
  function handleDelegeraConfirm(ansvarigId, ansvarigNamn) {
    if (fasthAvvikelse) onDelegera(fasthAvvikelse.id, ansvarigId, ansvarigNamn, user.name)
    onMarkActionDone(notis.id)
    setDelegeraOpen(false)
    visaKlart()
  }
  function handlePaminnelseConfirm() {
    onMarkActionDone(notis.id)
    setPaminnelseOpen(false)
    visaKlart()
  }

  // — Klart-bekräftelse-skärm —
  if (confirmation) {
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 80px)",padding:"0 24px",textAlign:"center"}}>
        <div style={{fontSize:72,marginBottom:16,animation:"none"}}>✅</div>
        <h2 style={{fontSize:24,fontWeight:600,marginBottom:6,color:C.ok}}>Klart!</h2>
        <p style={{color:C.mu,fontSize:13}}>Tillbaka till notislistan...</p>
      </div>
    )
  }

  // Bygg action-knappar baserat på typ
  let actions = []
  switch (notis.typ) {
    case "inkommen-avvikelse":
      actions = [
        {label:"🎯 Delegera till arbetare", primary:true, onClick: () => setDelegeraOpen(true)},
        {label:"⚪ Markera sedd (delegera senare)", secondary:true, onClick: handleMarkSedd},
      ]
      break
    case "sedd-av-arbetare":
      actions = [{label:"⚪ Markera sedd", primary:true, onClick: handleMarkSedd}]
      break
    case "klar-av-arbetare":
      actions = [{label:"⚪ Markera sedd", primary:true, onClick: handleMarkSedd}]
      break
    case "andring-dagorder":
      actions = [
        {label:"📋 Öppna dagorder", primary:true, onClick: () => { onMarkSedd(notis.id); navigate("dagorder") }},
        {label:"⚪ Markera sedd", secondary:true, onClick: handleMarkSedd},
      ]
      break
    case "arbetare-ej-sedd":
      actions = [
        {label:"📢 Skicka påminnelse", primary:true, onClick: () => setPaminnelseOpen(true)},
        {label:"⚪ Markera sedd", secondary:true, onClick: handleMarkSedd},
      ]
      break
    case "kan-ej-utfora":
      actions = [
        {label:"💼 Öppna Mina Arbeten", primary:true, onClick: () => { onMarkActionDone(notis.id); navigate("mina-arbeten") }},
        {label:"⚪ Markera sedd", secondary:true, onClick: handleMarkSedd},
      ]
      break
    case "nytt-dokument":
      actions = [
        {label:"📄 Öppna dokumentet", primary:true, onClick: () => { onMarkSedd(notis.id); navigate("dokumentnav-kategori", {kategori:"hms"}) }},
        {label:"⚪ Markera sedd", secondary:true, onClick: handleMarkSedd},
      ]
      break
    case "nytt-meddelande":
      actions = [
        {label:"💬 Öppna chatten", primary:true, onClick: () => { onMarkSedd(notis.id); navigate("meddelanden") }},
      ]
      break
    default:
      actions = [{label:"⚪ Markera sedd", primary:true, onClick: handleMarkSedd}]
  }

  const oklarat = notis.kraverAction ? !notis.actionDone : !notis.sedd

  return (
    <div>
      <div style={hdr}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:11,color:C.mu}}>NOTIS</div>
          <div style={{fontWeight:600,fontSize:15,letterSpacing:"-.2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{notis.titel}</div>
        </div>
        <span style={{fontSize:10.5,padding:"4px 10px",borderRadius:10,background:oklarat?"rgba(224,82,82,.12)":"rgba(46,125,50,.1)",color:oklarat?C.da:C.ok,fontWeight:700,letterSpacing:".3px"}}>
          {oklarat ? "🔴 EJ SEDD" : "⚪ SEDD"}
        </span>
      </div>

      <div style={{padding:"18px 20px 30px",display:"flex",flexDirection:"column",gap:14}}>

        {/* Info-bricka — kan inte stängas utan action */}
        <div style={{padding:"10px 14px",background:"rgba(232,184,75,.08)",border:"1px solid rgba(232,184,75,.3)",borderRadius:10,fontSize:11.5,color:"#b88a00",lineHeight:1.5,fontWeight:500}}>
          ℹ️ Välj en åtgärd för att stänga den här notisen.
        </div>

        {/* Stor rubrik + fullt meddelande */}
        <div style={{...card,padding:"16px 18px"}}>
          <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:8}}>MEDDELANDE</div>
          <div style={{fontSize:15,color:C.tx,lineHeight:1.6,fontWeight:500,whiteSpace:"pre-wrap",marginBottom:notis.kommentar?12:0}}>{notis.meddelande}</div>
          {notis.kommentar && (
            <div style={{fontSize:13,color:C.mu,padding:"10px 12px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:8,fontStyle:"italic",lineHeight:1.5}}>
              "{notis.kommentar}"
            </div>
          )}
        </div>

        {/* Avsändar-info */}
        <div style={{...card,padding:"14px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <IniAvatar name={notis.av || "?"} size={36}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:10.5,color:C.mu,fontWeight:600,letterSpacing:".3px"}}>FRÅN</div>
              <div style={{fontSize:13.5,color:C.tx,fontWeight:600,marginTop:1}}>{notis.av || "—"}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10.5,color:C.mu,fontWeight:600,letterSpacing:".3px"}}>TID</div>
              <div style={{fontSize:13,color:C.tx,marginTop:1,fontVariantNumeric:"tabular-nums"}}>{notis.tid}</div>
            </div>
          </div>
        </div>

        {/* Tidslinje för avvikelse-typer */}
        {fasthAvvikelse && ["inkommen-avvikelse","sedd-av-arbetare","klar-av-arbetare"].includes(notis.typ) && (
          <div style={{...card,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:10}}>AVVIKELSE-TIDSLINJE</div>
            <AvvikelseTimeline a={fasthAvvikelse}/>
          </div>
        )}

        {/* Lista över arbetare som ej markerat sedd */}
        {notis.ejSedda && notis.ejSedda.length > 0 && (
          <div style={{...card,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:10}}>VÄNTAR PÅ ({notis.ejSedda.length})</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {notis.ejSedda.map(p => (
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:C.bg,border:`1px solid ${C.b}`,borderRadius:8}}>
                  <IniAvatar name={p.name} size={30}/>
                  <div style={{fontSize:13,color:C.tx,fontWeight:500}}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action-knappar */}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:4}}>
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.onClick}
              style={{
                width:"100%",
                padding:"14px 16px",
                borderRadius:10,
                border: a.primary ? "none" : `1px solid ${C.b}`,
                background: a.primary ? C.ac : C.bg2,
                color: a.primary ? "#fff" : C.tx,
                fontSize:14,
                fontWeight: a.primary ? 500 : 400,
                cursor:"pointer",
                fontFamily:"inherit",
              }}
            >{a.label}</button>
          ))}
        </div>
      </div>

      {delegeraOpen && fasthAvvikelse && (
        <DelegeraTillArbetareModal
          avvikelse={fasthAvvikelse}
          delegeraAv={user.name}
          onDelegera={handleDelegeraConfirm}
          onClose={() => setDelegeraOpen(false)}
        />
      )}
      {paminnelseOpen && (
        <PaminnelseModal
          notis={notis}
          onConfirm={handlePaminnelseConfirm}
          onClose={() => setPaminnelseOpen(false)}
        />
      )}
    </div>
  )
}




// ═══════════════════════════════════════════════════════════════════════
// TIDSRAPPORTERING v2 — världens enklaste & tydligaste
// • StampelArbetare — en stor knapp, dark blue när jobbet pågår
// • MinTidArbetare — 4 KPI-kort + veckostapel + senaste rapporter
// • ManuellTidForm — för glömda stämplingar
// • TidChefDashboard — 4 KPIs + live "just nu" + veckotabell + projektprogress
// ═══════════════════════════════════════════════════════════════════════

// — Datum-hjälpare —
function dagensDatum() { return "2026-05-25" }   // demo-fixerat datum
function dagensVeckodag() { return new Date(dagensDatum()).getDay() } // 0=sön, 1=mån, ...
function veckansDatum() {
  // Returnerar [mån, tis, ons, tor, fre, lör, sön] för aktuell vecka
  const idag = new Date(dagensDatum())
  const wd = idag.getDay() || 7  // sön = 7 i ISO
  const mondag = new Date(idag)
  mondag.setDate(idag.getDate() - (wd - 1))
  return [0,1,2,3,4,5,6].map(i => {
    const d = new Date(mondag); d.setDate(mondag.getDate() + i)
    return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`
  })
}
function manadensRapporter(rapporter, anstalldNamn) {
  const idag = dagensDatum()
  const manad = idag.slice(0, 7) // YYYY-MM
  return (rapporter || []).filter(r => r.anstalldNamn === anstalldNamn && (r.datum || "").startsWith(manad) && r.status !== "pågående")
}
function forraManadensRapporter(rapporter, anstalldNamn) {
  const d = new Date(dagensDatum())
  const fm = new Date(d.getFullYear(), d.getMonth() - 1, 1)
  const fmStr = `${fm.getFullYear()}-${pad2(fm.getMonth()+1)}`
  return (rapporter || []).filter(r => r.anstalldNamn === anstalldNamn && (r.datum || "").startsWith(fmStr) && r.status !== "pågående")
}
function summaTimmar(rapporter) {
  return (rapporter || []).reduce((s, r) => s + (Number(r.timmar) || 0), 0)
}
function summaOvertid(rapporter) {
  return (rapporter || []).filter(r => r.typ === "Övertid").reduce((s, r) => s + (Number(r.timmar) || 0), 0)
}

// ─────────────────────────────────────────────────────────────────────────
// ARBETARE — STÄMPLA (StampelArbetare)
// En skärm, en knapp. Inget mer. Dark blue när jobbet pågår.
// ─────────────────────────────────────────────────────────────────────────
function StampelArbetare({user, projekt, tidsrapporter, navigate, onStart, onStop, senasteProjektId, onSenasteProjekt}) {
  const aktivaProjekt = projekt.filter(p => p.status === "Pågående" || p.status === "Planering").slice(0, 5)
  const aktivPass = tidsrapporter.find(tr => tr.anstalldNamn === user.name && tr.status === "pågående")
  const aktivProjekt = aktivPass ? projekt.find(p => p.id === aktivPass.projektId) : null

  const initialPid = senasteProjektId && aktivaProjekt.some(p => p.id === senasteProjektId)
    ? senasteProjektId : (aktivaProjekt[0]?.id || null)
  const [valdProjektId, setValdProjektId] = useState(initialPid)
  const [showPicker, setShowPicker] = useState(false)
  const [now, setNow] = useState(new Date())
  const [stoppadSummering, setStoppadSummering] = useState(null)
  const [startar, setStartar] = useState(false)
  const [stoppar, setStoppar] = useState(false)

  useEffect(() => {
    if (!aktivPass) return
    const i = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(i)
  }, [aktivPass])

  const valdProjekt = projekt.find(p => p.id === valdProjektId)

  async function handleStart() {
    if (!valdProjektId || startar) return
    setStartar(true)
    const gps = await hamtaGPS()
    onStart({projektId: valdProjektId, anstalldNamn: user.name, gps})
    onSenasteProjekt(valdProjektId)
    setStartar(false)
  }
  async function handleStop() {
    if (!aktivPass || stoppar) return
    setStoppar(true)
    const gps = await hamtaGPS()
    // Visa summering INNAN vi sparar — användaren får bekräfta
    const slutTid = nowToHHMM(new Date())
    setStoppadSummering({
      passId: aktivPass.id,
      projektNamn: aktivProjekt?.namn || "—",
      startTid: aktivPass.startTid,
      stoppTid: slutTid,
      timmar: timmarMellan(aktivPass.startTid, slutTid),
      gps,
    })
    setStoppar(false)
  }
  function bekraftaStopp() {
    if (!stoppadSummering) return
    onStop({passId: stoppadSummering.passId, gps: stoppadSummering.gps})
    setStoppadSummering(null)
  }
  function bytaProjekt() {
    // Stoppa nuvarande pass, öppna picker för nytt
    if (!aktivPass) return
    onStop({passId: aktivPass.id, gps: null})
    setShowPicker(true)
  }

  // ─── SUMMERING-VYN ───
  if (stoppadSummering) {
    return (
      <div style={{minHeight:"100vh",background:C.bg2}}>
        <div style={hdr}>
          <div style={{fontWeight:600,fontSize:15}}>⏹️ Pass avslutat</div>
        </div>
        <div style={{padding:"30px 20px",maxWidth:430,margin:"0 auto"}}>
          <div style={{textAlign:"center",fontSize:60,marginBottom:6}}>✅</div>
          <div style={{textAlign:"center",fontSize:20,fontWeight:600,marginBottom:24,color:C.tx}}>Sammanfattning</div>

          <div style={{background:"#fff",border:`1px solid ${C.b}`,borderRadius:14,padding:"18px 20px",marginBottom:16,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            <SumRad l="Projekt"  v={stoppadSummering.projektNamn} bold/>
            <SumRad l="Startid"  v={stoppadSummering.startTid}/>
            <SumRad l="Sluttid"  v={stoppadSummering.stoppTid}/>
            <SumRad l="Total tid" v={`${stoppadSummering.timmar.toFixed(2).replace(".",",")} h`} stor/>
          </div>

          <button onClick={bekraftaStopp} style={{...btnP,padding:"18px",fontSize:16,fontWeight:600,marginBottom:10}}>✓ Bekräfta och spara</button>
          <button onClick={() => setStoppadSummering(null)} style={{...btnG,padding:"14px",fontSize:13.5}}>Redigera</button>
        </div>
      </div>
    )
  }

  // ─── PÅGÅR — DARK BLUE BAKGRUND ───
  if (aktivPass && aktivProjekt) {
    return (
      <div style={{
        minHeight:"100vh",
        background:"linear-gradient(180deg, #0a2540 0%, #0d2f54 50%, #0a2540 100%)",
        color:"#fff",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,.1)"}}>
          <span style={{fontSize:18}}>⏱️</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:11,letterSpacing:".5px",color:"rgba(255,255,255,.6)"}}>PÅGÅR JUST NU</div>
            <div style={{fontSize:14,fontWeight:600,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{aktivProjekt.namn}</div>
          </div>
          <button onClick={() => navigate("min-tid")} style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:8,padding:"6px 10px",fontSize:11,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>Min tid</button>
        </div>

        <div style={{padding:"50px 20px 40px",textAlign:"center"}}>
          {/* Live-tickande timer */}
          <div style={{
            fontSize:72,
            fontWeight:700,
            fontVariantNumeric:"tabular-nums",
            letterSpacing:"-2px",
            color:"#fff",
            textShadow:"0 4px 24px rgba(91,156,246,.3)",
            lineHeight:1,
            marginBottom:14,
          }}>
            {formatSeconds(elapsedSeconds(aktivPass.startTid, now))}
          </div>

          <div style={{fontSize:14,color:"rgba(255,255,255,.7)",marginBottom:6}}>Startade kl {aktivPass.startTid}{aktivPass.startGps && <span> · 📍 GPS</span>}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.55)",marginBottom:36}}>📍 {aktivProjekt.plats}</div>

          {/* Stor röd STOPPA-knapp */}
          <button onClick={handleStop} disabled={stoppar} style={{
            width:"100%",maxWidth:340,
            background:stoppar?"#7d1a1a":"#c62828",
            color:"#fff",border:"none",borderRadius:20,
            padding:"30px 20px",fontSize:24,fontWeight:700,letterSpacing:"2px",
            cursor:stoppar?"wait":"pointer",fontFamily:"inherit",
            boxShadow:"0 14px 38px rgba(198,40,40,.45)",
          }}>{stoppar ? "📡 STÄMPLAR UT..." : "■ STOPPA"}</button>

          {/* Byt projekt — liten länk */}
          <button onClick={bytaProjekt} style={{
            background:"none",border:"1px solid rgba(255,255,255,.2)",
            color:"rgba(255,255,255,.85)",padding:"10px 16px",
            borderRadius:10,fontSize:12.5,cursor:"pointer",fontFamily:"inherit",
            marginTop:18,
          }}>↻ Byt projekt</button>
        </div>
      </div>
    )
  }

  // ─── INTE INSTÄMPLAD — vit bakgrund, stor grön START-knapp ───
  return (
    <div style={{minHeight:"100vh",background:C.bg}}>
      <div style={hdr}>
        <button onClick={() => navigate("dagorder")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{fontWeight:600,fontSize:15}}>Stämpla tid</div>
        <button onClick={() => navigate("min-tid")} style={{marginLeft:"auto",background:C.bg2,border:`1px solid ${C.b}`,borderRadius:8,padding:"6px 10px",fontSize:11,color:C.tx,cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>📊 Min tid</button>
      </div>

      <div style={{padding:"30px 20px",maxWidth:430,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:11.5,color:C.mu,letterSpacing:".5px",fontWeight:500,marginBottom:4}}>{new Date(dagensDatum()).toLocaleDateString("sv-SE",{weekday:"long"}).toUpperCase()}</div>
        <div style={{fontSize:13.5,color:C.tx,marginBottom:30,fontWeight:500}}>{dagensDatum()}</div>

        {/* Projektväljare — stor klickbar yta */}
        <button onClick={() => setShowPicker(true)} style={{
          width:"100%",background:C.bg2,border:`1.5px solid ${C.b}`,
          borderRadius:14,padding:"18px 20px",textAlign:"left",cursor:"pointer",marginBottom:24,fontFamily:"inherit"
        }}>
          <div style={{fontSize:10.5,color:C.mu,letterSpacing:".6px",textTransform:"uppercase",marginBottom:5,fontWeight:600}}>Projekt</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
            <div style={{minWidth:0,flex:1}}>
              <div style={{fontSize:17,fontWeight:600,color:valdProjekt?C.tx:C.mu,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {valdProjekt ? valdProjekt.namn : "Välj projekt"}
              </div>
              {valdProjekt && <div style={{fontSize:12,color:C.mu,marginTop:3}}>📍 {valdProjekt.plats}</div>}
            </div>
            <div style={{fontSize:22,color:C.mu,flexShrink:0}}>▾</div>
          </div>
        </button>

        {/* STOR GRÖN STARTA-KNAPP */}
        <button onClick={handleStart} disabled={!valdProjektId || startar} style={{
          width:"100%",
          background: !valdProjektId ? "#a8c5a8" : startar ? "#1a5e1a" : "#15803d",
          color:"#fff",border:"none",borderRadius:20,padding:"30px 20px",fontSize:24,fontWeight:700,letterSpacing:"2px",
          cursor:(valdProjektId && !startar)?"pointer":"not-allowed",fontFamily:"inherit",
          boxShadow: valdProjektId ? "0 14px 38px rgba(21,128,61,.32)" : "none",
          opacity: valdProjektId ? 1 : 0.65, transition:"all .15s",
        }}>{startar ? "📡 HÄMTAR POSITION..." : "▶ STARTA ARBETE"}</button>

        {/* Liten länk för manuell rapport */}
        <button onClick={() => navigate("manuell-tid")} style={{
          marginTop:24,
          background:"none",border:"none",
          color:C.ac,fontSize:13,cursor:"pointer",fontFamily:"inherit",
          textDecoration:"underline",fontWeight:500,
        }}>📝 Rapportera tid manuellt (glömt stämpla?)</button>
      </div>

      {/* Bottom-sheet projektväljare */}
      {showPicker && (
        <div onClick={() => setShowPicker(false)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
          <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 28px",maxWidth:430,width:"100%",maxHeight:"82vh",overflowY:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".5px",textAlign:"center",marginBottom:14,fontWeight:600}}>VÄLJ PROJEKT</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
              {aktivaProjekt.map(p => {
                const sel = p.id === valdProjektId
                return (
                  <button key={p.id} onClick={() => { setValdProjektId(p.id); setShowPicker(false) }} style={{
                    display:"flex",alignItems:"center",gap:12,
                    background:sel?"rgba(21,101,192,.08)":C.bg2,
                    border:`1.5px solid ${sel?C.ac:C.b}`,
                    borderRadius:12,padding:"16px 14px",
                    cursor:"pointer",textAlign:"left",fontFamily:"inherit"
                  }}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:16,fontWeight:600,color:sel?C.ac:C.tx}}>{p.namn}</div>
                      <div style={{fontSize:12,color:C.mu,marginTop:2}}>📍 {p.plats}</div>
                    </div>
                    {sel && <div style={{fontSize:20,color:C.ac,fontWeight:700}}>✓</div>}
                  </button>
                )
              })}
            </div>
            <button onClick={() => setShowPicker(false)} style={btnG}>Avbryt</button>
          </div>
        </div>
      )}
    </div>
  )
}

// — Hjälpkomponent för summeringsrader —
function SumRad({l, v, bold, stor}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"8px 0",borderBottom:stor?"none":`1px solid ${C.bg3}`}}>
      <span style={{fontSize:13,color:C.mu,fontWeight:500}}>{l}</span>
      <span style={{
        fontSize: stor ? 22 : 14.5,
        fontWeight: stor ? 700 : (bold ? 600 : 500),
        color: stor ? C.ac : C.tx,
        fontVariantNumeric: stor ? "tabular-nums" : undefined,
      }}>{v}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// ARBETAREN — DASHBOARD "MIN TID"
// 4 KPI-kort + veckostapel + senaste rapporter
// ─────────────────────────────────────────────────────────────────────────
function MinTidArbetare({user, projekt, tidsrapporter, navigate, onEdit}) {
  const namn = user.name
  const veckaDatum = veckansDatum().slice(0, 5)  // mån-fre
  const fullveckaDatum = veckansDatum()
  const idag = dagensDatum()

  const aktivPass = tidsrapporter.find(tr => tr.anstalldNamn === namn && tr.status === "pågående")

  // Tids-räkning
  const idagsRapporter = (tidsrapporter || []).filter(r => r.anstalldNamn === namn && r.datum === idag && r.status !== "pågående")
  const idagsTim = summaTimmar(idagsRapporter)
  const veckaRapporter = (tidsrapporter || []).filter(r => r.anstalldNamn === namn && fullveckaDatum.includes(r.datum) && r.status !== "pågående")
  const veckaTim = summaTimmar(veckaRapporter)
  const manadsRapporter = manadensRapporter(tidsrapporter, namn)
  const manadTim = summaTimmar(manadsRapporter)
  const forraManadTim = summaTimmar(forraManadensRapporter(tidsrapporter, namn))
  const overtidTim = summaOvertid(manadsRapporter)

  // Veckostapel-data: timmar per dag mån-fre
  const dagar = ["MÅN","TIS","ONS","TOR","FRE"]
  const dagsTimmar = veckaDatum.map(d => {
    const dagRap = (tidsrapporter || []).filter(r => r.anstalldNamn === namn && r.datum === d && r.status !== "pågående")
    return summaTimmar(dagRap)
  })
  const maxTim = Math.max(...dagsTimmar, 8)
  const veckaDagsIndex = dagensVeckodag() === 0 ? 6 : dagensVeckodag() - 1

  // Senaste 8 rapporter (avslutade)
  const senaste = (tidsrapporter || [])
    .filter(r => r.anstalldNamn === namn && r.status !== "pågående" && r.startTid)
    .sort((a,b) => (b.datum + (b.startTid||"")).localeCompare(a.datum + (a.startTid||"")))
    .slice(0, 8)

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>⏱️ Min tid</h1>
          <button onClick={() => navigate("stampla")} style={{...btnP,padding:"8px 14px",fontSize:13,fontWeight:500,width:"auto"}}>
            {aktivPass ? "■ STOPPA" : "▶ STARTA"}
          </button>
        </div>
        <div style={{fontSize:13,color:C.mu,marginBottom:18}}>
          {aktivPass
            ? <span style={{color:C.ok,fontWeight:500}}>● Pågående pass</span>
            : "Översikt över dina arbetade timmar"}
        </div>
      </div>

      {/* 4 KPI-kort */}
      <div style={{padding:"0 20px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <KpiTidKort
          ikon="⏱️" rubrik="IDAG"
          siffra={`${idagsTim.toFixed(1).replace(".",",")} h`}
          sub={idagsRapporter.length === 0 ? "Ingen tid ännu" : `${idagsRapporter.length} pass`}
          accent={idagsTim > 0 ? C.ac : C.mu}
        />
        <KpiTidKort
          ikon="📅" rubrik="DENNA VECKA"
          siffra={`${veckaTim.toFixed(1).replace(".",",")} h`}
          sub={`av 40 h normal`}
          accent={veckaTim >= 40 ? C.ok : C.ac}
        />
        <KpiTidKort
          ikon="📆" rubrik="DENNA MÅNAD"
          siffra={`${manadTim.toFixed(0)} h`}
          sub={
            forraManadTim > 0
              ? `${manadTim > forraManadTim ? "↑" : "↓"} ${Math.abs(manadTim - forraManadTim).toFixed(0)} h vs förra`
              : "Förra månaden: —"
          }
          accent={C.ac}
        />
        <KpiTidKort
          ikon="💰" rubrik="ÖVERTID DENNA MÅNAD"
          siffra={`${overtidTim.toFixed(1).replace(".",",")} h`}
          sub={overtidTim > 0 ? "Tillkommer på lönen" : "Inga övertidstimmar"}
          accent={overtidTim > 0 ? "#b88a00" : C.mu}
        />
      </div>

      {/* Veckostapel mån-fre */}
      <div style={{padding:"0 20px 16px"}}>
        <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 16px"}}>
          <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:12}}>DENNA VECKA · MÅN–FRE</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:8,height:90}}>
            {dagsTimmar.map((tim, i) => {
              const h = Math.max(4, (tim / maxTim) * 80)
              const aktiv = i === veckaDagsIndex
              const tom = tim === 0
              return (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{fontSize:11,fontWeight:600,color:tom?C.mu:C.tx,fontVariantNumeric:"tabular-nums"}}>{tom?"–":`${tim.toFixed(1)}h`}</div>
                  <div style={{
                    width:"100%",
                    height: h,
                    background: tom ? C.bg3 : aktiv ? C.ac : "rgba(21,101,192,.45)",
                    borderRadius:4,
                    transition:"height .2s",
                  }}/>
                  <div style={{fontSize:10,color:aktiv?C.ac:C.mu,fontWeight:aktiv?700:500,letterSpacing:".3px"}}>{dagar[i]}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Senaste rapporter */}
      <div style={{padding:"0 20px 16px"}}>
        <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:10,textTransform:"uppercase"}}>Senaste rapporter</div>
        {senaste.length === 0 ? (
          <div style={{padding:"24px 16px",textAlign:"center",fontSize:13,color:C.mu,background:C.bg2,border:`1px dashed ${C.b}`,borderRadius:10}}>
            Inga rapporter ännu — börja med "▶ STARTA ARBETE"
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {senaste.map(r => {
              const p = projekt.find(x => x.id === r.projektId)
              return (
                <button
                  key={r.id}
                  onClick={() => onEdit && onEdit(r)}
                  style={{display:"flex",alignItems:"center",gap:12,background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",width:"100%"}}
                >
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:2}}>
                      <span style={{fontSize:13.5,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p?.namn || "—"}</span>
                      <span style={{fontSize:13,fontWeight:600,color:C.tx,fontVariantNumeric:"tabular-nums",flexShrink:0}}>{r.timmar.toFixed(2).replace(".",",")}h</span>
                    </div>
                    <div style={{fontSize:11.5,color:C.mu}}>
                      {r.datum}
                      {r.startTid && r.stoppTid && <span> · {r.startTid}–{r.stoppTid}</span>}
                      {r.typ && r.typ !== "Normal" && <span style={{marginLeft:6,padding:"1px 6px",borderRadius:6,background:r.typ === "Övertid" ? "rgba(232,184,75,.18)" : "rgba(21,101,192,.12)",color:r.typ === "Övertid" ? "#b88a00" : C.ac,fontWeight:600,fontSize:10}}>{r.typ.toUpperCase()}</span>}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        <button onClick={() => navigate("tid-historik")} style={{...btnG,marginTop:10,fontSize:13,padding:"10px"}}>📜 Se all historik</button>
      </div>

      <div style={{padding:"0 20px 24px"}}>
        <button onClick={() => navigate("manuell-tid")} style={{...btnG,fontSize:13,padding:"10px",borderStyle:"dashed",color:C.ac}}>📝 Rapportera tid manuellt</button>
      </div>
    </div>
  )
}

function KpiTidKort({ikon, rubrik, siffra, sub, accent}) {
  return (
    <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:12,padding:"14px 14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
        <span style={{fontSize:14}}>{ikon}</span>
        <div style={{fontSize:9.5,color:C.mu,fontWeight:700,letterSpacing:".3px"}}>{rubrik}</div>
      </div>
      <div style={{fontSize:22,fontWeight:700,color:accent,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{siffra}</div>
      <div style={{fontSize:11,color:C.mu,marginTop:4,lineHeight:1.4}}>{sub}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// MANUELL TID — för glömda stämplingar
// ─────────────────────────────────────────────────────────────────────────
function ManuellTidForm({user, projekt, navigate, onManuellRapport}) {
  const aktivaProjekt = projekt.filter(p => p.status === "Pågående" || p.status === "Planering")
  const [datum, setDatum] = useState(dagensDatum())
  const [projektId, setProjektId] = useState(aktivaProjekt[0]?.id || "")
  const [start, setStart] = useState("")
  const [slut, setSlut] = useState("")
  const [anledning, setAnledning] = useState("")
  const [sparad, setSparad] = useState(false)

  function spara() {
    if (!datum || !projektId || !start || !slut || !anledning.trim()) return
    onManuellRapport({
      datum, projektId, startTid: start, stoppTid: slut, anledning, anstalldNamn: user.name,
    })
    setSparad(true)
    setTimeout(() => navigate("min-tid"), 1500)
  }

  if (sparad) {
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 80px)",padding:"0 24px",textAlign:"center"}}>
        <div style={{fontSize:64,marginBottom:14}}>✅</div>
        <h2 style={{fontSize:22,fontWeight:600,marginBottom:8}}>Tidsrapport sparad!</h2>
        <p style={{color:C.mu,fontSize:14}}>Återgår till Min tid...</p>
      </div>
    )
  }

  const giltigt = datum && projektId && start && slut && anledning.trim()

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("min-tid")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{fontWeight:600,fontSize:15}}>📝 Manuell tidsrapport</div>
      </div>
      <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:14,maxWidth:430,margin:"0 auto"}}>

        <div style={{background:"rgba(232,184,75,.08)",border:"1px solid rgba(232,184,75,.3)",borderRadius:10,padding:"10px 14px",fontSize:12,color:"#b88a00",lineHeight:1.5}}>
          ℹ️ Använd detta när du glömt stämpla in/ut eller hade ingen mottagning.
        </div>

        <div>
          <label style={lbl}>Datum</label>
          <input type="date" style={inp} value={datum} onChange={e => setDatum(e.target.value)}/>
        </div>

        <div>
          <label style={lbl}>Projekt</label>
          <select style={inp} value={projektId} onChange={e => setProjektId(e.target.value)}>
            {aktivaProjekt.map(p => <option key={p.id} value={p.id}>{p.namn}</option>)}
          </select>
        </div>

        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1}}>
            <label style={lbl}>Starttid</label>
            <input type="time" style={inp} value={start} onChange={e => setStart(e.target.value)}/>
          </div>
          <div style={{flex:1}}>
            <label style={lbl}>Sluttid</label>
            <input type="time" style={inp} value={slut} onChange={e => setSlut(e.target.value)}/>
          </div>
        </div>

        {start && slut && (
          <div style={{fontSize:13,color:C.mu,padding:"8px 12px",background:C.bg2,borderRadius:8,textAlign:"center"}}>
            Total tid: <strong style={{color:C.tx,fontWeight:600}}>{timmarMellan(start, slut).toFixed(2).replace(".",",")} h</strong>
          </div>
        )}

        <div>
          <label style={lbl}>Kort anledning</label>
          <textarea style={{...inp,height:80,resize:"none"}} placeholder="t.ex. Glömde stämpla in när vi började, hade ingen mottagning..." value={anledning} onChange={e => setAnledning(e.target.value)}/>
        </div>

        <button onClick={spara} disabled={!giltigt} style={{...btnP,padding:"14px",fontSize:14,opacity:giltigt?1:0.5,cursor:giltigt?"pointer":"not-allowed"}}>✓ Spara rapport</button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// TID HISTORIK — filtrerbar lista
// ─────────────────────────────────────────────────────────────────────────
function TidHistorikArbetare({user, projekt, tidsrapporter, navigate}) {
  const [filterProj, setFilterProj] = useState("")
  const [filterManad, setFilterManad] = useState("")
  const namn = user.name
  const allaMinaRap = (tidsrapporter || []).filter(r => r.anstalldNamn === namn && r.status !== "pågående").sort((a,b) => (b.datum + (b.startTid||"")).localeCompare(a.datum + (a.startTid||"")))
  const manader = [...new Set(allaMinaRap.map(r => (r.datum || "").slice(0,7)).filter(Boolean))]
  const projektMedRapport = [...new Set(allaMinaRap.map(r => r.projektId))].map(id => projekt.find(p => p.id === id)).filter(Boolean)
  const filtrerade = allaMinaRap.filter(r =>
    (!filterProj || r.projektId === filterProj) &&
    (!filterManad || (r.datum || "").startsWith(filterManad))
  )
  const totalTim = summaTimmar(filtrerade)

  return (
    <div>
      <div style={hdr}>
        <button onClick={() => navigate("min-tid")} style={{background:"none",border:"none",cursor:"pointer",color:C.tx,fontSize:22,lineHeight:1}}>←</button>
        <div style={{fontWeight:600,fontSize:15}}>📜 Min tidshistorik</div>
      </div>
      <div style={{padding:"16px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
          <select style={inp} value={filterManad} onChange={e => setFilterManad(e.target.value)}>
            <option value="">Alla månader</option>
            {manader.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select style={inp} value={filterProj} onChange={e => setFilterProj(e.target.value)}>
            <option value="">Alla projekt</option>
            {projektMedRapport.map(p => <option key={p.id} value={p.id}>{p.namn}</option>)}
          </select>
        </div>
        <div style={{background:C.ac,color:"#fff",borderRadius:10,padding:"12px 14px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:11,fontWeight:600,letterSpacing:".4px",opacity:.85}}>TOTAL ({filtrerade.length} rapporter)</span>
          <span style={{fontSize:20,fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{totalTim.toFixed(1).replace(".",",")} h</span>
        </div>
        {filtrerade.length === 0 ? (
          <div style={{padding:30,textAlign:"center",color:C.mu,fontSize:13}}>Inga rapporter matchade filtren</div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {filtrerade.map(r => {
              const p = projekt.find(x => x.id === r.projektId)
              return (
                <div key={r.id} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"10px 12px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:2}}>
                    <span style={{fontSize:13,fontWeight:600}}>{p?.namn || "—"}</span>
                    <span style={{fontSize:13,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{r.timmar.toFixed(2).replace(".",",")}h</span>
                  </div>
                  <div style={{fontSize:11.5,color:C.mu}}>{r.datum}{r.startTid&&r.stoppTid&&` · ${r.startTid}–${r.stoppTid}`}{r.typ&&r.typ!=="Normal"&&` · ${r.typ}`}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// CHEF/FÖRETAG — TIDS-DASHBOARD
// 4 KPIs, live "just nu", veckotabell, projektprogress, filter, export
// ─────────────────────────────────────────────────────────────────────────
function TidChefDashboard({user, projekt, tidsrapporter, navigate}) {
  const [now, setNow] = useState(new Date())
  const [vyTab, setVyTab] = useState("live")  // live | vecka | projekt
  const [filterAnst, setFilterAnst] = useState("")
  const [filterProj, setFilterProj] = useState("")
  const [filterOvertid, setFilterOvertid] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  // Live tick varje 30s (för "elapsed" på pågående pass)
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(i)
  }, [])

  const idag = dagensDatum()
  const fullveckaDatum = veckansDatum()
  const dagar = ["MÅN","TIS","ONS","TOR","FRE","LÖR","SÖN"]

  // Aktiva pass (instämplade just nu)
  const aktivaPass = (tidsrapporter || []).filter(r => r.status === "pågående")
  const alaAnstallda = [...new Set((tidsrapporter || []).map(r => r.anstalldNamn))].filter(Boolean).sort()

  // Förväntade idag: alla som har bokningar för v22 (eller alla med rapporter senaste veckan)
  // För demo: ta alla unika anställda från tidsrapporter-datan
  const forvantadeIdag = alaAnstallda
  const stamplatIdag = new Set((tidsrapporter || []).filter(r => r.datum === idag).map(r => r.anstalldNamn))
  const ejStamplat = forvantadeIdag.filter(n => !stamplatIdag.has(n))

  // Stats
  const timIdag = summaTimmar((tidsrapporter || []).filter(r => r.datum === idag && r.status !== "pågående"))
    + aktivaPass.reduce((s, p) => s + elapsedSeconds(p.startTid, now) / 3600, 0)
  const timVeckaTot = summaTimmar((tidsrapporter || []).filter(r => fullveckaDatum.includes(r.datum) && r.status !== "pågående"))

  // Veckotabell-data
  function timmarPerAnstalldDag(anstalld, datum) {
    const rap = (tidsrapporter || []).filter(r => r.anstalldNamn === anstalld && r.datum === datum && r.status !== "pågående")
    return summaTimmar(rap)
  }
  function fargForTimmar(tim, datum) {
    if (datum > idag) return null  // framtid
    if (tim === 0) return {bg:"rgba(224,82,82,.08)",fg:C.da,l:"ej"}
    if (tim < 7) return {bg:"rgba(232,184,75,.12)",fg:"#b88a00",l:`${tim.toFixed(1)}h`}
    if (tim > 9) return {bg:"rgba(91,156,246,.12)",fg:C.ac,l:`${tim.toFixed(1)}h`}
    return {bg:"rgba(46,125,50,.08)",fg:C.ok,l:`${tim.toFixed(1)}h`}
  }

  // Projektöversikt
  const aktivaProjektMedTid = projekt
    .filter(p => p.status === "Pågående" || p.status === "Planering")
    .map(p => {
      const rap = (tidsrapporter || []).filter(r => r.projektId === p.id && r.status !== "pågående")
      const totTim = summaTimmar(rap)
      const unikaAnst = new Set(rap.map(r => r.anstalldNamn)).size
      const budget = (p.budget || 0)
      const procent = budget > 0 ? (totTim / budget) * 100 : 0
      return {projekt:p, totTim, unikaAnst, budget, procent}
    })

  // Filter
  const filtreratAnst = filterAnst ? alaAnstallda.filter(n => n === filterAnst) : alaAnstallda
  const filtreratProj = filterProj ? aktivaProjektMedTid.filter(x => x.projekt.id === filterProj) : aktivaProjektMedTid

  return (
    <div>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <h1 style={{fontSize:22,fontWeight:600,letterSpacing:"-.3px"}}>⏱️ Tidsrapportering</h1>
          <button onClick={() => setExportOpen(true)} style={{...btnG,padding:"6px 12px",fontSize:12,width:"auto"}}>📊 Exportera</button>
        </div>
        <div style={{fontSize:13,color:C.mu,marginBottom:18}}>Översikt över alla anställdas tidrapporter</div>
      </div>

      {/* 4 KPI-kort */}
      <div style={{padding:"0 20px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <button onClick={() => setVyTab("live")} style={{...kpiBtn, background:vyTab==="live"?"rgba(46,125,50,.06)":C.bg2, borderColor:vyTab==="live"?"rgba(46,125,50,.4)":C.b}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{fontSize:14}}>👷</span>
            <div style={{fontSize:9.5,color:C.mu,fontWeight:700,letterSpacing:".3px"}}>JOBBAR JUST NU</div>
          </div>
          <div style={{fontSize:24,fontWeight:700,color:aktivaPass.length>0?C.ok:C.mu,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{aktivaPass.length}</div>
          <div style={{fontSize:11,color:C.mu,marginTop:4}}>Tryck för att se vilka</div>
        </button>

        <div style={kpiBtn}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{fontSize:14}}>⏱️</span>
            <div style={{fontSize:9.5,color:C.mu,fontWeight:700,letterSpacing:".3px"}}>TIMMAR IDAG</div>
          </div>
          <div style={{fontSize:24,fontWeight:700,color:C.ac,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{timIdag.toFixed(1).replace(".",",")} h</div>
          <div style={{fontSize:11,color:C.mu,marginTop:4}}>Alla anställda totalt</div>
        </div>

        <button onClick={() => setVyTab("vecka")} style={{...kpiBtn,background:vyTab==="vecka"?"rgba(21,101,192,.06)":C.bg2,borderColor:vyTab==="vecka"?"rgba(21,101,192,.4)":C.b}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{fontSize:14}}>📅</span>
            <div style={{fontSize:9.5,color:C.mu,fontWeight:700,letterSpacing:".3px"}}>TIMMAR DENNA VECKA</div>
          </div>
          <div style={{fontSize:24,fontWeight:700,color:C.ac,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{timVeckaTot.toFixed(0)} h</div>
          <div style={{fontSize:11,color:C.mu,marginTop:4}}>Tryck för veckotabell</div>
        </button>

        <div style={{...kpiBtn,background:ejStamplat.length>0?"rgba(224,82,82,.06)":C.bg2,borderColor:ejStamplat.length>0?"rgba(224,82,82,.4)":C.b}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{fontSize:14}}>⚠️</span>
            <div style={{fontSize:9.5,color:ejStamplat.length>0?C.da:C.mu,fontWeight:700,letterSpacing:".3px"}}>EJ STÄMPLAT IDAG</div>
          </div>
          <div style={{fontSize:24,fontWeight:700,color:ejStamplat.length>0?C.da:C.ok,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{ejStamplat.length}</div>
          <div style={{fontSize:11,color:C.mu,marginTop:4}}>{ejStamplat.length>0 ? `${ejStamplat.slice(0,2).join(", ")}${ejStamplat.length>2?"...":""}` : "Alla är stämplade"}</div>
        </div>
      </div>

      {/* Tab-väljare för olika vyer */}
      <div style={{padding:"0 20px 14px",display:"flex",gap:6,borderBottom:`1px solid ${C.b}`,marginBottom:14}}>
        {[
          {id:"live",    e:"📡", l:"Just nu"},
          {id:"vecka",   e:"📅", l:"Vecka"},
          {id:"projekt", e:"🏗", l:"Projekt"},
        ].map(t => {
          const sel = vyTab === t.id
          return (
            <button key={t.id} onClick={() => setVyTab(t.id)} style={{flex:1,padding:"10px 4px",border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:sel?600:400,color:sel?C.ac:C.mu,borderBottom:`2px solid ${sel?C.ac:"transparent"}`,marginBottom:-1}}>{t.e} {t.l}</button>
          )
        })}
      </div>

      {/* VY: JUST NU — live-list */}
      {vyTab === "live" && (
        <div style={{padding:"0 20px 24px"}}>
          <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:10,textTransform:"uppercase"}}>Instämplade just nu ({aktivaPass.length})</div>
          {aktivaPass.length === 0 ? (
            <div style={{padding:24,textAlign:"center",color:C.mu,fontSize:13,background:C.bg2,border:`1px dashed ${C.b}`,borderRadius:10}}>Ingen jobbar just nu</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {aktivaPass.map(p => {
                const proj = projekt.find(x => x.id === p.projektId)
                return (
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,background:"rgba(46,125,50,.04)",border:`1px solid rgba(46,125,50,.25)`,borderLeft:`4px solid ${C.ok}`,borderRadius:10,padding:"12px 14px"}}>
                    <IniAvatar name={p.anstalldNamn} size={40}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:600,color:C.tx}}>{p.anstalldNamn}</div>
                      <div style={{fontSize:11.5,color:C.mu,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{proj?.namn || "—"} · sedan {p.startTid}</div>
                    </div>
                    <div style={{fontSize:16,fontWeight:700,color:C.ok,fontVariantNumeric:"tabular-nums",flexShrink:0}}>{formatSeconds(elapsedSeconds(p.startTid, now))}</div>
                  </div>
                )
              })}
            </div>
          )}

          {ejStamplat.length > 0 && (
            <>
              <div style={{fontSize:11,color:C.da,fontWeight:700,letterSpacing:".4px",marginTop:20,marginBottom:10,textTransform:"uppercase"}}>⚠️ Ej stämplat ({ejStamplat.length})</div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {ejStamplat.map(n => (
                  <div key={n} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(224,82,82,.04)",border:`1px solid rgba(224,82,82,.25)`,borderLeft:`4px solid ${C.da}`,borderRadius:10,padding:"10px 12px"}}>
                    <IniAvatar name={n} size={32}/>
                    <span style={{fontSize:13,color:C.tx,fontWeight:500,flex:1}}>{n}</span>
                    <span style={{fontSize:11,color:C.da,fontWeight:600,letterSpacing:".3px"}}>EJ STÄMPLAT</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* VY: VECKA — tabell */}
      {vyTab === "vecka" && (
        <div style={{padding:"0 20px 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <select style={inp} value={filterAnst} onChange={e => setFilterAnst(e.target.value)}>
              <option value="">Alla anställda</option>
              {alaAnstallda.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <select style={inp} value={filterProj} onChange={e => setFilterProj(e.target.value)}>
              <option value="">Alla projekt</option>
              {projekt.map(p => <option key={p.id} value={p.id}>{p.namn}</option>)}
            </select>
          </div>

          <div style={{overflowX:"auto",background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{background:C.bg3}}>
                  <th style={vTh}>Anställd</th>
                  {dagar.slice(0,5).map((d,i) => (
                    <th key={d} style={{...vTh,textAlign:"center",fontSize:10}}>{d}<br/><span style={{color:C.mu,fontWeight:400,fontSize:9}}>{fullveckaDatum[i].slice(5)}</span></th>
                  ))}
                  <th style={{...vTh,textAlign:"right",background:"rgba(21,101,192,.08)"}}>Totalt</th>
                </tr>
              </thead>
              <tbody>
                {filtreratAnst.map(n => {
                  const tider = fullveckaDatum.slice(0,5).map(d => timmarPerAnstalldDag(n, d))
                  const tot = tider.reduce((s,t) => s+t, 0)
                  return (
                    <tr key={n} style={{borderTop:`1px solid ${C.bg3}`}}>
                      <td style={{...vTd,fontWeight:500,whiteSpace:"nowrap"}}>{n}</td>
                      {tider.map((tim,i) => {
                        const farg = fargForTimmar(tim, fullveckaDatum[i])
                        return (
                          <td key={i} style={{...vTd,textAlign:"center",padding:"6px 4px"}}>
                            {farg
                              ? <span style={{display:"inline-block",padding:"3px 6px",borderRadius:6,background:farg.bg,color:farg.fg,fontWeight:600,fontSize:11,fontVariantNumeric:"tabular-nums"}}>{farg.l}</span>
                              : <span style={{color:C.mu,fontSize:11}}>—</span>}
                          </td>
                        )
                      })}
                      <td style={{...vTd,textAlign:"right",fontWeight:700,background:"rgba(21,101,192,.04)",color:tot>=40?C.ok:tot>=32?C.tx:C.mu,fontVariantNumeric:"tabular-nums"}}>{tot.toFixed(1).replace(".",",")}h</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div style={{display:"flex",gap:12,marginTop:10,fontSize:10.5,color:C.mu,flexWrap:"wrap"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,borderRadius:3,background:"rgba(46,125,50,.4)"}}/>Normal (7-9h)</span>
            <span style={{display:"inline-flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,borderRadius:3,background:"rgba(232,184,75,.4)"}}/>Under förväntat</span>
            <span style={{display:"inline-flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,borderRadius:3,background:"rgba(224,82,82,.4)"}}/>Ej rapporterat</span>
            <span style={{display:"inline-flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,borderRadius:3,background:"rgba(91,156,246,.4)"}}/>Övertid (&gt;9h)</span>
          </div>
        </div>
      )}

      {/* VY: PROJEKT — progress-listor */}
      {vyTab === "projekt" && (
        <div style={{padding:"0 20px 24px"}}>
          <div style={{fontSize:11,color:C.mu,fontWeight:600,letterSpacing:".4px",marginBottom:10,textTransform:"uppercase"}}>Aktiva projekt ({aktivaProjektMedTid.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {aktivaProjektMedTid.map(({projekt:p, totTim, unikaAnst, budget, procent}) => {
              const farg = procent < 80 ? C.ok : procent < 100 ? "#b88a00" : C.da
              const bg = procent < 80 ? "rgba(46,125,50,.1)" : procent < 100 ? "rgba(232,184,75,.15)" : "rgba(224,82,82,.1)"
              return (
                <div key={p.id} style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:8}}>
                    <div style={{minWidth:0,flex:1}}>
                      <div style={{fontSize:13.5,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:2}}>{unikaAnst} {unikaAnst===1?"anställd":"anställda"} · {totTim.toFixed(0)} / {budget} h</div>
                    </div>
                    <div style={{fontSize:14,fontWeight:700,color:farg,fontVariantNumeric:"tabular-nums",flexShrink:0}}>{procent.toFixed(0)}%</div>
                  </div>
                  <div style={{height:8,background:C.bg3,borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(procent, 100)}%`,background:farg,borderRadius:4,transition:"width .3s"}}/>
                  </div>
                  {procent >= 80 && procent < 100 && (
                    <div style={{fontSize:11,color:"#b88a00",marginTop:6,fontWeight:500}}>⚠️ Närmar sig budget</div>
                  )}
                  {procent >= 100 && (
                    <div style={{fontSize:11,color:C.da,marginTop:6,fontWeight:600}}>🔴 Budget överskriden</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Export-modal */}
      {exportOpen && (
        <div onClick={() => setExportOpen(false)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
          <div onClick={e => e.stopPropagation()} style={{background:C.bg,borderTopLeftRadius:18,borderTopRightRadius:18,padding:"22px 20px 24px",maxWidth:430,width:"100%",boxShadow:"0 -10px 40px rgba(0,0,0,.18)"}}>
            <div style={{textAlign:"center",fontSize:11,color:C.mu,letterSpacing:".5px",fontWeight:600,marginBottom:6}}>📊 EXPORTERA RAPPORT</div>
            <div style={{textAlign:"center",fontSize:14,color:C.tx,fontWeight:500,marginBottom:18}}>Välj period och format</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
              <button onClick={() => { alert("Demo: Excel-export skulle genereras med alla anställda, projekt, timmar och övertid för innevarande månad."); setExportOpen(false) }} style={{...btnG,padding:"14px",display:"flex",alignItems:"center",justifyContent:"flex-start",gap:10}}><span style={{fontSize:20}}>📊</span><div style={{textAlign:"left"}}><div style={{fontSize:14,fontWeight:500}}>Excel — Innevarande månad</div><div style={{fontSize:11,color:C.mu,marginTop:2}}>Alla anställda, projekt, timmar, övertid</div></div></button>
              <button onClick={() => { alert("Demo: Excel-export för veckan."); setExportOpen(false) }} style={{...btnG,padding:"14px",display:"flex",alignItems:"center",justifyContent:"flex-start",gap:10}}><span style={{fontSize:20}}>📊</span><div style={{textAlign:"left"}}><div style={{fontSize:14,fontWeight:500}}>Excel — Innevarande vecka</div><div style={{fontSize:11,color:C.mu,marginTop:2}}>Klar för lönehantering</div></div></button>
              <button onClick={() => { alert("Demo: PDF-rapport skulle genereras."); setExportOpen(false) }} style={{...btnG,padding:"14px",display:"flex",alignItems:"center",justifyContent:"flex-start",gap:10}}><span style={{fontSize:20}}>📄</span><div style={{textAlign:"left"}}><div style={{fontSize:14,fontWeight:500}}>PDF — Månadsrapport</div><div style={{fontSize:11,color:C.mu,marginTop:2}}>Översikt per projekt</div></div></button>
            </div>
            <button onClick={() => setExportOpen(false)} style={btnG}>Avbryt</button>
          </div>
        </div>
      )}
    </div>
  )
}

const kpiBtn = {
  background: C.bg2,
  border: `1.5px solid ${C.b}`,
  borderRadius: 12,
  padding: "12px 14px",
  cursor: "pointer",
  fontFamily: "inherit",
  textAlign: "left",
  width: "100%",
}
const vTh = {textAlign:"left",padding:"10px 8px",fontSize:11,fontWeight:600,color:C.mu,letterSpacing:".3px"}
const vTd = {padding:"8px 8px",fontSize:12,color:C.tx,verticalAlign:"middle"}


// ═══════════════════════════════════════════════════════════════════════
// RESPONSIVE INFRASTRUCTURE — Desktop/Tablet TILLÄGG
// • useViewport — detekterar mobile (<768) / tablet (768-1023) / desktop (≥1024)
// • ResponsiveStyles — CSS via <style>-tag för hover, print, sidebar-expand
// • SidebarFor — vertikal nav för foretag på desktop/tablet
// • PlaneringExcel — kraftfull Excel-tabellvy för planering
// MOBIL (< 768px) RÖRS INTE EN ENDA PIXEL.
// ═══════════════════════════════════════════════════════════════════════

// ─── Viewport-hook ─────────────────────────────────────────────────────
function getViewport() {
  if (typeof window === "undefined") return "desktop"
  const w = window.innerWidth
  if (w < 768) return "mobile"
  if (w < 1024) return "tablet"
  return "desktop"
}
function useViewport() {
  const [vp, setVp] = useState(getViewport())
  useEffect(() => {
    const onResize = () => setVp(getViewport())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return vp
}

// ─── Global responsive CSS — injiceras en gång ─────────────────────────
function ResponsiveStyles() {
  return (
    <style>{`
      @media print {
        .rallar-no-print { display: none !important; }
        .rallar-excel-table { font-size: 9px !important; }
        body { background: white !important; }
      }
      @media (min-width: 768px) and (max-width: 1023px) {
        .rallar-sidebar-host { width: 64px !important; }
        .rallar-sidebar-host .rallar-sidebar-label { display: none; }
        .rallar-sidebar-host:hover { width: 260px !important; box-shadow: 4px 0 20px rgba(13,31,53,.12); }
        .rallar-sidebar-host:hover .rallar-sidebar-label { display: inline !important; }
      }
      @media (min-width: 768px) {
        /* Desktop/tablet: tvinga komponenter att utnyttja full bredd */
        .rallar-desktop-content { box-sizing: border-box; width: 100%; }
        .rallar-desktop-content > * { max-width: 100% !important; }
        .rallar-desktop-content h1,
        .rallar-desktop-content h2,
        .rallar-desktop-content h3,
        .rallar-desktop-content p,
        .rallar-desktop-content label,
        .rallar-desktop-content div[class*="font"],
        .rallar-desktop-content button {
          /* Tillåt text att radbrytas naturligt — ingen avkortning */
          white-space: normal !important;
          text-overflow: clip !important;
          overflow: visible !important;
        }
        /* Undantag — element som SKA ha nowrap behåller det */
        .rallar-desktop-content [data-nowrap="true"],
        .rallar-desktop-content .rallar-excel-table th,
        .rallar-desktop-content .rallar-excel-table td,
        .rallar-desktop-content input,
        .rallar-desktop-content select {
          white-space: nowrap !important;
        }
        /* Extra padding på toppnivå-vyer */
        .rallar-desktop-content > div {
          box-sizing: border-box;
        }
        /* Tillåt scroll inom container, blockera overflow på roten */
        .rallar-desktop-content {
          overflow-x: hidden;
          overflow-y: visible;
        }
      }
      .rallar-excel-cell {
        cursor: pointer;
        transition: filter .12s, transform .12s;
      }
      .rallar-excel-cell:hover {
        filter: brightness(0.94);
        transform: scale(1.02);
        z-index: 2;
        position: relative;
      }
      .rallar-day-cell {
        cursor: pointer;
        user-select: none;
        transition: filter .1s;
      }
      .rallar-day-cell:hover {
        filter: brightness(0.93);
      }
      .rallar-day-cell.selected {
        outline: 2px solid #1565c0;
        outline-offset: -2px;
        background: rgba(21,101,192,.12) !important;
      }
      .rallar-sidebar-item:hover {
        background: rgba(21,101,192,.08) !important;
      }
    `}</style>
  )
}

// ─── Sidebar för foretag på desktop/tablet ─────────────────────────────
function SidebarFor({user, screen, navigate, ansokningar, chattOlasta, onLogout}) {
  const items = [
    {id:"hem",          e:"🏠", l:"Hem"},
    {id:"avrop-hub",    e:"📋", l:"Avrop"},
    {id:"org-hub",      e:"👥", l:"Personal"},
    {id:"projekt-hub",  e:"🏗", l:"Projekt"},
    {id:"foretag-hub",  e:"📚", l:"Företag"},
    {id:"meddelanden",  e:"💬", l:"Chatt"},
  ]
  const activeId = aktivNavId(screen, "foretag")
  const nyaAns = (ansokningar || []).filter(a => a.status === "open").length

  return (
    <aside
      className="rallar-sidebar-host rallar-no-print"
      style={{
        width: 260,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d1f35 0%, #1a2f4a 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        flexShrink: 0,
        transition: "width .2s ease",
        overflow: "hidden",
      }}
    >
      {/* Logga / topp */}
      <div style={{padding: "22px 20px 18px", borderBottom: "1px solid rgba(255,255,255,.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:C.ac,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🚄</div>
          <div className="rallar-sidebar-label" style={{flex:1,minWidth:0}}>
            <div style={{fontSize:14,fontWeight:700,letterSpacing:"-.2px"}}>Rallar</div>
            <div style={{fontSize:10.5,color:"rgba(255,255,255,.6)",letterSpacing:".3px"}}>JÄRNVÄGSPLATTFORM</div>
          </div>
        </div>
      </div>

      {/* Användare */}
      <div className="rallar-sidebar-label" style={{padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <IniAvatar name={user.name} size={36}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.6)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.company}</div>
          </div>
        </div>
      </div>

      {/* Nav-items */}
      <nav style={{flex:1,padding:"14px 10px",display:"flex",flexDirection:"column",gap:2}}>
        {items.map(it => {
          const active = activeId === it.id
          let badge = null
          if (it.id === "avrop-hub" && nyaAns > 0) badge = nyaAns
          if (it.id === "meddelanden" && chattOlasta > 0) badge = chattOlasta
          return (
            <button
              key={it.id}
              className="rallar-sidebar-item"
              onClick={() => navigate(it.id)}
              style={{
                display:"flex",
                alignItems:"center",
                gap:14,
                padding:"11px 14px",
                background: active ? "rgba(91,156,246,.18)" : "transparent",
                border:"none",
                borderRadius:10,
                color: active ? "#fff" : "rgba(255,255,255,.78)",
                cursor:"pointer",
                fontFamily:"inherit",
                fontSize:14,
                fontWeight: active ? 600 : 500,
                textAlign:"left",
                position:"relative",
                transition:"background .15s",
              }}
            >
              <span style={{fontSize:18,width:24,textAlign:"center",flexShrink:0}}>{it.e}</span>
              <span className="rallar-sidebar-label" style={{flex:1,letterSpacing:"-.1px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.l}</span>
              {badge != null && (
                <span className="rallar-sidebar-label" style={{
                  background: C.da,
                  color: "#fff",
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: "2px 7px",
                  borderRadius: 10,
                  minWidth: 18,
                  textAlign: "center",
                }}>{badge}</span>
              )}
              {active && <span style={{position:"absolute",left:0,top:8,bottom:8,width:3,background:C.ac,borderRadius:"0 3px 3px 0"}}/>}
            </button>
          )
        })}
      </nav>

      {/* Profil + Logga ut */}
      <div style={{padding:"10px 10px 18px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
        <button
          className="rallar-sidebar-item"
          onClick={() => navigate("profil")}
          style={{
            display:"flex",alignItems:"center",gap:14,padding:"11px 14px",
            background:"transparent",border:"none",borderRadius:10,
            color:"rgba(255,255,255,.78)",cursor:"pointer",fontFamily:"inherit",
            fontSize:14,fontWeight:500,textAlign:"left",width:"100%",
          }}
        >
          <span style={{fontSize:18,width:24,textAlign:"center"}}>👤</span>
          <span className="rallar-sidebar-label">Min profil</span>
        </button>
        {onLogout && (
          <button
            className="rallar-sidebar-item"
            onClick={onLogout}
            style={{
              display:"flex",alignItems:"center",gap:14,padding:"11px 14px",
              background:"transparent",border:"none",borderRadius:10,
              color:"rgba(255,255,255,.6)",cursor:"pointer",fontFamily:"inherit",
              fontSize:13,fontWeight:500,textAlign:"left",width:"100%",
            }}
          >
            <span style={{fontSize:18,width:24,textAlign:"center"}}>↪</span>
            <span className="rallar-sidebar-label">Logga ut</span>
          </button>
        )}
      </div>
    </aside>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// PLANERING DAG-FÖR-DAG — kraftfullare än veckovyn:
// • Varje cell = en dag (inte en vecka)
// • Två-rad header: månader + V-nummer/dag-bokstäver + datum
// • Klick → popup med projekt + typ + datumintervall
// • Drag-select över flera celler
// • Högerklick → context-meny
// • Filter: kategori, projekt, helger, hoppa-till-vecka, Idag
// • Legend med projekt-färger + typ-ikoner
// ═══════════════════════════════════════════════════════════════════════

const PLAN_TYPER = [
  {id:"arbete",  l:"Arbete",   ikon:"🚂", fg:"#0d1f35"},
  {id:"resa",    l:"Restdag",  ikon:"🚗", fg:"#1565c0"},
  {id:"overtid", l:"Övertid",  ikon:"⏰", fg:"#b88a00"},
  {id:"semester",l:"Semester", ikon:"📅", fg:"#15803d"},
  {id:"sjuk",    l:"Sjuk",     ikon:"🤒", fg:"#c62828"},
]
function typForId(id) { return PLAN_TYPER.find(t => t.id === id) || PLAN_TYPER[0] }

const VECKODAG_KORT = ["M","T","O","T","F","L","S"] // ISO: mån=0 i vårt index
const MAN_NAMN = ["JANUARI","FEBRUARI","MARS","APRIL","MAJ","JUNI","JULI","AUGUSTI","SEPTEMBER","OKTOBER","NOVEMBER","DECEMBER"]

// Generera lista av dagar för veckorna i WEEKS
function genereraDagar(weeks, year = 2026) {
  // Vecka 1 startar på första torsdagen i året enligt ISO-8601.
  // Förenkling: räkna utifrån 2026-01-05 (måndag i vecka 2).
  const ref = new Date(year, 0, 5) // 2026-01-05 är måndag, vecka 2
  const dagar = []
  for (const w of weeks) {
    const mandag = new Date(ref)
    mandag.setDate(ref.getDate() + (w - 2) * 7)
    for (let d = 0; d < 7; d++) {
      const dt = new Date(mandag)
      dt.setDate(mandag.getDate() + d)
      const datumStr = `${dt.getFullYear()}-${pad2(dt.getMonth()+1)}-${pad2(dt.getDate())}`
      dagar.push({
        datum: datumStr,
        dag: dt.getDate(),
        manad: dt.getMonth(),
        veckodag: d, // 0=mån, 6=sön
        vecka: w,
        helg: d >= 5,
      })
    }
  }
  return dagar
}

// Gruppera dagar per månad för översta header
function manadsGrupper(dagar) {
  const grupper = []
  let cur = null
  for (const d of dagar) {
    if (!cur || cur.manad !== d.manad) {
      cur = {manad: d.manad, namn: MAN_NAMN[d.manad], antal: 1}
      grupper.push(cur)
    } else { cur.antal++ }
  }
  return grupper
}

// Gruppera dagar per vecka för andra header
function veckoGrupper(dagar) {
  const grupper = []
  let cur = null
  for (const d of dagar) {
    if (!cur || cur.vecka !== d.vecka) {
      cur = {vecka: d.vecka, antal: 1}
      grupper.push(cur)
    } else { cur.antal++ }
  }
  return grupper
}

// Lös upp bokningar — om en bokning bara har vecka (gammalt format) spred ut till mån-fre
function losUppBokningar(bokningar, dagar) {
  const out = []
  for (const b of bokningar) {
    if (b.datum) {
      out.push(b)
    } else if (b.vecka != null) {
      // Gammal vecko-bokning — sprid till mån-fre i den veckan
      const vDagar = dagar.filter(d => d.vecka === b.vecka && d.veckodag < 5)
      for (const d of vDagar) {
        out.push({...b, datum: d.datum, typ: b.typ || "arbete", _expanded:true})
      }
    }
  }
  return out
}

function bokningFor(allaBokningar, anstalldId, datum) {
  return allaBokningar.find(b => b.anstalldId === anstalldId && b.datum === datum)
}

function PlaneringDag({bokningar, onAdd, onRemove, anstallda, projekt, weeks, projectPalette}) {
  const idag = "2026-05-25"
  const [filterKategori, setFilterKategori] = useState(null)
  const [filterProjekt, setFilterProjekt] = useState(null)
  const [visaHelger, setVisaHelger] = useState(false)
  const [hoppaVecka, setHoppaVecka] = useState("")
  const [lokalaAnstallda, setLokalaAnstallda] = useState([])
  const [showLagg, setShowLagg] = useState(false)

  // Drag-state
  const [drag, setDrag] = useState(null) // {anstalldId, datumFrom, datumTill}
  const dragActive = useRef(false)

  // Modal-state
  const [modal, setModal] = useState(null) // {anstalldId, datumFrom, datumTill, befintliga?}

  // Context-meny
  const [ctxMeny, setCtxMeny] = useState(null) // {x, y, anstalldId, datum, bokning}

  // Refs för scroll till idag
  const tabellRef = useRef(null)
  const idagCellRef = useRef(null)

  const allaAnstallda = [...anstallda, ...lokalaAnstallda]
  const grupper = gruppPerKategori(allaAnstallda)
  const synligaGrupper = filterKategori ? grupper.filter(g => g.kategori === filterKategori) : grupper
  const allaKategorier = [...new Set(allaAnstallda.map(a => a.roll))].sort()

  const alaDagar = genereraDagar(weeks)
  const dagar = visaHelger ? alaDagar : alaDagar.filter(d => !d.helg)
  const expanderadeBokningar = losUppBokningar(bokningar || [], alaDagar)

  const colorFor = p => projectPalette[p.color % projectPalette.length]
  const projForId = id => projekt.find(p => p.id === id)
  const filtreratPerProjekt = filterProjekt
    ? new Set(expanderadeBokningar.filter(b => b.projektId === filterProjekt).map(b => `${b.anstalldId}|${b.datum}`))
    : null

  // ─── INTERAKTIONER ───────────────────────────────────────────────────
  function cellMouseDown(e, anstalldId, datum) {
    if (e.button !== 0) return // bara vänster-klick
    dragActive.current = true
    setDrag({anstalldId, datumFrom: datum, datumTill: datum})
  }
  function cellMouseEnter(anstalldId, datum) {
    if (!dragActive.current || !drag || drag.anstalldId !== anstalldId) return
    setDrag(d => ({...d, datumTill: datum}))
  }
  function cellMouseUp(e, anstalldId, datum) {
    if (!drag) return
    dragActive.current = false
    const [from, till] = [drag.datumFrom, drag.datumTill].sort()
    setModal({anstalldId, datumFrom: from, datumTill: till})
    setDrag(null)
  }
  function cellHogerklick(e, anstalldId, datum) {
    e.preventDefault()
    const bok = bokningFor(expanderadeBokningar, anstalldId, datum)
    if (bok) {
      setCtxMeny({x: e.clientX, y: e.clientY, anstalldId, datum, bokning: bok})
    }
  }

  // Stäng context-meny vid klick utanför
  useEffect(() => {
    if (!ctxMeny) return
    const close = () => setCtxMeny(null)
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [ctxMeny])

  // ─── HANDLERS ────────────────────────────────────────────────────────
  function sparaBokningar({projektId, typ, datumFrom, datumTill, anstalldId}) {
    if (!projektId) return
    // Generera datum-array
    const from = new Date(datumFrom)
    const till = new Date(datumTill)
    const datums = []
    for (let d = new Date(from); d <= till; d.setDate(d.getDate() + 1)) {
      const ds = `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`
      datums.push(ds)
    }
    // Ta bort befintliga bokningar för dessa datum (inkl. expanderade vecko-bokningar)
    for (const ds of datums) {
      const bef = bokningFor(expanderadeBokningar, anstalldId, ds)
      if (bef && bef.id && !bef._expanded && onRemove) onRemove(bef.id)
    }
    // Lägg till nya per dag
    for (const ds of datums) {
      if (onAdd) onAdd({anstalldId, projektId, datum: ds, typ})
    }
    setModal(null)
  }
  function taBortDag(bokning) {
    if (!bokning || !bokning.id) return
    if (bokning._expanded) {
      // Detta är en expanderad vecko-bokning — vi kan inte ta bort enskild dag utan att modifiera ursprungsbokningen
      // För enkelhet: ta bort hela vecko-bokningen
      if (onRemove) onRemove(bokning.id)
    } else {
      if (onRemove) onRemove(bokning.id)
    }
    setCtxMeny(null)
  }
  function taBortHelaPeriod(bokning) {
    // Ta bort alla angränsande bokningar med samma projektId+typ
    if (!bokning) return
    const sortDatum = expanderadeBokningar
      .filter(b => b.anstalldId === bokning.anstalldId && b.projektId === bokning.projektId && b.typ === bokning.typ)
      .map(b => b.datum)
      .sort()
    // Hitta sammanhängande grupp som innehåller bokning.datum
    // Förenkling: ta bort alla matchande
    const ids = expanderadeBokningar
      .filter(b => b.anstalldId === bokning.anstalldId && b.projektId === bokning.projektId && b.typ === bokning.typ && !b._expanded)
      .map(b => b.id)
    for (const id of ids) if (onRemove) onRemove(id)
    setCtxMeny(null)
  }
  function laggAnstalld(namn, roll) {
    if (!namn || !roll) return
    setLokalaAnstallda(prev => [...prev, {id: `u_local_${Date.now()}`, name: namn, roll}])
    setShowLagg(false)
  }
  function scrollaIdag() {
    if (idagCellRef.current && tabellRef.current) {
      const cell = idagCellRef.current
      tabellRef.current.scrollLeft = cell.offsetLeft - 240
    }
  }
  function gaTillVecka(w) {
    const n = Number(w)
    if (!n || !tabellRef.current) return
    // Hitta första cellen i den veckan
    const headerCell = tabellRef.current.querySelector(`[data-week="${n}"]`)
    if (headerCell) tabellRef.current.scrollLeft = headerCell.offsetLeft - 80
  }

  // ─── DAG-CELL-RENDERING ─────────────────────────────────────────────
  function cellInnehall(anstalldId, datum) {
    const bok = bokningFor(expanderadeBokningar, anstalldId, datum)
    if (!bok) return null
    const p = projForId(bok.projektId)
    if (!p) return null
    const c = colorFor(p)
    const t = typForId(bok.typ)
    const isFilter = filtreratPerProjekt && !filtreratPerProjekt.has(`${anstalldId}|${datum}`)
    return {p, c, t, isFilter}
  }

  // ─── DRAG-SELECTION-HÄLPARE ─────────────────────────────────────────
  function isInDragRange(anstalldId, datum) {
    if (!drag || drag.anstalldId !== anstalldId) return false
    const [from, till] = [drag.datumFrom, drag.datumTill].sort()
    return datum >= from && datum <= till
  }

  // ─── EXPORT ─────────────────────────────────────────────────────────
  function exporteraExcel() {
    alert("Demo: Exporterar dag-för-dag-planeringen i Excel-format — varje dag som egen kolumn, anställda i rader, färgkodade bokningar med typ-ikoner.")
  }
  function printa() { if (typeof window !== "undefined") window.print() }

  const idagDag = dagar.find(d => d.datum === idag)

  return (
    <div style={{padding:"22px 28px 40px"}}>
      <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:14,marginBottom:16,flexWrap:"wrap"}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:600,letterSpacing:"-.4px",marginBottom:4}}>📅 Planering — dag för dag</h1>
          <div style={{fontSize:13,color:C.mu}}>{allaAnstallda.length} anställda · {projekt.length} projekt · {dagar.length} dagar (V{weeks[0]}–V{weeks[weeks.length-1]})</div>
        </div>
        <div className="rallar-no-print" style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={scrollaIdag} style={knapp1}>📍 Idag</button>
          <button onClick={exporteraExcel} style={knapp1}>📊 Exportera Excel</button>
          <button onClick={printa} style={knapp1}>🖨 Skriv ut</button>
        </div>
      </div>

      {/* LEGEND */}
      <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".4px",color:C.mu,marginBottom:8,textTransform:"uppercase"}}>Projekt-färger</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
          {projekt.map(p => {
            const c = colorFor(p)
            return (
              <span key={p.id} style={{display:"inline-flex",alignItems:"center",gap:8,background:c.bg,border:`1px solid ${c.border}`,borderRadius:8,padding:"4px 10px",fontSize:12,color:c.text,fontWeight:500}}>
                <span style={{width:10,height:10,borderRadius:3,background:c.border}}/>
                <strong style={{fontWeight:700}}>{shortProj(p.namn)}</strong>
                <span style={{opacity:.85}}>{p.namn}</span>
              </span>
            )
          })}
        </div>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".4px",color:C.mu,marginBottom:8,textTransform:"uppercase"}}>Typer</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {PLAN_TYPER.map(t => (
            <span key={t.id} style={{display:"inline-flex",alignItems:"center",gap:6,background:"#fff",border:`1px solid ${C.b}`,borderRadius:8,padding:"4px 10px",fontSize:12,color:t.fg,fontWeight:500}}>
              <span style={{fontSize:14}}>{t.ikon}</span> {t.l}
            </span>
          ))}
        </div>
      </div>

      {/* FILTER */}
      <div className="rallar-no-print" style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,alignItems:"center",padding:"12px 14px",background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:".4px",color:C.mu}}>KATEGORI:</span>
        <button onClick={() => setFilterKategori(null)} style={tagg(!filterKategori)}>Alla ({allaAnstallda.length})</button>
        {allaKategorier.map(k => {
          const sel = filterKategori === k
          const c = allaAnstallda.filter(a => a.roll === k).length
          return <button key={k} onClick={() => setFilterKategori(sel ? null : k)} style={tagg(sel)}>{k} ({c})</button>
        })}

        <span style={{fontSize:11,fontWeight:700,letterSpacing:".4px",color:C.mu,marginLeft:8}}>PROJEKT:</span>
        <select value={filterProjekt || ""} onChange={e => setFilterProjekt(e.target.value || null)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${C.b}`,background:C.bg,fontFamily:"inherit",fontSize:12,color:C.tx,minWidth:160}}>
          <option value="">Alla projekt</option>
          {projekt.map(p => <option key={p.id} value={p.id}>{p.namn}</option>)}
        </select>

        <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.tx,cursor:"pointer",marginLeft:8}}>
          <input type="checkbox" checked={visaHelger} onChange={e => setVisaHelger(e.target.checked)}/>
          Visa helger
        </label>

        <span style={{fontSize:11,fontWeight:700,letterSpacing:".4px",color:C.mu,marginLeft:8}}>HOPPA TILL VECKA:</span>
        <input type="number" min={weeks[0]} max={weeks[weeks.length-1]} value={hoppaVecka} onChange={e => setHoppaVecka(e.target.value)} onBlur={e => gaTillVecka(e.target.value)} onKeyDown={e => e.key === "Enter" && gaTillVecka(e.target.value)} placeholder="V" style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${C.b}`,background:C.bg,fontFamily:"inherit",fontSize:12,width:60,color:C.tx}}/>
      </div>

      {/* TABELL */}
      <div ref={tabellRef} style={{border:`1px solid ${C.b}`,borderRadius:10,overflow:"auto",maxHeight:"calc(100vh - 360px)",background:"#fff"}}>
        <table className="rallar-excel-table" style={{borderCollapse:"separate",borderSpacing:0,fontSize:11,width:"max-content"}}>
          <thead>
            {/* RAD 1: månadsspans */}
            <tr>
              <th colSpan={4} style={{...frozenHdr,top:0,left:0,zIndex:6,background:C.bg3,minWidth:540,height:28}}>&nbsp;</th>
              {manadsGrupper(dagar).map((m, i) => (
                <th key={i} colSpan={m.antal} style={{position:"sticky",top:0,zIndex:3,background:"#0d1f35",color:"#fff",padding:"6px",fontSize:11,fontWeight:700,letterSpacing:".5px",borderRight:"1px solid rgba(255,255,255,.15)",borderBottom:`1px solid ${C.b}`,textAlign:"center"}}>{m.namn}</th>
              ))}
            </tr>
            {/* RAD 2: vecko-grupper */}
            <tr>
              <th style={{...frozenHdr,top:28,left:0,zIndex:5,minWidth:110,background:C.bg3}}>Kategori</th>
              <th style={{...frozenHdr,top:28,left:110,zIndex:5,minWidth:150,background:C.bg3}}>Namn</th>
              <th style={{...frozenHdr,top:28,left:260,zIndex:5,minWidth:140,background:C.bg3}}>Roll</th>
              <th style={{...frozenHdr,top:28,left:400,zIndex:5,minWidth:140,background:C.bg3,borderRight:`2px solid ${C.ac}`}}>Telefon</th>
              {veckoGrupper(dagar).map((v, i) => (
                <th key={i} colSpan={v.antal} data-week={v.vecka} style={{position:"sticky",top:28,zIndex:3,background:C.bg2,padding:"4px",fontSize:10.5,fontWeight:600,color:C.tx,borderRight:`1px solid ${C.b2}`,borderBottom:`1px solid ${C.b}`,textAlign:"center",letterSpacing:".3px"}}>V{v.vecka}</th>
              ))}
            </tr>
            {/* RAD 3: dag-bokstäver + datum */}
            <tr>
              <th colSpan={4} style={{...frozenHdr,top:56,left:0,zIndex:5,background:C.bg2,borderBottom:`2px solid ${C.ac}`,borderRight:`2px solid ${C.ac}`}}>&nbsp;</th>
              {dagar.map((d, i) => {
                const idagFlagga = d.datum === idag
                return (
                  <th key={i} style={{
                    position:"sticky",top:56,zIndex:3,
                    background: idagFlagga ? "rgba(21,101,192,.18)" : d.helg ? C.bg3 : C.bg2,
                    padding:"3px 1px",
                    fontSize:9.5,
                    fontWeight: idagFlagga ? 700 : 600,
                    color: idagFlagga ? C.ac : (d.helg ? C.mu : C.tx),
                    borderBottom:`2px solid ${idagFlagga ? C.ac : C.ac}`,
                    borderLeft: d.veckodag === 0 ? `1px solid ${C.b2}` : "none",
                    textAlign:"center",
                    minWidth:24,
                    maxWidth:24,
                  }}>
                    <div>{VECKODAG_KORT[d.veckodag]}</div>
                    <div style={{fontSize:9,fontWeight:500,marginTop:1,opacity:.85}}>{d.dag}</div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {synligaGrupper.map(grupp => (
              <React.Fragment key={grupp.kategori}>
                {/* MÖRKBLÅ KATEGORI-RUBRIKRAD */}
                <tr>
                  <td colSpan={4 + dagar.length} style={{background:"#1a2f4a",color:"#fff",padding:"7px 14px",fontSize:11.5,fontWeight:700,letterSpacing:".5px",textTransform:"uppercase",position:"sticky",left:0,borderBottom:`1px solid ${C.b}`}}>{grupp.kategori} <span style={{fontWeight:500,opacity:.7,marginLeft:8}}>({grupp.lista.length})</span></td>
                </tr>
                {grupp.lista.map((a, idx) => {
                  const rowBg = idx % 2 === 0 ? "#fff" : "#fafbfd"
                  return (
                    <tr key={a.id}>
                      <td style={{...frozenCol,left:0,background:rowBg,fontSize:10,color:C.mu,fontWeight:500}}>{grupp.kategori}</td>
                      <td style={{...frozenCol,left:110,background:rowBg,fontWeight:500,color:C.tx,fontSize:11.5}}>{a.name}</td>
                      <td style={{...frozenCol,left:260,background:rowBg,fontSize:10.5,color:C.mu}}>{a.roll}</td>
                      <td style={{...frozenCol,left:400,background:rowBg,fontSize:10,color:C.mu,fontFamily:"monospace",borderRight:`2px solid ${C.ac}`}}>{telFor(a.id)}</td>
                      {dagar.map((d, i) => {
                        const innehall = cellInnehall(a.id, d.datum)
                        const inDrag = isInDragRange(a.id, d.datum)
                        const idagFlagga = d.datum === idag
                        const ref_ = idagFlagga && idx === 0 ? idagCellRef : null

                        let bg = rowBg
                        let fg = C.mu
                        let visning = ""
                        let ikon = ""
                        let dimmad = false

                        if (innehall) {
                          bg = innehall.c.bg
                          fg = innehall.c.text
                          visning = shortProj(innehall.p.namn)
                          ikon = innehall.t.ikon
                          dimmad = innehall.isFilter
                        }
                        if (d.helg && !innehall) bg = "#f5f7fa"
                        if (idagFlagga && !innehall) bg = "rgba(21,101,192,.06)"

                        return (
                          <td
                            key={i}
                            ref={ref_}
                            className={`rallar-day-cell ${inDrag ? "selected" : ""}`}
                            onMouseDown={(e) => cellMouseDown(e, a.id, d.datum)}
                            onMouseEnter={() => cellMouseEnter(a.id, d.datum)}
                            onMouseUp={(e) => cellMouseUp(e, a.id, d.datum)}
                            onContextMenu={(e) => cellHogerklick(e, a.id, d.datum)}
                            title={innehall ? `${innehall.p.namn} (${innehall.t.l}) — högerklicka för meny` : `${d.datum} — klick eller drag för att boka`}
                            style={{
                              background: dimmad ? "#fff" : bg,
                              color: fg,
                              padding:"2px 1px",
                              fontSize:9,
                              fontWeight: innehall ? 600 : 400,
                              textAlign:"center",
                              borderRight:`1px solid ${C.bg3}`,
                              borderBottom:`1px solid ${C.bg3}`,
                              borderLeft: d.veckodag === 0 ? `1px solid ${C.b2}` : "none",
                              minWidth:24,
                              maxWidth:24,
                              height:32,
                              opacity: dimmad ? 0.35 : 1,
                              boxShadow: idagFlagga && idx === 0 ? "inset 2px 0 0 " + C.ac : undefined,
                            }}
                          >
                            {innehall && (
                              <>
                                <div style={{fontSize:8.5,lineHeight:1.1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{visning}</div>
                                <div style={{fontSize:10,lineHeight:1}}>{ikon}</div>
                              </>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan={4 + dagar.length} style={{padding:0,background:"#fff",borderTop:`1px solid ${C.b}`}}>
                <button className="rallar-no-print" onClick={() => setShowLagg(true)} style={{width:"100%",padding:"12px 16px",border:"none",background:C.bg2,color:C.ac,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,textAlign:"left",borderTop:`1px dashed ${C.b}`,position:"sticky",left:0}}>+ Lägg till anställd</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Info-bricka */}
      <div className="rallar-no-print" style={{marginTop:10,fontSize:11,color:C.mu,display:"flex",gap:14,flexWrap:"wrap"}}>
        <span>💡 <strong style={{color:C.tx,fontWeight:600}}>Klicka</strong> en dag-cell för att boka</span>
        <span>💡 <strong style={{color:C.tx,fontWeight:600}}>Klicka och dra</strong> över flera dagar för perioder</span>
        <span>💡 <strong style={{color:C.tx,fontWeight:600}}>Högerklick</strong> på bokad cell för meny</span>
      </div>

      {/* BOKA-MODAL */}
      {modal && (
        <BokaModal
          modal={modal}
          projekt={projekt}
          projectPalette={projectPalette}
          anstallda={allaAnstallda}
          existeradeBokningar={expanderadeBokningar}
          onSpara={sparaBokningar}
          onClose={() => setModal(null)}
        />
      )}

      {/* CONTEXT-MENY */}
      {ctxMeny && (
        <div style={{position:"fixed",top:ctxMeny.y,left:ctxMeny.x,background:"#fff",border:`1px solid ${C.b}`,borderRadius:10,boxShadow:"0 8px 32px rgba(13,31,53,.18)",zIndex:200,minWidth:220,padding:6,fontSize:13}}>
          <button onClick={() => { setModal({anstalldId: ctxMeny.anstalldId, datumFrom: ctxMeny.datum, datumTill: ctxMeny.datum, befintlig: ctxMeny.bokning}); setCtxMeny(null) }} style={ctxBtn}>✏️ Redigera</button>
          <button onClick={() => taBortDag(ctxMeny.bokning)} style={ctxBtn}>🗑 Ta bort denna dag</button>
          <button onClick={() => taBortHelaPeriod(ctxMeny.bokning)} style={ctxBtn}>🗑 Ta bort hela perioden</button>
          <button onClick={() => { alert("Demo: Kopiera bokningen till annan person — välj från lista (ej implementerad i denna demo)"); setCtxMeny(null) }} style={ctxBtn}>📋 Kopiera till annan person</button>
        </div>
      )}

      {/* LÄGG-TILL-ANSTÄLLD-MODAL */}
      {showLagg && <LaggTillAnstalldModal allaKategorier={allaKategorier} onSave={laggAnstalld} onClose={() => setShowLagg(false)}/>}
    </div>
  )
}

// — BokaModal — välj projekt + typ + intervall —
function BokaModal({modal, projekt, projectPalette, anstallda, existeradeBokningar, onSpara, onClose}) {
  const [valdProjekt, setValdProjekt] = useState(modal.befintlig?.projektId || projekt[0]?.id || "")
  const [valdTyp, setValdTyp] = useState(modal.befintlig?.typ || "arbete")
  const [from, setFrom] = useState(modal.datumFrom)
  const [till, setTill] = useState(modal.datumTill)
  const anst = anstallda.find(a => a.id === modal.anstalldId)
  const colorFor = p => projectPalette[p.color % projectPalette.length]

  // Räkna antal dagar
  const fromD = new Date(from); const tillD = new Date(till)
  const dagar = Math.max(1, Math.round((tillD - fromD) / 86400000) + 1)
  const flera = dagar > 1

  function spara() {
    onSpara({projektId: valdProjekt, typ: valdTyp, datumFrom: from, datumTill: till, anstalldId: modal.anstalldId})
  }

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:150}}>
      <div onClick={e => e.stopPropagation()} style={{background:"#fff",borderRadius:14,padding:"22px 24px",maxWidth:480,width:"94%",maxHeight:"86vh",overflowY:"auto",boxShadow:"0 16px 50px rgba(0,0,0,.22)"}}>
        <div style={{fontSize:11,color:C.mu,letterSpacing:".4px",fontWeight:700,marginBottom:4}}>
          {modal.befintlig ? "REDIGERA BOKNING" : "NY BOKNING"}
        </div>
        <div style={{fontSize:17,fontWeight:600,marginBottom:4,letterSpacing:"-.2px"}}>{anst?.name || "Anställd"}</div>
        <div style={{fontSize:12.5,color:C.mu,marginBottom:18}}>{anst?.roll} · {dagar} dag{dagar === 1 ? "" : "ar"}</div>

        <label style={lbl}>Projekt</label>
        <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:220,overflowY:"auto",marginBottom:14}}>
          {projekt.map(p => {
            const c = colorFor(p)
            const sel = valdProjekt === p.id
            return (
              <button key={p.id} onClick={() => setValdProjekt(p.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:sel?c.bg:C.bg2,border:`1.5px solid ${sel?c.border:C.b}`,borderRadius:8,cursor:"pointer",fontFamily:"inherit",textAlign:"left",fontSize:13}}>
                <span style={{width:12,height:12,borderRadius:3,background:c.border,flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,color:sel?c.text:C.tx}}>{p.namn}</div>
                  <div style={{fontSize:11,color:C.mu,marginTop:1}}>{p.plats}</div>
                </div>
                {sel && <span style={{fontSize:14,color:c.text,fontWeight:700}}>✓</span>}
              </button>
            )
          })}
        </div>

        <label style={lbl}>Typ</label>
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {PLAN_TYPER.map(t => {
            const sel = valdTyp === t.id
            return (
              <button key={t.id} onClick={() => setValdTyp(t.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:sel?"rgba(21,101,192,.1)":C.bg2,border:`1.5px solid ${sel?C.ac:C.b}`,borderRadius:8,cursor:"pointer",fontFamily:"inherit",fontSize:12.5,fontWeight:sel?600:500,color:sel?C.ac:C.tx}}>
                <span style={{fontSize:14}}>{t.ikon}</span> {t.l}
              </button>
            )
          })}
        </div>

        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <div style={{flex:1}}>
            <label style={lbl}>Från-datum</label>
            <input type="date" style={inp} value={from} onChange={e => setFrom(e.target.value)}/>
          </div>
          <div style={{flex:1}}>
            <label style={lbl}>Till-datum</label>
            <input type="date" style={inp} value={till} onChange={e => setTill(e.target.value)}/>
          </div>
        </div>

        {flera && (
          <div style={{padding:"10px 12px",background:"rgba(21,101,192,.08)",border:"1px solid rgba(21,101,192,.25)",borderRadius:8,fontSize:12,color:C.ac,marginBottom:14,lineHeight:1.5}}>
            📅 Sparar bokning på <strong style={{fontWeight:700}}>{dagar} dagar</strong> — {from} → {till}
          </div>
        )}

        <div style={{display:"flex",gap:8}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={spara} style={{...btnP,flex:1.4}}>{flera ? `Spara ${dagar} dagar` : "Spara dagen"}</button>
        </div>
      </div>
    </div>
  )
}

const knapp1 = {
  padding:"9px 14px",borderRadius:8,border:`1px solid ${C.b}`,
  background:C.bg,color:C.tx,cursor:"pointer",fontFamily:"inherit",
  fontSize:13,fontWeight:500,display:"inline-flex",alignItems:"center",gap:6,
}
function tagg(sel) {
  return {
    padding:"5px 11px",borderRadius:14,
    border:`1px solid ${sel?C.ac:C.b}`,
    background:sel?"rgba(21,101,192,.1)":C.bg,
    color:sel?C.ac:C.mu,
    cursor:"pointer",fontFamily:"inherit",
    fontSize:12,fontWeight:sel?600:500,
  }
}
const ctxBtn = {
  display:"block",width:"100%",padding:"9px 12px",border:"none",background:"none",
  textAlign:"left",cursor:"pointer",fontFamily:"inherit",fontSize:13,color:C.tx,
  borderRadius:6,
}


// ─────────────────────────────────────────────────────────────────────────
// PLANERING EXCEL — kraftfull tabellvy för desktop/tablet
// ─────────────────────────────────────────────────────────────────────────

// Hjälpare för Excel-vyn
function emailFor(name) {
  return name
    .toLowerCase()
    .replace(/å/g, "a").replace(/ä/g, "a").replace(/ö/g, "o")
    .replace(/\s+/g, ".") + "@nordrail.se"
}
function telFor(id) {
  // Deterministisk demo-telefon från id
  const n = id.replace(/\D/g, "")
  return `070-${(123 + Number(n) * 7) % 1000}${pad2((Number(n) * 13) % 100)} ${pad2((Number(n) * 21) % 100)}`
}

// Förkortat projektnamn — första 2-3 bokstäver per ord
function shortProj(name) {
  if (!name) return ""
  const parts = name.split(/\s+/)
  if (parts.length === 1) return name.slice(0, 4)
  return parts.map(p => p.slice(0, 2)).join("").slice(0, 5)
}

// Vilken månad börjar en vecka i? Returnerar månadsnamn (svensk).
const MONTHS_SV = ["JAN","FEB","MAR","APR","MAJ","JUNI","JULI","AUG","SEP","OKT","NOV","DEC"]
function monthForWeek(week, year = 2026) {
  // Approximation: vecka 1 börjar 2026-01-05, så vecka N börjar ca den dagen + (N-1)*7
  const d = new Date(year, 0, 5)  // 2026-01-05 (måndag i vecka 2 ungefär)
  d.setDate(d.getDate() + (week - 2) * 7)
  return MONTHS_SV[d.getMonth()]
}

// Gruppera veckor per månad så vi kan rita månads-spans
function monthSpans(weeks) {
  const spans = []
  let current = null
  for (const w of weeks) {
    const m = monthForWeek(w)
    if (!current || current.month !== m) {
      current = {month: m, weeks: [w]}
      spans.push(current)
    } else {
      current.weeks.push(w)
    }
  }
  return spans
}

// Gruppera anställda per kategori (roll)
function gruppPerKategori(anstallda) {
  const map = new Map()
  for (const a of anstallda) {
    const k = a.roll || "Övriga"
    if (!map.has(k)) map.set(k, [])
    map.get(k).push(a)
  }
  return Array.from(map.entries()).map(([kategori, lista]) => ({kategori, lista}))
}

function PlaneringExcel({bokningar, onAdd, onRemove, anstallda, projekt, weeks, projectPalette}) {
  const [filterKategori, setFilterKategori] = useState(null)
  const [redigeraCell, setRedigeraCell] = useState(null) // {anstalldId, vecka, befintlig}
  const [lokalaAnstallda, setLokalaAnstallda] = useState([]) // tillagda i tabellen
  const [showLagg, setShowLagg] = useState(false)

  const allaAnstallda = [...anstallda, ...lokalaAnstallda]
  const grupper = gruppPerKategori(allaAnstallda)
  const synligaGrupper = filterKategori
    ? grupper.filter(g => g.kategori === filterKategori)
    : grupper

  const spans = monthSpans(weeks)
  const colorFor = p => projectPalette[p.color % projectPalette.length]
  const projForId = id => projekt.find(p => p.id === id)
  const bokningFor = (aid, w) => bokningar.find(b => b.anstalldId === aid && b.vecka === w)

  function cellKlick(anstalldId, vecka) {
    const bef = bokningFor(anstalldId, vecka)
    setRedigeraCell({anstalldId, vecka, befintlig: bef})
  }
  function cellDubbel(anstalldId, vecka) {
    const bef = bokningFor(anstalldId, vecka)
    if (bef && onRemove) onRemove(bef.id)
  }
  function sparaCell(projektId) {
    if (!redigeraCell) return
    const {anstalldId, vecka, befintlig} = redigeraCell
    if (befintlig && onRemove) onRemove(befintlig.id)
    if (projektId && onAdd) onAdd({anstalldId, projektId, vecka})
    setRedigeraCell(null)
  }
  function laggAnstalld(namn, roll) {
    if (!namn || !roll) return
    const newId = `u_local_${Date.now()}`
    setLokalaAnstallda(prev => [...prev, {id: newId, name: namn, roll}])
    setShowLagg(false)
  }

  // Använda projekt (de som har minst en bokning) för legend
  const anvandaProj = [...new Set(bokningar.map(b => b.projektId))].map(projForId).filter(Boolean)
  const visadeProj = anvandaProj.length > 0 ? anvandaProj : projekt.slice(0, 8)
  const allaKategorier = [...new Set(allaAnstallda.map(a => a.roll))].sort()

  function printa() {
    if (typeof window !== "undefined") window.print()
  }
  function exporteraExcel() {
    // Demo — skulle generera CSV/XLSX
    alert("Demo: Exporterar planeringen i Excel-format med exakt samma layout — anställda i rader, veckor i kolumner, färgkodade bokningar.")
  }

  return (
    <div style={{padding:"22px 28px 40px"}}>
      <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:14,marginBottom:18}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:600,letterSpacing:"-.4px",marginBottom:4}}>📅 Planeringsvy</h1>
          <div style={{fontSize:13,color:C.mu}}>{allaAnstallda.length} anställda · {projekt.length} projekt · V{weeks[0]}–V{weeks[weeks.length-1]}</div>
        </div>
        <div className="rallar-no-print" style={{display:"flex",gap:8}}>
          <button onClick={exporteraExcel} style={{padding:"9px 14px",borderRadius:8,border:`1px solid ${C.b}`,background:C.bg,color:C.tx,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:6}}>📊 Exportera Excel</button>
          <button onClick={printa} style={{padding:"9px 14px",borderRadius:8,border:`1px solid ${C.b}`,background:C.bg,color:C.tx,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:6}}>🖨 Skriv ut</button>
        </div>
      </div>

      {/* FÄRGLEGEND */}
      <div style={{background:C.bg2,border:`1px solid ${C.b}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".4px",color:C.mu,marginBottom:8,textTransform:"uppercase"}}>Färgkodning per projekt</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {visadeProj.map(p => {
            const c = colorFor(p)
            return (
              <span key={p.id} style={{
                display:"inline-flex",alignItems:"center",gap:8,
                background:c.bg,border:`1px solid ${c.border}`,
                borderRadius:8,padding:"4px 10px",
                fontSize:12,color:c.text,fontWeight:500,
              }}>
                <span style={{width:10,height:10,borderRadius:3,background:c.border}}/>
                <strong style={{fontWeight:700}}>{shortProj(p.namn)}</strong> · {p.namn}
              </span>
            )
          })}
        </div>
      </div>

      {/* FILTER */}
      <div className="rallar-no-print" style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14,alignItems:"center"}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:".4px",color:C.mu,marginRight:4}}>FILTER:</span>
        <button
          onClick={() => setFilterKategori(null)}
          style={{padding:"5px 11px",borderRadius:14,border:`1px solid ${!filterKategori?C.ac:C.b}`,background:!filterKategori?"rgba(21,101,192,.1)":C.bg,color:!filterKategori?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:!filterKategori?600:500}}
        >Alla ({allaAnstallda.length})</button>
        {allaKategorier.map(k => {
          const sel = filterKategori === k
          const count = allaAnstallda.filter(a => a.roll === k).length
          return (
            <button
              key={k}
              onClick={() => setFilterKategori(sel ? null : k)}
              style={{padding:"5px 11px",borderRadius:14,border:`1px solid ${sel?C.ac:C.b}`,background:sel?"rgba(21,101,192,.1)":C.bg,color:sel?C.ac:C.mu,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:sel?600:500}}
            >{k} ({count})</button>
          )
        })}
      </div>

      {/* HUVUDTABELL */}
      <div style={{
        border:`1px solid ${C.b}`,
        borderRadius:10,
        overflow:"auto",
        maxHeight:"calc(100vh - 280px)",
        background:"#fff",
      }}>
        <table className="rallar-excel-table" style={{borderCollapse:"separate",borderSpacing:0,fontSize:11.5,width:"max-content",minWidth:"100%"}}>
          <thead>
            {/* RAD 1: månadsspans */}
            <tr>
              <th colSpan={4} style={{...frozenHdr,top:0,zIndex:5,background:C.bg3,borderBottom:`1px solid ${C.b}`,height:32}}>&nbsp;</th>
              {spans.map((s, i) => (
                <th key={i} colSpan={s.weeks.length * 5} style={{
                  position:"sticky",top:0,zIndex:3,
                  background:"#0d1f35",color:"#fff",
                  padding:"8px 6px",fontSize:11,fontWeight:700,letterSpacing:".5px",
                  borderRight:i < spans.length-1 ? "1px solid rgba(255,255,255,.15)" : "none",
                  borderBottom:`1px solid ${C.b}`,
                  textAlign:"center",
                }}>{s.month}</th>
              ))}
            </tr>
            {/* RAD 2: kolumnetiketter + veckonummer */}
            <tr>
              <th style={{...frozenHdr,top:32,left:0,zIndex:5,minWidth:120,background:C.bg3}}>Kategori</th>
              <th style={{...frozenHdr,top:32,left:120,zIndex:5,minWidth:140,background:C.bg3}}>Namn</th>
              <th style={{...frozenHdr,top:32,left:260,zIndex:5,minWidth:180,background:C.bg3}}>Email</th>
              <th style={{...frozenHdr,top:32,left:440,zIndex:5,minWidth:120,background:C.bg3,borderRight:`2px solid ${C.ac}`}}>Telefon</th>
              {weeks.map(w => (
                <th key={w} colSpan={5} style={{
                  position:"sticky",top:32,zIndex:3,
                  background:C.bg3,
                  padding:"6px 4px",fontSize:11,fontWeight:600,color:C.tx,
                  borderRight:`1px solid ${C.b2}`,
                  borderBottom:`1px solid ${C.b}`,
                  textAlign:"center",
                  letterSpacing:".3px",
                }}>V{w}</th>
              ))}
            </tr>
            {/* RAD 3: M T O T F */}
            <tr>
              <th colSpan={4} style={{...frozenHdr,top:64,zIndex:5,background:C.bg2,borderBottom:`2px solid ${C.ac}`,borderRight:`2px solid ${C.ac}`}}>&nbsp;</th>
              {weeks.map(w => ["M","T","O","T","F"].map((d, i) => (
                <th key={`${w}-${i}`} style={{
                  position:"sticky",top:64,zIndex:3,
                  background:C.bg2,
                  padding:"4px 2px",fontSize:9.5,fontWeight:600,color:C.mu,
                  borderRight: i === 4 ? `1px solid ${C.b2}` : "none",
                  borderBottom:`2px solid ${C.ac}`,
                  textAlign:"center",
                  minWidth:20,
                }}>{d}</th>
              )))}
            </tr>
          </thead>
          <tbody>
            {synligaGrupper.map(grupp => (
              <React.Fragment key={grupp.kategori}>
                {/* MÖRKBLÅ KATEGORI-RUBRIKRAD */}
                <tr>
                  <td colSpan={4 + weeks.length * 5} style={{
                    background:"#1a2f4a",
                    color:"#fff",
                    padding:"8px 14px",
                    fontSize:11.5,
                    fontWeight:700,
                    letterSpacing:".5px",
                    textTransform:"uppercase",
                    position:"sticky",left:0,
                    borderBottom:`1px solid ${C.b}`,
                  }}>{grupp.kategori} <span style={{fontWeight:500,opacity:.7,marginLeft:8}}>({grupp.lista.length})</span></td>
                </tr>
                {/* ANSTÄLLDRADER */}
                {grupp.lista.map((a, idx) => {
                  const rowBg = idx % 2 === 0 ? "#fff" : "#fafbfd"
                  return (
                    <tr key={a.id}>
                      <td style={{...frozenCol,left:0,background:rowBg,fontSize:10.5,color:C.mu,fontWeight:500}}>{grupp.kategori}</td>
                      <td style={{...frozenCol,left:120,background:rowBg,fontWeight:500,color:C.tx}}>{a.name}</td>
                      <td style={{...frozenCol,left:260,background:rowBg,fontSize:10.5,color:C.mu,fontFamily:"monospace"}}>{emailFor(a.name)}</td>
                      <td style={{...frozenCol,left:440,background:rowBg,fontSize:10.5,color:C.mu,fontFamily:"monospace",borderRight:`2px solid ${C.ac}`}}>{telFor(a.id)}</td>
                      {weeks.map(w => {
                        const bok = bokningFor(a.id, w)
                        const p = bok ? projForId(bok.projektId) : null
                        const c = p ? colorFor(p) : null
                        return (
                          <td
                            key={w}
                            colSpan={5}
                            className="rallar-excel-cell"
                            onClick={() => cellKlick(a.id, w)}
                            onDoubleClick={() => cellDubbel(a.id, w)}
                            title={p ? `${p.namn} — klick för att redigera, dubbelklick för att ta bort` : "Klick för att lägga till bokning"}
                            style={{
                              background: c ? c.bg : rowBg,
                              color: c ? c.text : C.mu,
                              padding:"5px 4px",
                              fontSize:10.5,
                              fontWeight: c ? 600 : 400,
                              textAlign:"center",
                              borderRight:`1px solid ${C.b2}`,
                              borderBottom:`1px solid ${C.bg3}`,
                              borderTop: c ? `2px solid ${c.border}` : "none",
                              borderLeft: c ? `2px solid ${c.border}` : "none",
                              whiteSpace:"nowrap",
                              minWidth:100,
                            }}
                          >
                            {p ? `${shortProj(p.namn)} 1-5` : ""}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </React.Fragment>
            ))}
            {/* Lägg till anställd-rad */}
            <tr>
              <td colSpan={4 + weeks.length * 5} style={{padding:0,background:"#fff",borderTop:`1px solid ${C.b}`}}>
                <button
                  className="rallar-no-print"
                  onClick={() => setShowLagg(true)}
                  style={{
                    width:"100%",padding:"12px 16px",border:"none",
                    background:C.bg2,color:C.ac,
                    cursor:"pointer",fontFamily:"inherit",
                    fontSize:13,fontWeight:600,textAlign:"left",
                    borderTop:`1px dashed ${C.b}`,
                    position:"sticky",left:0,
                  }}
                >+ Lägg till anställd</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Info-bricka */}
      <div className="rallar-no-print" style={{marginTop:10,fontSize:11,color:C.mu,display:"flex",gap:14,flexWrap:"wrap"}}>
        <span>💡 <strong style={{color:C.tx,fontWeight:600}}>Klicka</strong> en cell för att tilldela projekt</span>
        <span>💡 <strong style={{color:C.tx,fontWeight:600}}>Dubbelklicka</strong> för att ta bort bokning</span>
        <span>💡 Horisontell scroll → fler veckor · vertikal scroll → fler anställda</span>
      </div>

      {/* REDIGERA-POPUP */}
      {redigeraCell && (
        <div onClick={() => setRedigeraCell(null)} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:120}}>
          <div onClick={e => e.stopPropagation()} style={{background:"#fff",borderRadius:14,padding:"22px 24px",maxWidth:420,width:"92%",boxShadow:"0 16px 50px rgba(0,0,0,.22)"}}>
            <div style={{fontSize:11,color:C.mu,letterSpacing:".4px",fontWeight:700,marginBottom:4}}>VECKA {redigeraCell.vecka}</div>
            <div style={{fontSize:17,fontWeight:600,marginBottom:18,letterSpacing:"-.2px"}}>
              {redigeraCell.befintlig ? "Ändra bokning" : "Lägg till bokning"}
            </div>
            <label style={lbl}>Projekt</label>
            <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:300,overflowY:"auto",marginBottom:14}}>
              <button onClick={() => sparaCell(null)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:C.bg2,border:`1px solid ${C.b}`,borderRadius:8,cursor:"pointer",fontFamily:"inherit",textAlign:"left",fontSize:13}}>
                <span style={{fontSize:16}}>🚫</span>
                <span>Ingen bokning (tom)</span>
              </button>
              {projekt.map(p => {
                const c = colorFor(p)
                const isCurrent = redigeraCell.befintlig?.projektId === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => sparaCell(p.id)}
                    style={{
                      display:"flex",alignItems:"center",gap:10,
                      padding:"10px 12px",
                      background:isCurrent?c.bg:C.bg2,
                      border:`1.5px solid ${isCurrent?c.border:C.b}`,
                      borderRadius:8,cursor:"pointer",fontFamily:"inherit",
                      textAlign:"left",fontSize:13,
                    }}
                  >
                    <span style={{width:12,height:12,borderRadius:3,background:c.border,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:600,color:isCurrent?c.text:C.tx}}>{p.namn}</div>
                      <div style={{fontSize:11,color:C.mu,marginTop:1}}>{p.plats} · {p.arbete}</div>
                    </div>
                    {isCurrent && <span style={{fontSize:14,color:c.text,fontWeight:700}}>✓</span>}
                  </button>
                )
              })}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={() => setRedigeraCell(null)} style={{...btnG,flex:1}}>Avbryt</button>
              {redigeraCell.befintlig && (
                <button onClick={() => { onRemove(redigeraCell.befintlig.id); setRedigeraCell(null) }} style={{flex:1,padding:"10px",borderRadius:8,border:`1px solid ${C.da}`,background:"rgba(224,82,82,.08)",color:C.da,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:500}}>🗑 Ta bort</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LÄGG-TILL-ANSTÄLLD-POPUP */}
      {showLagg && <LaggTillAnstalldModal allaKategorier={allaKategorier} onSave={laggAnstalld} onClose={() => setShowLagg(false)}/>}
    </div>
  )
}

function LaggTillAnstalldModal({allaKategorier, onSave, onClose}) {
  const [namn, setNamn] = useState("")
  const [roll, setRoll] = useState(allaKategorier[0] || "Övriga")
  const [nyRoll, setNyRoll] = useState(false)
  const [customRoll, setCustomRoll] = useState("")
  function spara() {
    const slutligRoll = nyRoll ? customRoll.trim() : roll
    if (namn.trim() && slutligRoll) onSave(namn.trim(), slutligRoll)
  }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(13,31,53,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:120}}>
      <div onClick={e => e.stopPropagation()} style={{background:"#fff",borderRadius:14,padding:"22px 24px",maxWidth:380,width:"92%",boxShadow:"0 16px 50px rgba(0,0,0,.22)"}}>
        <div style={{fontSize:17,fontWeight:600,marginBottom:14}}>+ Lägg till anställd</div>
        <label style={lbl}>Namn</label>
        <input style={{...inp,marginBottom:12}} placeholder="t.ex. Anna Andersson" value={namn} onChange={e => setNamn(e.target.value)}/>
        <label style={lbl}>Roll / Kategori</label>
        {!nyRoll ? (
          <>
            <select style={{...inp,marginBottom:8}} value={roll} onChange={e => setRoll(e.target.value)}>
              {allaKategorier.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <button onClick={() => setNyRoll(true)} style={{background:"none",border:"none",color:C.ac,fontSize:12,cursor:"pointer",fontFamily:"inherit",marginBottom:14,textDecoration:"underline"}}>+ Ny roll</button>
          </>
        ) : (
          <>
            <input style={{...inp,marginBottom:8}} placeholder="t.ex. Lokförare" value={customRoll} onChange={e => setCustomRoll(e.target.value)}/>
            <button onClick={() => setNyRoll(false)} style={{background:"none",border:"none",color:C.ac,fontSize:12,cursor:"pointer",fontFamily:"inherit",marginBottom:14,textDecoration:"underline"}}>← Välj befintlig</button>
          </>
        )}
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <button onClick={onClose} style={{...btnG,flex:1}}>Avbryt</button>
          <button onClick={spara} style={{...btnP,flex:1}}>Lägg till</button>
        </div>
      </div>
    </div>
  )
}

const frozenHdr = {
  position:"sticky",
  padding:"8px 12px",
  fontSize:11,
  fontWeight:700,
  color:C.tx,
  textAlign:"left",
  letterSpacing:".3px",
  borderBottom:`1px solid ${C.b}`,
  borderRight:`1px solid ${C.b}`,
}
const frozenCol = {
  position:"sticky",
  padding:"8px 12px",
  fontSize:11.5,
  borderRight:`1px solid ${C.b2}`,
  borderBottom:`1px solid ${C.bg3}`,
  whiteSpace:"nowrap",
  zIndex:1,
}


// ── Bottom Nav ─────────────────────────────────────────────────
function BottomNav({role, screen, navigate, ansokningar, chattOlasta, uteOlasta}) {
  const navMap = {
    foretag: [
      {id:"hem",          e:"🏠", l:"Hem"},
      {id:"avrop-hub",    e:"📋", l:"Avrop"},
      {id:"org-hub",      e:"👥", l:"Personal"},
      {id:"projekt-hub",  e:"🏗", l:"Projekt"},
      {id:"foretag-hub",  e:"📚", l:"Företag"},
      {id:"meddelanden",  e:"💬", l:"Chatt"},
    ],
    arbetsledare: [
      {id:"dagorder",      e:"🏠", l:"Hem"},
      {id:"mina-arbeten",  e:"📋", l:"Arbete"},
      {id:"min-tid",       e:"⏱️", l:"Tid"},
      {id:"projektkoll",   e:"📊", l:"Projekt"},
      {id:"avvikelser",    e:"⚠️", l:"Avvik."},
      {id:"ute-notiser",   e:"💬", l:"Notiser"},
      {id:"profil",        e:"👤", l:"Profil"},
    ],
    arbetare: [
      {id:"dagorder",      e:"🏠", l:"Hem"},
      {id:"mina-arbeten",  e:"📋", l:"Arbete"},
      {id:"min-tid",       e:"⏱️", l:"Tid"},
      {id:"avvikelser",    e:"⚠️", l:"Avvik."},
      {id:"ute-notiser",   e:"💬", l:"Notiser"},
      {id:"profil",        e:"👤", l:"Profil"},
    ],
  }
  const items = navMap[role] || navMap.arbetare
  const activeId = aktivNavId(screen, role)

  const openAnsCount = role === "foretag" ? ansokningar.filter(a => a.status === "open").length : 0
  const olastaChat   = role === "foretag" ? (chattOlasta || 0) : 0
  const olastaUte    = (role === "arbetsledare" || role === "arbetare") ? (uteOlasta || 0) : 0

  return (
    <div style={{display:"flex",background:C.bg2,borderTop:`1px solid ${C.b}`,padding:"8px 0 16px"}}>
      {items.map(item => {
        const active = item.id === activeId
        const ansBadge = item.id === "avrop-hub"   && openAnsCount > 0
        const msgBadge = item.id === "meddelanden" && olastaChat > 0
        const uteBadge = item.id === "ute-notiser" && olastaUte > 0
        const badgeCount = ansBadge ? openAnsCount : msgBadge ? olastaChat : uteBadge ? olastaUte : 0
        const showBadge = ansBadge || msgBadge || uteBadge
        return (
          <button key={item.id} onClick={() => navigate(item.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"6px 0",position:"relative"}}>
            <span style={{fontSize:20,lineHeight:1,filter:active?"none":"grayscale(1) opacity(.5)",position:"relative"}}>
              {item.e}
              {showBadge && (
                <span style={{position:"absolute",top:-4,right:-10,background:C.da,color:"#fff",borderRadius:9,minWidth:16,height:16,fontSize:10,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px",border:`2px solid ${C.bg2}`,lineHeight:1}}>{badgeCount}</span>
              )}
            </span>
            <span style={{fontSize:9.5,color:active?C.ac:C.mu,fontWeight:active?500:400,whiteSpace:"nowrap"}}>{item.l}</span>
          </button>
        )
      })}
    </div>
  )
}

// ── App ────────────────────────────────────────────────────────
export default function RallarApp() {
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState("login")
  const [screenData, setScreenData] = useState(null)
  const viewport = useViewport()
  const [ansokningar, setAnsokningar] = useState(INIT_ANSOKNINGAR)
  const [avvikelser, setAvvikelser] = useState(INIT_AVVIKELSER)
  const [andringar, setAndringar] = useState(INIT_ANDRINGAR)
  const [dagorder, setDagorder] = useState(DAGORDER_INIT)
  const [bokningar, setBokningar] = useState(INIT_BOKNINGAR)
  const [projekt, setProjekt] = useState(INIT_PROJEKTERING_PROJEKT)
  const [tidsrapporter, setTidsrapporter] = useState(INIT_TIDSRAPPORTER)
  const [projekteringBokningar, setProjekteringBokningar] = useState(INIT_PROJEKTERING_BOKNINGAR)
  const [projektNotiser, setProjektNotiser] = useState(INIT_PROJEKT_NOTISER)
  const [senasteProjektId, setSenasteProjektId] = useState(null) // kommer ihåg senast använda projekt för tidsrapportering
  // Intranät-state
  const [nyheter, setNyheter] = useState(INIT_NYHETER)
  const [sakerhet, setSakerhet] = useState(INIT_SAKERHET)
  const [dokument] = useState(INIT_DOKUMENT)
  const [meddelanden, setMeddelanden] = useState(INIT_MEDDELANDEN)
  const [checklistor, setChecklistor] = useState(INIT_CHECKLIST_STATUS)
  const [kurser, setKurser] = useState(INIT_KURSER)
  // Dokumentnav-state
  const [anstalldDokument, setAnstalldDokument] = useState(INIT_ANSTALLD_DOKUMENT)
  const [anstalldaProfil, setAnstalldaProfil] = useState(INIT_ANSTALLDA_PROFIL)
  // Inventarie + företagsprofil-state
  const [inventarie, setInventarie] = useState(INIT_INVENTARIE)
  const [recensioner, setRecensioner] = useState(INIT_RECENSIONER)
  // Privata avrop + notiser-state
  const [privataAvrop, setPrivataAvrop] = useState(INIT_PRIVATA_AVROP)
  const [privatNotiser, setPrivatNotiser] = useState(INIT_PRIVAT_NOTISER)
  // Chatt-state
  const [konversationer, setKonversationer] = useState(INIT_KONVERSATIONER)
  const [chattMeddelanden, setChattMeddelanden] = useState(INIT_CHATT_MEDDELANDEN)
  // Arbetsledare notis-kvittenser — Set av notis-id som markerats sedd resp. action-done
  const [arbetsledareSeddIds, setArbetsledareSeddIds] = useState(() => new Set())
  const [arbetsledareActionDoneIds, setArbetsledareActionDoneIds] = useState(() => new Set())
  const [fordon] = useState(INIT_FORDON)
  const [fordonDokument] = useState(INIT_FORDON_DOKUMENT)
  const [projektDokument] = useState(INIT_PROJEKT_DOKUMENT)
  const [hmsDokument] = useState(INIT_HMS_DOKUMENT)
  const [foretagDokument] = useState(INIT_FORETAG_DOKUMENT)

  function login(role) {
    setUser(DEMO_USERS[role])
    setScreen(DEFAULT_SCREEN[role])
  }

  function navigate(to, data=null) {
    setScreen(to)
    if (data) setScreenData(data)
  }

  // Acceptera = avslå övriga öppna ansökningar på samma avrop automatiskt
  function updateAnsokan(id, newStatus) {
    setAnsokningar(prev => {
      if (newStatus !== "accepted") return prev.map(a => a.id===id ? {...a, status:newStatus} : a)
      const target = prev.find(a => a.id === id)
      if (!target) return prev
      return prev.map(a => {
        if (a.id === id) return {...a, status:"accepted"}
        if (a.avropId === target.avropId && a.status === "open") return {...a, status:"rejected"}
        return a
      })
    })
  }

  function addAvvikelse({text, photo, km, gps, av}) {
    setAvvikelser(prev => [...prev, {id:String(Date.now()), text, photo, km, gps, av, datum:"2026-05-25", status:"open"}])
  }
  function stangAvvikelse(id) {
    setAvvikelser(prev => prev.map(a => a.id===id ? {...a, status:"closed"} : a))
  }
  // ─── Chef-vyns avvikelse-handlers ─────────────────────────────────
  function nuTidKort() { const d = new Date(); return `2026-05-25 ${pad2(d.getHours())}:${pad2(d.getMinutes())}` }
  function delegeraAvvikelse(id, ansvarigId, ansvarigNamn, delegeradAv) {
    setAvvikelser(prev => prev.map(a => a.id === id ? {...a, ansvarigId, ansvarigNamn, delegeradTid: nuTidKort(), delegeradAv} : a))
  }
  function markSeddAvvikelse(id) {
    setAvvikelser(prev => prev.map(a => a.id === id ? {...a, seddTid: nuTidKort()} : a))
  }
  function markeraAtgardad(id, atgardadAv) {
    setAvvikelser(prev => prev.map(a => a.id === id ? {...a, status:"closed", atgardadAv, atgardadTid: nuTidKort()} : a))
  }
  function ateroppnaAvvikelse(id) {
    setAvvikelser(prev => prev.map(a => a.id === id ? {...a, status:"open", atgardadAv: undefined, atgardadTid: undefined} : a))
  }

  function markAndringSeen(id) {
    setAndringar(prev => prev.map(a => a.id===id ? {...a, sedd:true} : a))
  }
  function addAndring(text) {
    // Alla arbetare börjar som "ej sedd" på en ny ändring; uppdateras när de markerar som sedd
    const tomKvittenser = ANSTALLDA.reduce((acc, a) => ({...acc, [a.id]: {sedd:false}}), {})
    setAndringar(prev => [...prev, {id:String(Date.now()), text, datum:"2026-05-25", av:user.name, sedd:false, kvittenser:tomKvittenser}])
  }

  function saveDagorder(newD) { setDagorder(newD) }

  // Planering: en person kan bara vara på ett projekt per vecka — boka ersätter befintlig
  function addBokning({anstalldId, projektId, vecka}) {
    setBokningar(prev => {
      const filtered = prev.filter(b => !(b.anstalldId === anstalldId && b.vecka === vecka))
      return [...filtered, {id:String(Date.now())+Math.random().toString(36).slice(2,6), anstalldId, projektId, vecka}]
    })
  }
  function removeBokning(id) { setBokningar(prev => prev.filter(b => b.id !== id)) }

  // Projektering: skapa projekt, rapportera tid, projektets egna bokningar
  function addProjekt(p, valdaAnstallda = []) {
    const id = `pj${Date.now()}`
    setProjekt(prev => [...prev, {...p, id}])
    // Skapa en notis för varje vald anställd. Måste kvitteras med "Markera sedd" innan den försvinner.
    if (valdaAnstallda.length > 0) {
      const nyaNotiser = valdaAnstallda.map((anstalldId, i) => ({
        id: `pn${Date.now()}_${i}`,
        projektId: id,
        anstalldId,
        sedd: false,
        kvitteradTid: null,
      }))
      setProjektNotiser(prev => [...prev, ...nyaNotiser])
    }
  }
  function markProjektNotisSeen(notisId) {
    const now = new Date()
    const tid = `2026-05-25 ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`
    setProjektNotiser(prev => prev.map(n => n.id === notisId ? {...n, sedd:true, kvitteradTid:tid} : n))
  }
  // Tidsrapportering — stämpla in / stämpla ut / redigera glömda pass
  function startaPass({projektId, anstalldNamn, gps}) {
    const d = new Date()
    setTidsrapporter(prev => [...prev, {
      id: `tr${Date.now()}`,
      projektId, anstalldNamn,
      datum: "2026-05-25",
      startTid: nowToHHMM(d),
      stoppTid: null,
      timmar: 0,
      startGps: gps, stoppGps: null,
      status: "pågående",
      typ: "Normal", kommentar: "",
      redigeradAnledning: null,
    }])
    setSenasteProjektId(projektId)
  }
  function stoppaPass({passId, gps}) {
    const d = new Date()
    const stoppTid = nowToHHMM(d)
    setTidsrapporter(prev => prev.map(tr => {
      if (tr.id !== passId) return tr
      return {...tr, stoppTid, stoppGps: gps, timmar: timmarMellan(tr.startTid, stoppTid), status: "avslutad"}
    }))
  }
  function redigeraPass({passId, startTid, stoppTid, anledning}) {
    setTidsrapporter(prev => prev.map(tr => {
      if (tr.id !== passId) return tr
      return {...tr, startTid, stoppTid, timmar: timmarMellan(startTid, stoppTid), status: "redigerad", redigeradAnledning: anledning}
    }))
  }
  // — Manuell tidsrapport (för glömda stämplingar) —
  function manuellTidsrapport({datum, projektId, startTid, stoppTid, anledning, anstalldNamn}) {
    setTidsrapporter(prev => [...prev, {
      id: `tr${Date.now()}-man`,
      projektId, anstalldNamn,
      datum, startTid, stoppTid,
      timmar: timmarMellan(startTid, stoppTid),
      startGps: null, stoppGps: null,
      status: "manuell",
      typ: "Normal",
      kommentar: anledning,
      redigeradAnledning: anledning,
    }])
  }
  // ─── Intranät-handlers ─────────────────────────────────────────────
  function nuTid() { const d = new Date(); return `2026-05-25 ${pad2(d.getHours())}:${pad2(d.getMinutes())}` }
  function markNyhetLast(nyhetId) {
    const aid = getAnstalldId(user); if (!aid) return
    setNyheter(prev => prev.map(n => n.id === nyhetId ? {...n, lasningar: {...n.lasningar, [aid]: nuTid()}} : n))
  }
  function addNyhet({titel, text, kritisk}) {
    setNyheter(prev => [{id:`ny${Date.now()}`, titel, text, bild:null, datum: nuTid(), publiceradAv: user?.name || "Chef", kritisk, lasningar:{}}, ...prev])
  }
  function markSakerhetKvitterad(regelId) {
    const aid = getAnstalldId(user); if (!aid) return
    setSakerhet(prev => prev.map(s => s.id === regelId ? {...s, kvittenser: {...s.kvittenser, [aid]: nuTid()}} : s))
  }
  function markMeddelandeLast(meddId) {
    const aid = getAnstalldId(user); if (!aid) return
    setMeddelanden(prev => prev.map(m => m.id === meddId ? {...m, kvittenser: {...m.kvittenser, [aid]: nuTid()}} : m))
  }
  function addMeddelande({tillTyp, tillFilter, tillLabel, text}) {
    setMeddelanden(prev => [{id:`m${Date.now()}`, fran: user?.name || "Chef", tillTyp, tillFilter, tillLabel, text, datum: nuTid(), kvittenser:{}}, ...prev])
  }
  function sparaChecklista({anstalldId, datum, roll, svar, klar}) {
    const d = new Date()
    const klarTid = klar ? `${pad2(d.getHours())}:${pad2(d.getMinutes())}` : null
    setChecklistor(prev => {
      const filtered = prev.filter(c => !(c.anstalldId === anstalldId && c.datum === datum))
      return [...filtered, {id:`cs${Date.now()}`, anstalldId, datum, roll, svar, klar, klarTid}]
    })
  }
  function certifieraKurs(kursId) {
    const aid = getAnstalldId(user); if (!aid) return
    setKurser(prev => prev.map(k => k.id === kursId ? {...k, certifikat: {...k.certifikat, [aid]: "2026-05-25"}} : k))
  }
  // ─── Personalregister-handlers ───
  function addCertifikat({anstalldId, typ, titel, utfardatAv, utfardatDatum, giltigTill, bild}) {
    setAnstalldDokument(prev => [...prev, {
      id: `ad${Date.now()}`, anstalldId, typ, titel, utfardatDatum,
      giltigTill: giltigTill || null, utfardatAv,
      filtyp: bild ? (bild.startsWith("data:application/pdf") ? "pdf" : "bild") : "pdf",
      storlek: "—", bild: bild || null,
    }])
  }
  function uppdateraProfil(anstalldId, uppdateringar) {
    setAnstalldaProfil(prev => ({...prev, [anstalldId]: {...(prev[anstalldId] || {}), ...uppdateringar}}))
  }
  // ─── Inventarie-handlers ───
  function bokaUtInventarie(itemId, projektId) {
    setInventarie(prev => prev.map(it => it.id === itemId ? {...it, status:"Ute på projekt", aktivProjektId: projektId} : it))
  }
  function aterlamnaInventarie(itemId) {
    setInventarie(prev => prev.map(it => {
      if (it.id !== itemId) return it
      const idag = "2026-05-25"
      const nyHist = it.aktivProjektId ? [{projektId: it.aktivProjektId, fran: idag, till: idag}, ...(it.historik || [])] : (it.historik || [])
      return {...it, status:"Tillgänglig", aktivProjektId: null, historik: nyHist}
    }))
  }
  function markeraTrasig(itemId, av, kommentar) {
    setInventarie(prev => prev.map(it => it.id === itemId ? {...it, status:"Trasig", aktivProjektId: null, trasigtSedan:"2026-05-25", trasigtAv: av, trasigtKommentar: kommentar} : it))
  }
  function lagaTrasig(itemId) {
    setInventarie(prev => prev.map(it => it.id === itemId ? {...it, status:"Tillgänglig", trasigtSedan: undefined, trasigtAv: undefined, trasigtKommentar: undefined} : it))
  }
  function serviceKlar(itemId) {
    setInventarie(prev => prev.map(it => it.id === itemId ? {...it, status:"Tillgänglig", senasteService:"2026-05-25"} : it))
  }
  // ─── Företagsprofil-handlers ───
  function addRecension(rec) {
    setRecensioner(prev => [{id:`r${Date.now()}`, ...rec}, ...prev])
  }
  function skickaForfragan(foretagId, itemId, payload) {
    // Demo: skickar bara — i live skulle det skapa ett meddelande / notis
    console.log("Förfrågan skickad", foretagId, itemId, payload)
  }
  // ─── Privata avrop-handlers ───────────────────────────────────────
  function skickaPrivatAvrop(avropData, mottagarforetagIds, bestallareNamn, bestallareForetag) {
    const avropId = `pa${Date.now()}`
    const nyttAvrop = {
      id: avropId,
      mottagarforetagIds,
      declinedForetagIds: [],
      bestallareNamn,
      bestallareForetag,
      publicerad: "2026-05-25",
      ...avropData,
    }
    setPrivataAvrop(prev => [nyttAvrop, ...prev])
    // En notis per mottagande företag
    const tid = `2026-05-25 ${pad2(new Date().getHours())}:${pad2(new Date().getMinutes())}`
    const nyaNotiser = mottagarforetagIds.map((fId, i) => ({
      id: `pn${Date.now()}-${i}`,
      typ: "privat-avrop-inkommen",
      avropId,
      foretagId: fId,
      titel: "🔒 Nytt privat avrop",
      meddelande: `Ni har fått ett privat avrop från ${bestallareNamn} — öppna för att läsa och ansöka.`,
      tid,
      sedd: false,
    }))
    setPrivatNotiser(prev => [...nyaNotiser, ...prev])
    // För varje mottagare: skapa konversation om ej finns + lägg systemmeddelande
    mottagarforetagIds.forEach((fId, i) => {
      const partnerNamn = INIT_FORETAG.find(c => c.id === fId)?.namn || "företaget"
      let konvId
      const befintlig = konversationer.find(k => k.partnerForetagId === fId)
      if (befintlig) {
        konvId = befintlig.id
      } else {
        konvId = `k${Date.now()}-${i}`
        setKonversationer(prev => [...prev, {id: konvId, partnerForetagId: fId}])
      }
      const sysMsgId = `cm${Date.now()}-${i}`
      setChattMeddelanden(prev => [...prev, {
        id: sysMsgId, konvId, fran:"system",
        text: `🔒 Du skickade ett privat avrop till ${partnerNamn} — fortsätt konversationen här.`,
        typ: "system", data:{avropId}, tid, sedd: true,
      }])
    })
  }
  function markPrivatNotisSedd(notisId) {
    setPrivatNotiser(prev => prev.map(n => n.id === notisId ? {...n, sedd:true} : n))
  }
  function markAllaPrivatNotiserSedd(foretagId) {
    setPrivatNotiser(prev => prev.map(n => n.foretagId === foretagId ? {...n, sedd:true} : n))
  }
  // — Tacka nej: markera notisen sedd + avropet nekat + skapa svars-notis till beställaren —
  function tackaNejPrivatAvrop(avropId, foretagId, kommentar) {
    const avrop = privataAvrop.find(a => a.id === avropId)
    if (!avrop) return
    const minForetagNamn = INIT_FORETAG.find(c => c.id === foretagId)?.namn || "Företaget"
    // 1. Markera alla notiser som matchar detta avrop+foretag som sedda
    setPrivatNotiser(prev => prev.map(n =>
      n.avropId === avropId && n.foretagId === foretagId ? {...n, sedd:true} : n
    ))
    // 2. Lägg till företaget i declinedForetagIds så avropet döljs i deras marketplace
    setPrivataAvrop(prev => prev.map(a => a.id === avrop.id
      ? {...a, declinedForetagIds: [...(a.declinedForetagIds || []), foretagId]}
      : a))
    // 3. Skapa svars-notis till beställaren
    const tid = `2026-05-25 ${pad2(new Date().getHours())}:${pad2(new Date().getMinutes())}`
    const sverNotis = {
      id: `pn${Date.now()}-svar`,
      typ: "tacka-nej-svar",
      avropId: avropId,
      foretagId: avrop.bestallareForetagId || INIT_FORETAG.find(c => c.namn === avrop.bestallareForetag)?.id,
      fromForetagId: foretagId,
      fromForetagNamn: minForetagNamn,
      avropProj: avrop.proj,
      kommentar: kommentar || "",
      titel: "📭 Företag tackade nej",
      meddelande: `${minForetagNamn} tackade nej till ert privata avrop "${avrop.proj}".${kommentar ? ` Anledning: ${kommentar}` : ""}`,
      tid,
      sedd: false,
    }
    setPrivatNotiser(prev => [sverNotis, ...prev])
  }
  // — Vidareskicka: skicka samma privata avrop till ett nytt företag —
  function vidareskickaPrivatAvrop(avropId, nyttForetagId) {
    const avrop = privataAvrop.find(a => a.id === avropId)
    if (!avrop) return
    // 1. Lägg nytt företag i mottagarforetagIds (dubblettsäkert)
    setPrivataAvrop(prev => prev.map(a => a.id === avropId
      ? {...a, mottagarforetagIds: [...new Set([...(a.mottagarforetagIds || []), nyttForetagId])]}
      : a))
    // 2. Skapa ny inkommen-notis för mottagaren
    const tid = `2026-05-25 ${pad2(new Date().getHours())}:${pad2(new Date().getMinutes())}`
    const nyNotis = {
      id: `pn${Date.now()}-vidare`,
      typ: "privat-avrop-inkommen",
      avropId,
      foretagId: nyttForetagId,
      titel: "🔒 Nytt privat avrop",
      meddelande: `Ni har fått ett privat avrop från ${avrop.bestallareNamn} — öppna för att läsa och ansöka.`,
      tid,
      sedd: false,
    }
    setPrivatNotiser(prev => [nyNotis, ...prev])
  }
  // ─── Chatt-handlers ───────────────────────────────────────
  function addChattMeddelande(konvId, fran, text, typ, dataObj) {
    const tid = `2026-05-25 ${pad2(new Date().getHours())}:${pad2(new Date().getMinutes())}`
    setChattMeddelanden(prev => [...prev, {
      id:`cm${Date.now()}`, konvId, fran, text, typ:typ||"text", data:dataObj||null, tid, sedd:false,
    }])
  }
  function markaKonversationLast(konvId, userForetagId) {
    // Markerar alla meddelanden i konvon som ej är från användaren som sedda
    setChattMeddelanden(prev => prev.map(m =>
      m.konvId === konvId && m.fran !== userForetagId && m.fran !== "system" && !m.sedd
        ? {...m, sedd:true}
        : m
    ))
  }
  function startaKonversation(partnerForetagId) {
    const befintlig = konversationer.find(k => k.partnerForetagId === partnerForetagId)
    if (befintlig) return befintlig.id
    const nyId = `k${Date.now()}`
    setKonversationer(prev => [...prev, {id:nyId, partnerForetagId}])
    return nyId
  }
  // — Arbetsledare-notis-handlers (för UteNotiser-fliken) —
  function markArbetsledareNotisSedd(id) {
    setArbetsledareSeddIds(prev => new Set([...prev, id]))
  }
  function markArbetsledareNotisActionDone(id) {
    setArbetsledareActionDoneIds(prev => new Set([...prev, id]))
    setArbetsledareSeddIds(prev => new Set([...prev, id]))  // action-done implicerar sedd
  }
  function addProjekteringBokning({anstalldId, projektId, vecka}) {
    setProjekteringBokningar(prev => {
      const filtered = prev.filter(b => !(b.anstalldId === anstalldId && b.vecka === vecka))
      return [...filtered, {id:`pbk${Date.now()}`+Math.random().toString(36).slice(2,5), anstalldId, projektId, vecka}]
    })
  }
  function removeProjekteringBokning(id) { setProjekteringBokningar(prev => prev.filter(b => b.id !== id)) }

  const appStyle = {
    background: C.bg,
    color: C.tx,
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 16,
    maxWidth: 430,
    margin: "0 auto",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    WebkitFontSmoothing: "antialiased",
  }

  if (!user) return (
    <div style={appStyle}>
      <LoginScreen onLogin={login}/>
    </div>
  )

  const renderScreen = () => {
    switch(screen) {
      case "marketplace":     return <Marketplace user={user} navigate={navigate} privataAvrop={privataAvrop} privatNotiser={privatNotiser} onMarkNotisSedd={markPrivatNotisSedd} onMarkAllaSedd={markAllaPrivatNotiserSedd} onTackaNej={tackaNejPrivatAvrop}/>
      // ─── Städade hub-sidor + Hem-dashboard ───
      case "hem":             return <ForetagHem user={user} navigate={navigate} privatNotiser={privatNotiser} ansokningar={ansokningar} avvikelser={avvikelser} projekteringBokningar={projekteringBokningar} chattMeddelanden={chattMeddelanden} konversationer={konversationer}/>
      case "avrop-hub":       return <AvropHub navigate={navigate} ansokningar={ansokningar}/>
      case "org-hub":         return <OrganisationHub navigate={navigate} projekteringBokningar={projekteringBokningar}/>
      case "projekt-hub":     return <ProjektHub navigate={navigate} projekt={projekt} avvikelser={avvikelser}/>
      case "foretag-hub":     return <ForetagHub navigate={navigate}/>
      case "ute-notiser":
        if (user.role === "arbetsledare")
          return <ArbetsledareNotiser user={user} navigate={navigate} avvikelser={avvikelser} andringar={andringar} extraNotiser={INIT_ARBETSLEDARE_EXTRA_NOTISER} seddIds={arbetsledareSeddIds} actionDoneIds={arbetsledareActionDoneIds}/>
        return <UteNotiserV2 user={user} navigate={navigate} andringar={andringar} projektNotiser={projektNotiser} onMarkAndringSeen={markAndringSeen}/>
      case "ute-notis-detalj":
        return <ArbetsledareNotisDetalj
          user={user}
          navigate={navigate}
          notis={screenData}
          avvikelser={avvikelser}
          onMarkSedd={markArbetsledareNotisSedd}
          onMarkActionDone={markArbetsledareNotisActionDone}
          onDelegera={delegeraAvvikelse}
        />
      // ─── Meddelanden / chatt ───
      case "meddelanden":     return <MeddelandenStart user={user} navigate={navigate} konversationer={konversationer} chattMeddelanden={chattMeddelanden} onStartaKonv={startaKonversation}/>
      case "meddelande-chatt":return <MeddelandeChatt user={user} navigate={navigate} konvId={screenData?.konvId} konversationer={konversationer} chattMeddelanden={chattMeddelanden} onAdd={addChattMeddelande} onMarkLast={markaKonversationLast}/>
      case "avrop":           return <AvropDetail avrop={screenData||AVROP[0]} navigate={navigate} role={user.role} user={user} onTackaNej={tackaNejPrivatAvrop}/>
      case "skapa-avrop":     return <SkapaAvrop navigate={navigate} user={user} onSkickaPrivat={skickaPrivatAvrop}/>
      case "mina-avrop":      return <MinaAvrop navigate={navigate} ansokningar={ansokningar} user={user} privataAvrop={privataAvrop} privatNotiser={privatNotiser} onVidareskicka={vidareskickaPrivatAvrop}/>
      case "ansokningar":     return <AvropAnsokningar avrop={screenData||MINA_AVROP[0]} ansokningar={ansokningar} navigate={navigate}/>
      case "ansokan":         return <AnsokanDetail ansokan={screenData?.ansokan} avrop={screenData?.avrop} navigate={navigate} onAction={updateAnsokan}/>
      case "planering":
        if (viewport !== "mobile") {
          return <PlaneringDag bokningar={bokningar} onAdd={addBokning} onRemove={removeBokning} anstallda={PLANERING_ANSTALLDA} projekt={PROJEKT_LIST} weeks={WEEKS} projectPalette={PROJECT_PALETTE}/>
        }
        return <Planering bokningar={bokningar} onAdd={addBokning} onRemove={removeBokning}/>
      case "projektering":    return <Projektering projekt={projekt} bokningar={projekteringBokningar} tidsrapporter={tidsrapporter} projektAvvikelser={INIT_PROJEKT_AVVIKELSER} onAddBokning={addProjekteringBokning} onRemoveBokning={removeProjekteringBokning} navigate={navigate}/>
      case "skapa-projekt":   return <SkapaProjekt navigate={navigate} onSave={addProjekt} antalProjekt={projekt.length}/>
      case "projekt-detalj":  return <ProjektDetalj projekt={screenData} bokningar={projekteringBokningar} tidsrapporter={tidsrapporter} projektAvvikelser={INIT_PROJEKT_AVVIKELSER} projektNotiser={projektNotiser} navigate={navigate}/>
      case "rapportera-tid":  return <StampelArbetare user={user} projekt={projekt} tidsrapporter={tidsrapporter} navigate={navigate} onStart={startaPass} onStop={stoppaPass} senasteProjektId={senasteProjektId} onSenasteProjekt={setSenasteProjektId}/>
      // ─── Nya tidsrapporterings-skärmar ───
      case "stampla":         return <StampelArbetare user={user} projekt={projekt} tidsrapporter={tidsrapporter} navigate={navigate} onStart={startaPass} onStop={stoppaPass} senasteProjektId={senasteProjektId} onSenasteProjekt={setSenasteProjektId}/>
      case "min-tid":
        if (user.role === "foretag") return <TidChefDashboard user={user} projekt={projekt} tidsrapporter={tidsrapporter} navigate={navigate}/>
        return <MinTidArbetare user={user} projekt={projekt} tidsrapporter={tidsrapporter} navigate={navigate} onEdit={r => navigate("rapportera-tid")}/>
      case "manuell-tid":     return <ManuellTidForm user={user} projekt={projekt} navigate={navigate} onManuellRapport={manuellTidsrapport}/>
      case "tid-historik":    return <TidHistorikArbetare user={user} projekt={projekt} tidsrapporter={tidsrapporter} navigate={navigate}/>
      case "tid-chef":        return <TidChefDashboard user={user} projekt={projekt} tidsrapporter={tidsrapporter} navigate={navigate}/>
      case "mina-arbeten":    return <MinaArbeten/>
      case "dagorder":        return <Dagorder dagorder={dagorder} andringar={andringar} onMarkSeen={markAndringSeen} navigate={navigate} user={user} projekt={projekt} projektNotiser={projektNotiser} onMarkProjektNotisSeen={markProjektNotisSeen}/>
      case "skapa-dagorder":  return <SkapaDagorder dagorder={dagorder} navigate={navigate} onSave={saveDagorder}/>
      case "avvikelser":      
        if (user.role === "foretag")      return <BestallareAvvikelser avvikelser={avvikelser} navigate={navigate} projekt={projekt}/>
        if (user.role === "arbetsledare") return <ArbetsledareAvvikelser user={user} avvikelser={avvikelser} onDelegera={delegeraAvvikelse}/>
        return <ArbetareAvvikelser user={user} avvikelser={avvikelser} onAdd={addAvvikelse} onStang={stangAvvikelse} onMarkSedd={markSeddAvvikelse} onMarkeraKlart={markeraAtgardad}/>
      case "avvikelse-detalj": return <BestallareAvvikelseDetalj avvikelse={avvikelser.find(a => a.id === screenData?.id) || screenData} navigate={navigate} projekt={projekt}/>
      case "projektkoll":     return <Projektkoll navigate={navigate} avvikelser={avvikelser} andringar={andringar} onAddAndring={addAndring} dagorder={dagorder}/>
      // ─── Intranät ───
      case "intranet-hem":              return <IntranetHem user={user} nyheter={nyheter} sakerhet={sakerhet} meddelanden={meddelanden} checklistor={checklistor} navigate={navigate}/>
      case "intranet-nyheter":          return <IntranetNyheter user={user} nyheter={nyheter} navigate={navigate}/>
      case "intranet-nyhet-detalj":     return <IntranetNyhetDetalj user={user} nyhet={nyheter.find(n => n.id === screenData?.id) || screenData} navigate={navigate} onLas={markNyhetLast}/>
      case "intranet-skapa-nyhet":      return <IntranetSkapaNyhet navigate={navigate} onSave={addNyhet}/>
      case "intranet-sakerhet":         return <IntranetSakerhet user={user} sakerhet={sakerhet} navigate={navigate}/>
      case "intranet-sakerhet-detalj":  return <IntranetSakerhetDetalj user={user} regel={sakerhet.find(s => s.id === screenData?.id) || screenData} navigate={navigate} onKvittera={markSakerhetKvitterad}/>
      case "intranet-dokument":         return <IntranetDokument dokument={dokument} navigate={navigate}/>
      case "intranet-kontakter":        return <IntranetKontakter navigate={navigate}/>
      case "intranet-meddelanden":      return <IntranetMeddelanden user={user} meddelanden={meddelanden} navigate={navigate}/>
      case "intranet-meddelande-detalj":return <IntranetMeddelandeDetalj user={user} meddelande={meddelanden.find(m => m.id === screenData?.id) || screenData} navigate={navigate} onKvittera={markMeddelandeLast}/>
      case "intranet-skapa-meddelande": return <IntranetSkapaMeddelande navigate={navigate} onSave={addMeddelande}/>
      case "intranet-checklistor":      return <IntranetChecklistor user={user} checklistor={checklistor} navigate={navigate} onSpara={sparaChecklista}/>
      case "intranet-utbildning":       return <IntranetUtbildning user={user} kurser={kurser} navigate={navigate}/>
      case "intranet-kurs-detalj":      return <IntranetKursDetalj user={user} kurs={kurser.find(k => k.id === screenData?.id) || screenData} navigate={navigate} onCertifiera={certifieraKurs}/>
      // ─── Dokumentnav ───
      case "dokumentnav-hem":             return <DokumentnavHem user={user} navigate={navigate} anstalldDokument={anstalldDokument} fordon={fordon} fordonDokument={fordonDokument} projektDokument={projektDokument} hmsDokument={hmsDokument} foretagDokument={foretagDokument} dokument={dokument} projekt={projekt} avvikelser={avvikelser}/>
      case "dokumentnav-anstallda":       return <DokumentnavAnstallda user={user} anstalldDokument={anstalldDokument} navigate={navigate}/>
      case "dokumentnav-anstalld-detalj": return <DokumentnavAnstalldDetalj anstalld={INIT_KONTAKTER.find(k => k.id === screenData?.id) || screenData} anstalldDokument={anstalldDokument} navigate={navigate}/>
      case "dokumentnav-projekt":         return <DokumentnavProjekt projekt={projekt} projektDokument={projektDokument} navigate={navigate}/>
      case "dokumentnav-projekt-detalj":  return <DokumentnavProjektDetalj projekt={projekt.find(p => p.id === screenData?.id) || screenData} projektDokument={projektDokument} navigate={navigate}/>
      case "dokumentnav-fordon":          return <DokumentnavFordon fordon={fordon} fordonDokument={fordonDokument} navigate={navigate}/>
      case "dokumentnav-fordon-detalj":   return <DokumentnavFordonDetalj fordon={fordon.find(f => f.id === screenData?.id) || screenData} fordonDokument={fordonDokument} anstalldDokument={anstalldDokument} navigate={navigate}/>
      case "dokumentnav-hms":             return <DokumentnavHMS hmsDokument={hmsDokument} avvikelser={avvikelser} projekt={projekt} navigate={navigate}/>
      case "dokumentnav-mallar":          return <DokumentnavMallar dokument={dokument} navigate={navigate}/>
      case "dokumentnav-foretag":         return <DokumentnavForetag foretagDokument={foretagDokument} navigate={navigate}/>
      case "dokumentnav-detalj":          return <DokumentnavDetalj dok={screenData} navigate={navigate}/>
      // ─── Personalregister ───
      case "anstallda-hem":    return <AnstalldaHem user={user} anstalldDokument={anstalldDokument} anstalldaProfil={anstalldaProfil} navigate={navigate}/>
      case "anstalld-profil":  return <AnstalldProfil user={user} anstalld={INIT_KONTAKTER.find(k => k.id === screenData?.id) || screenData} anstalldaProfil={anstalldaProfil} anstalldDokument={anstalldDokument} projektDokument={projektDokument} projekteringBokningar={projekteringBokningar} projekt={projekt} navigate={navigate} onAddCert={addCertifikat} onUpdateProfil={uppdateraProfil}/>
      // ─── Inventarie ───
      case "intranet-inventarie":         return <IntranetInventarie user={user} inventarie={inventarie} navigate={navigate}/>
      case "intranet-inventarie-detalj":  return <IntranetInventarieDetalj user={user} item={inventarie.find(i => i.id === screenData?.id) || screenData} projekt={projekt} inventarie={inventarie} navigate={navigate} onBokaUt={bokaUtInventarie} onAterlamna={aterlamnaInventarie} onMarkeraTrasig={markeraTrasig} onLagaTrasig={lagaTrasig} onServiceKlar={serviceKlar}/>
      // ─── Publik företagsprofil ───
      case "foretag-listan":              return <ForetagListan navigate={navigate} recensioner={recensioner}/>
      case "foretag-profil":              return <ForetagsProfilPublik user={user} foretag={INIT_FORETAG.find(c => c.id === screenData?.id) || screenData} navigate={navigate} recensioner={recensioner} inventarie={inventarie} projekt={projekt} onAddRecension={addRecension} onSkickaForfragan={skickaForfragan}/>
      case "foretag-anstalld-publik":     return <ForetagsAnstalldPublik anstalld={INIT_KONTAKTER.find(k => k.id === screenData?.anstalldId)} anstalldDokument={anstalldDokument} anstalldaProfil={anstalldaProfil} projekteringBokningar={projekteringBokningar} projekt={projekt} foretagId={screenData?.foretagId} navigate={navigate}/>
      case "profil":          return <Profil user={user} navigate={navigate} onLogout={() => {setUser(null);setScreen("login")}}/>
      default:                return <Marketplace navigate={navigate}/>
    }
  }

  // Beräkna chatt-olästa en gång (används av både mobile bottom-nav och desktop sidebar)
  const chattOlasta = (() => {
    if (!user) return 0
    const minId = INIT_FORETAG.find(c => c.namn === user.company)?.id
    if (!minId) return 0
    return chattMeddelanden.filter(m => m.fran !== minId && m.fran !== "system" && !m.sedd && konversationer.some(k => k.id === m.konvId)).length
  })()

  // ─── Desktop/Tablet layout för FORETAG-rollen ───
  // Mobil + andra roller → oförändrat (existerande BottomNav-shell)
  if (viewport !== "mobile" && user && user.role === "foretag" && screen !== "login") {
    return (
      <>
        <ResponsiveStyles/>
        <div style={{
          display:"flex",
          minHeight:"100vh",
          background: C.bg2,
          fontFamily:"'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          color: C.tx,
        }}>
          <SidebarFor
            user={user}
            screen={screen}
            navigate={navigate}
            ansokningar={ansokningar}
            chattOlasta={chattOlasta}
            onLogout={() => {setUser(null); setScreen("login")}}
          />
          <main style={{
            flex:1,
            minWidth:0,
            background: C.bg,
            display:"flex",
            justifyContent:"center",
            overflowX:"hidden",
          }}>
            <div className="rallar-desktop-content" style={{
              flex:1,
              maxWidth: 1400,
              minHeight:"100vh",
              boxShadow:"0 0 0 1px rgba(13,31,53,.04)",
              overflowX:"hidden",
              padding: viewport === "desktop" ? "0 16px" : "0 12px",
            }}>
              {renderScreen()}
            </div>
          </main>
        </div>
      </>
    )
  }

  // ─── MOBIL-LAYOUT — ORÖRD, EXAKT SOM INNAN ───
  return (
    <>
      <ResponsiveStyles/>
      <div style={appStyle}>
        <div style={{flex:1}}>{renderScreen()}</div>
        <BottomNav role={user.role} screen={screen} navigate={navigate} ansokningar={ansokningar} chattOlasta={chattOlasta}/>
      </div>
    </>
  )
}
