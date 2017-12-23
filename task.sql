-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-12-2017 a las 08:29:07
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `task`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` bigint(20) UNSIGNED NOT NULL,
  `nombreCategoria` varchar(20) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cattec`
--

CREATE TABLE `cattec` (
  `idCatTec` bigint(20) UNSIGNED NOT NULL,
  `idTecnico` bigint(20) UNSIGNED NOT NULL,
  `categoria` varchar(20) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cattec`
--

INSERT INTO `cattec` (`idCatTec`, `idTecnico`, `categoria`) VALUES
(2, 1, 'Albanileria'),
(3, 1, 'Electricidad'),
(4, 1, 'Mecanica'),
(5, 1, 'Plomeria'),
(6, 1, 'Herreria'),
(7, 1, 'Pintura'),
(8, 1, 'Costureria'),
(9, 2, 'Carpinteria'),
(10, 3, 'Costureria'),
(11, 3, 'Mecanica'),
(12, 3, 'Electricidad'),
(13, 4, 'Albanileria'),
(14, 4, 'Pintura'),
(15, 4, 'Costureria'),
(16, 4, 'Carpinteria'),
(17, 4, 'Plomeria'),
(18, 4, 'Electricidad'),
(19, 4, 'Mecanica'),
(20, 4, 'Herreria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colonias`
--

CREATE TABLE `colonias` (
  `idColonia` bigint(20) UNSIGNED NOT NULL,
  `nombreColonia` char(20) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentariosptecnico`
--

CREATE TABLE `comentariosptecnico` (
  `idComentario` bigint(20) UNSIGNED NOT NULL,
  `idTecnico` bigint(20) UNSIGNED NOT NULL,
  `idCategoria` bigint(20) UNSIGNED NOT NULL,
  `idEvaluacion` bigint(20) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conversaciones`
--

CREATE TABLE `conversaciones` (
  `idConversacion` bigint(20) UNSIGNED NOT NULL,
  `idSaliente` bigint(20) UNSIGNED NOT NULL,
  `idEntrante` bigint(20) UNSIGNED NOT NULL,
  `mensaje` varchar(350) COLLATE utf8_spanish_ci DEFAULT NULL,
  `latitud` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `longitud` varchar(150) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `conversaciones`
--

INSERT INTO `conversaciones` (`idConversacion`, `idSaliente`, `idEntrante`, `mensaje`, `latitud`, `longitud`) VALUES
(5, 19, 9, 'Buenas noches', '', ''),
(4, 19, 9, 'Hola tecnico', '', ''),
(19, 9, 19, 'Estoy interesado en su solicitud sobre la tuberia', '', ''),
(18, 9, 19, 'Buenas noches', '', ''),
(20, 25, 26, 'Hola', '', ''),
(21, 25, 26, 'Â¿Estas ahi?', '', ''),
(22, 25, 26, 'Edgar....', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `idEvaluacion` bigint(20) UNSIGNED NOT NULL,
  `idServicio` bigint(20) UNSIGNED NOT NULL,
  `idTecnico` bigint(20) UNSIGNED NOT NULL,
  `calAsignada` float DEFAULT NULL,
  `comentario` varchar(350) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historico`
--

CREATE TABLE `historico` (
  `idHistorico` bigint(20) UNSIGNED NOT NULL,
  `idServicio` bigint(20) UNSIGNED NOT NULL,
  `idCliente` bigint(20) UNSIGNED NOT NULL,
  `idEvaluacion` bigint(20) UNSIGNED NOT NULL,
  `idTecnico` bigint(20) UNSIGNED NOT NULL,
  `fechaTermino` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `idNotificacion` bigint(20) UNSIGNED NOT NULL,
  `idSolicitud` bigint(20) UNSIGNED NOT NULL,
  `idTecnico` bigint(20) UNSIGNED NOT NULL,
  `idUsuario` bigint(20) UNSIGNED NOT NULL,
  `tecnico` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `cliente` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `titulo` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `estimado` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`idNotificacion`, `idSolicitud`, `idTecnico`, `idUsuario`, `tecnico`, `cliente`, `titulo`, `estimado`) VALUES
(4, 6, 1, 19, 'Luis Gerardo', 'Edgardo', 'Tuberia rota', 350),
(7, 10, 4, 25, 'Edgar', 'Luis Gerardo', 'TuberÃ­a rota del la', 500),
(8, 11, 4, 25, 'Edgar', 'Luis Gerardo', 'Regadera con fuga de', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `idReporte` bigint(20) UNSIGNED NOT NULL,
  `idCliente` bigint(20) UNSIGNED NOT NULL,
  `idTecnico` bigint(20) UNSIGNED NOT NULL,
  `motivo` varchar(350) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `idServicio` bigint(20) UNSIGNED NOT NULL,
  `idSolicitud` bigint(20) UNSIGNED NOT NULL,
  `idUsuario` bigint(20) UNSIGNED NOT NULL,
  `idTecnico` bigint(20) UNSIGNED NOT NULL,
  `fechaHora` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `costo` float DEFAULT NULL,
  `estado` tinyint(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`idServicio`, `idSolicitud`, `idUsuario`, `idTecnico`, `fechaHora`, `costo`, `estado`) VALUES
(8, 10, 25, 4, '', 500, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idSolicitud` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `necesidad` int(20) DEFAULT NULL,
  `descripcion` varchar(350) COLLATE utf8_spanish_ci DEFAULT NULL,
  `foto` longblob,
  `expiracion` datetime DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `fechaPublicacion` date DEFAULT NULL,
  `colonia` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `categoria` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `idUsuario` bigint(20) UNSIGNED NOT NULL,
  `finalizado` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`idSolicitud`, `titulo`, `necesidad`, `descripcion`, `foto`, `expiracion`, `estado`, `fechaPublicacion`, `colonia`, `categoria`, `idUsuario`, `finalizado`) VALUES
(10, 'TuberÃ­a rota del la', 1, 'La tuberÃ­a tiene problemas', '', NULL, 0, '0000-00-00', 'Felipe Ãngeles', 'Plomeria', 25, 0),
(11, 'Regadera con fuga de', 0, 'Tengo una regadera que gotea todas las noches la verdad no se si tenga que ver con la red de ', '', NULL, 1, '0000-00-00', 'Desarrollo San Pablo', 'Plomeria', 25, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `idTarjeta` bigint(20) UNSIGNED NOT NULL,
  `idUsuario` bigint(20) UNSIGNED NOT NULL,
  `numeroTarjeta` bigint(16) NOT NULL,
  `claveSeguridad` int(11) NOT NULL,
  `fechaExpiracion` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `titular` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`idTarjeta`, `idUsuario`, `numeroTarjeta`, `claveSeguridad`, `fechaExpiracion`, `titular`) VALUES
(8, 19, 7777777777777777, 137, '2018-05', 'Edgardo Balderas Morales'),
(13, 19, 7894143256191841, 159, '2018-03', 'Gerardo Varela'),
(14, 25, 22254633, 123, '2017-12', 'Luis Gerardo GarcÃ­a Varela');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicos`
--

CREATE TABLE `tecnicos` (
  `idTecnico` bigint(20) UNSIGNED NOT NULL,
  `idUsuario` bigint(20) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tecnicos`
--

INSERT INTO `tecnicos` (`idTecnico`, `idUsuario`) VALUES
(1, 9),
(2, 19),
(3, 25),
(4, 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` bigint(20) UNSIGNED NOT NULL,
  `nombre` char(30) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` char(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `correo` char(30) COLLATE utf8_spanish_ci NOT NULL,
  `contrasena` text COLLATE utf8_spanish_ci NOT NULL,
  `telefono` bigint(10) NOT NULL,
  `calificacion` float NOT NULL,
  `fotoUsuario` longblob
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellidos`, `correo`, `contrasena`, `telefono`, `calificacion`, `fotoUsuario`) VALUES
(26, 'Edgar', 'ZuÃ±iga', 'edgar@gmail.com', '01cfcd4f6b8770febfb40cb906715822', 442, 0, ''),
(25, 'Luis Gerardo', 'GarcÃ­a Varela', 'lggarciavarela@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 4423011349, 0, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`),
  ADD UNIQUE KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `cattec`
--
ALTER TABLE `cattec`
  ADD PRIMARY KEY (`idCatTec`,`idTecnico`,`categoria`),
  ADD UNIQUE KEY `idCatTec` (`idCatTec`);

--
-- Indices de la tabla `colonias`
--
ALTER TABLE `colonias`
  ADD PRIMARY KEY (`idColonia`),
  ADD UNIQUE KEY `idColonia` (`idColonia`);

--
-- Indices de la tabla `comentariosptecnico`
--
ALTER TABLE `comentariosptecnico`
  ADD PRIMARY KEY (`idComentario`),
  ADD UNIQUE KEY `idComentario` (`idComentario`);

--
-- Indices de la tabla `conversaciones`
--
ALTER TABLE `conversaciones`
  ADD PRIMARY KEY (`idConversacion`),
  ADD UNIQUE KEY `idConversacion` (`idConversacion`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`idEvaluacion`),
  ADD UNIQUE KEY `idEvaluacion` (`idEvaluacion`);

--
-- Indices de la tabla `historico`
--
ALTER TABLE `historico`
  ADD PRIMARY KEY (`idHistorico`),
  ADD UNIQUE KEY `idHistorico` (`idHistorico`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`idNotificacion`),
  ADD UNIQUE KEY `idNotificacion` (`idNotificacion`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`idReporte`),
  ADD UNIQUE KEY `idReporte` (`idReporte`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`idServicio`),
  ADD UNIQUE KEY `idServicio` (`idServicio`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`idSolicitud`),
  ADD UNIQUE KEY `idSolicitud` (`idSolicitud`);

--
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`idTarjeta`),
  ADD UNIQUE KEY `idTarjeta` (`idTarjeta`);

--
-- Indices de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  ADD PRIMARY KEY (`idTecnico`),
  ADD UNIQUE KEY `idTecnico` (`idTecnico`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cattec`
--
ALTER TABLE `cattec`
  MODIFY `idCatTec` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `colonias`
--
ALTER TABLE `colonias`
  MODIFY `idColonia` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentariosptecnico`
--
ALTER TABLE `comentariosptecnico`
  MODIFY `idComentario` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `conversaciones`
--
ALTER TABLE `conversaciones`
  MODIFY `idConversacion` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `idEvaluacion` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historico`
--
ALTER TABLE `historico`
  MODIFY `idHistorico` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `idNotificacion` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `idReporte` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `idServicio` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idSolicitud` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  MODIFY `idTarjeta` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  MODIFY `idTecnico` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
