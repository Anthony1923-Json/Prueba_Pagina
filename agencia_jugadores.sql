SET client_encoding = 'UTF8';

CREATE TABLE AGENCIAS_NEW (
    AgenciaID               SERIAL          PRIMARY KEY,
    Nombre                  VARCHAR(100)    NOT NULL,
    Nombre_Agente           VARCHAR(100),
    Duracion_Contrato_Anos  INT
);

INSERT INTO AGENCIAS_NEW (AgenciaID, Nombre, Nombre_Agente, Duracion_Contrato_Anos) VALUES
(1, 'Iberian Sports Agency',       'Roberto Cano Vidal',   2),
(2, 'Sur Fútbol Representaciones', 'Marta Iglesias Soler', 3),
(3, 'Libre — Sin Agencia',         NULL,                   NULL);

SELECT setval('agencias_new_agenciaid_seq', (SELECT MAX(AgenciaID) FROM AGENCIAS_NEW));


CREATE TABLE JUGADORES_NEW (
    IdJugador           SERIAL          PRIMARY KEY,
    Nombre              VARCHAR(50)     NOT NULL,
    Apellidos           VARCHAR(100)    NOT NULL,
    Fecha_Nacimiento    DATE            NOT NULL,
    Edad                INT             NOT NULL,
    PosicionDetallada   VARCHAR(50)     NOT NULL,
    Rol                 VARCHAR(30)     NOT NULL,
    ClubActual          VARCHAR(100)    NOT NULL,
    Anos_Contrato       INT             NOT NULL,
    Dorsal              INT             NOT NULL,
    Pierna_Habil        VARCHAR(10)     NOT NULL CHECK (Pierna_Habil IN ('Derecha','Izquierda','Ambas')),
    Estadisticas        TEXT,
    Trayectoria         TEXT,
    AgenciaID           INT             NOT NULL,
    Contrato_Agencia    DATE,
    CONSTRAINT fk_agencia_new FOREIGN KEY (AgenciaID) REFERENCES AGENCIAS_NEW(AgenciaID)
);

INSERT INTO JUGADORES_NEW (
    IdJugador, Nombre, Apellidos, Fecha_Nacimiento, Edad,
    PosicionDetallada, Rol, ClubActual, Anos_Contrato,
    Dorsal, Pierna_Habil, Estadisticas, Trayectoria,
    AgenciaID, Contrato_Agencia
) VALUES
(
    1, 'Adrián', 'Fuentes Castellano', '1999-04-21', 25,
    'Mediapunta / Interior Derecho', 'Titular', 'CD Numancia', 2,
    10, 'Derecha',
    '26 partidos, 8 goles, 6 asistencias, 81% pases completados, 4.2 km sprint/partido',
    'Cantera Celta Vigo 2011-2017, Celta B 2017-2019, UD Ourense 2019-2022 (2ª RFEF), CD Numancia 2022-presente (1ª RFEF)',
    1, '2022-07-01'
),
(
    2, 'Pablo', 'Serrano Molina', '2001-09-14', 23,
    'Lateral Izquierdo', 'Titular', 'UD Melilla', 1,
    3, 'Izquierda',
    '22 partidos, 1 gol, 4 asistencias, 87% duelos defensivos ganados, 2.1 intercepciones/partido',
    'Cantera Almería 2013-2019, Almería C 2019-2021 (3ª RFEF), CD El Ejido 2021-2023 (2ª RFEF), UD Melilla 2023-presente (2ª RFEF)',
    2, '2023-06-30'
),
(
    3, 'Javier', 'Molina Herrero', '2003-02-05', 21,
    'Delantero Centro', 'Suplente', 'CF Talavera B', 1,
    9, 'Derecha',
    '18 partidos, 5 goles, 2 asistencias, 62% duelos aéreos ganados, 1.8 remates/partido',
    'Cantera CF Talavera 2015-2022, CF Talavera B 2022-presente (3ª RFEF)',
    3, NULL
);

SELECT setval('jugadores_new_idjugador_seq', (SELECT MAX(IdJugador) FROM JUGADORES_NEW));


select * from AGENCIAS_NEW

select * from JUGADORES_NEW