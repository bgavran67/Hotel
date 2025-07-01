use master;
go
drop database if exists zavrsniradhotel;
go
create database zavrsniradhotel collate Croatian_CI_AS;
go
use zavrsniradhotel;


create table sobe(
sifra int not null primary key identity (1,1),
tip_sobe varchar(100) not null,
cijena decimal (38) not null,
dostupnost varchar(50),
broj_sobe int
);

create table gosti(
sifra int not null primary key identity (1,1),
ime varchar (50) not null,
prezime varchar (60) not null,
email varchar (100) not null,
telefon varchar (25), 
adresa varchar (100)
);

create table prijevoz_gostiju(
sifra int not null primary key identity (1,1),
datum_polaska date not null,
datum_odlaska date not null,
vrsta_prijevoza varchar (100),
lokacija_polazista varchar (100) not null ,
dostupnost varchar (50),
broj_putnika int not null,
gost int not null references gosti(sifra)
);

create table rezervacije(
sifra int not null primary key identity (1,1),
ukupna_cijena decimal (38),
vrijeme_datum_prijave datetime,
vrijeme_datum_odjave datetime,
gost int not null references gosti(sifra),
soba int not null references sobe(sifra)
);

insert into sobe(tip_sobe,cijena)
values ('Jednokrevetna', 51.89),
('Dvokrevetna', 55.40),
('Obiteljska', 99.99),
('Suite', 121.75),
('Predsjednički apartman', 150)

insert into gosti (ime,prezime,email)
values ('Mirolav', 'Ilić', 'miroslavilic@gmail.com'),
('Ana', 'Golub', 'anagolub@gmail.com'),
('Mirta', 'Stanović', 'mirtastanovic@gmail.com'),
('Ante', 'Val', 'anteval@gmail.com'),
('Krešo', 'Sitan', 'kresositan@gmail.com')

insert into prijevoz_gostiju (datum_polaska,datum_odlaska,lokacija_polazista,broj_putnika,gost)
values ('2025-06-01','2025-06-12','Trg Lavoslava Ružičke 2, 31000 Osijek','1', 1),
('2025-06-25','2025-06-29',' Vukovarska ulica 67, 31207 Klisa, Osječko-baranjska županija','1', 2),
('2025-07-03','2025-07-07',' Vukovarska ulica 67, 31207 Klisa, Osječko-baranjska županija','1', 3),
('2025-07-07','2025-07-10','Ulica Bartola Kašića 70, 31000 Osijek','1', 4),
('2025-07-15','2025-07-20','Vukovarska ulica 67, 31207 Klisa, Osječko-baranjska županija','1', 5)

insert into rezervacije (gost,soba) 
values (1,2), (2,3), (3,1), (4,2), (5,5)

select a.sifra, b.sifra, a.datum_polaska, a.datum_odlaska, a.lokacija_polazista, b.ime, b.prezime,d.tip_sobe
from prijevoz_gostiju a
inner join gosti b on a.gost=b.sifra
inner join rezervacije c on b.sifra = c.gost
inner join  sobe d on d.sifra=c.soba

select b.ime, b.prezime, b.email, d.tip_sobe
from rezervacije c
inner join gosti b on c.gost=b.sifra
inner join sobe d on d.sifra=c.soba

--ispisi imena i prezimena koji nisu koristili uslugu prijevoza
select a.ime, a.prezime
from gosti a
left join prijevoz_gostiju b on a.sifra=b.gost
where gost is null;

--unesi jednog koji nema prijevoz do hotela
insert into gosti(ime,prezime,email)
values ('Barbara','Gavran','bgavran67@gmail.com');
