-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 15-12-2015 a las 13:36:22
-- Versión del servidor: 5.5.44
-- Versión de PHP: 5.3.10-1ubuntu3.21

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE SCHEMA IF NOT EXISTS `control_acceso` DEFAULT CHARACTER SET utf8 ;
USE `control_acceso` ;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `control_acceso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE IF NOT EXISTS `alumnos` (
  `id_alumno` int(4) NOT NULL,
  `dni` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `foto` longblob,
  `tarjetaActivada` tinyint(1) DEFAULT NULL,
  `num_tarjeta` int(11) DEFAULT NULL,
  `presencia` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `dni`, `nombre`, `apellidos`, `correo`, `foto`, `tarjetaActivada`, `num_tarjeta`, `presencia`) VALUES
(1, '44170266p', 'iker', 'oñatibia', 'yo@yo.com', NULL, 1, 101, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_grupos`
--

CREATE TABLE IF NOT EXISTS `alumno_grupos` (
  `id_alumno_grupos` int(4) NOT NULL,
  `id_alumno` int(4) NOT NULL,
  `id_grupo` int(4) NOT NULL,
  PRIMARY KEY (`id_alumno_grupos`,`id_alumno`,`id_grupo`),
  KEY `fk_alumnos_has_grupo_grupo1_idx` (`id_grupo`),
  KEY `fk_alumnos_has_grupo_alumnos1_idx` (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

CREATE TABLE IF NOT EXISTS `asignatura` (
  `id_asignatura` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `clave` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_asignatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula`
--

CREATE TABLE IF NOT EXISTS `aula` (
  `id_aula` int(4) NOT NULL,
  `numero` varchar(4) DEFAULT NULL,
  `piso` varchar(2) DEFAULT NULL,
  `capacidad` int(4) DEFAULT NULL,
  PRIMARY KEY (`id_aula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `faltas`
--

CREATE TABLE IF NOT EXISTS `faltas` (
  `id_faltas` int(4) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `id_alumno` int(4) NOT NULL,
  `id_horarioGrupo` int(4) NOT NULL,
  `observaciones` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_faltas`),
  KEY `fk_faltas_alumnos1_idx` (`id_alumno`),
  KEY `fk_faltas_horarioGrupo1_idx` (`id_horarioGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE IF NOT EXISTS `grupo` (
  `id_grupo` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `tipo` enum('Bachiller','FP') DEFAULT NULL,
  `idsubgrupo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_grupo`),
  UNIQUE KEY `idsubgrupo_UNIQUE` (`idsubgrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario_grupo`
--

CREATE TABLE IF NOT EXISTS `horario_grupo` (
  `id_horario_grupo` int(4) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miercoles','Jueves','Viernes') DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `id_grupo` int(4) NOT NULL,
  `id_asignatura` int(4) NOT NULL,
  `id_horarioProfesor` int(4) NOT NULL,
  `id_aula` int(4) NOT NULL,
  PRIMARY KEY (`id_horario_grupo`),
  KEY `fk_horarioGrupo_grupo1_idx` (`id_grupo`),
  KEY `fk_horarioGrupo_asignatura1_idx` (`id_asignatura`),
  KEY `fk_horarioGrupo_horarioProfesor1_idx` (`id_horarioProfesor`),
  KEY `fk_horarioGrupo_aula1_idx` (`id_aula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario_profesor`
--

CREATE TABLE IF NOT EXISTS `horario_profesor` (
  `id_horario_profesor` int(4) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miercoles','Jueves','Viernes') DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `id_horario_grupo` int(4) NOT NULL,
  `id_profesor` int(4) NOT NULL,
  PRIMARY KEY (`id_horario_profesor`),
  KEY `fk_horarioProfesor_horarioGrupo1_idx` (`id_horario_grupo`),
  KEY `fk_horarioProfesor_profesor1_idx` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
--

CREATE TABLE IF NOT EXISTS `matricula` (
  `id_matricula` int(4) NOT NULL,
  `id_alumno` int(4) NOT NULL,
  `id_asignatura` int(4) NOT NULL,
  PRIMARY KEY (`id_alumno`,`id_asignatura`,`id_matricula`),
  KEY `fk_alumnos_has_asignatura_asignatura1_idx` (`id_asignatura`),
  KEY `fk_alumnos_has_asignatura_alumnos_idx` (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE IF NOT EXISTS `profesor` (
  `id_profesor` int(4) NOT NULL,
  `dni` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `contraseña` varchar(45) DEFAULT NULL,
  `foto` longblob,
  `tarjetaActivada` varchar(45) DEFAULT NULL,
  `num_tarjeta` int(11) DEFAULT NULL,
  `presencia` tinyint(1) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL COMMENT 'tabla Profesor',
  PRIMARY KEY (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_asignatura`
--

CREATE TABLE IF NOT EXISTS `profesor_asignatura` (
  `id_profesor_asignatura` int(4) NOT NULL,
  `id_asignatura` int(4) NOT NULL,
  `id_profesor` int(4) NOT NULL,
  PRIMARY KEY (`id_asignatura`,`id_profesor`,`id_profesor_asignatura`),
  KEY `fk_asignatura_has_profesor_profesor1_idx` (`id_profesor`),
  KEY `fk_asignatura_has_profesor_asignatura1_idx` (`id_asignatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno_grupos`
--
ALTER TABLE `alumno_grupos`
  ADD CONSTRAINT `fk_alumnos_has_grupo_alumnos1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumnos_has_grupo_grupo1` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id_grupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `faltas`
--
ALTER TABLE `faltas`
  ADD CONSTRAINT `fk_faltas_alumnos1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_faltas_horarioGrupo1` FOREIGN KEY (`id_horarioGrupo`) REFERENCES `horario_grupo` (`id_horario_grupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horario_grupo`
--
ALTER TABLE `horario_grupo`
  ADD CONSTRAINT `fk_horarioGrupo_asignatura1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horarioGrupo_aula1` FOREIGN KEY (`id_aula`) REFERENCES `aula` (`id_aula`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horarioGrupo_grupo1` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id_grupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horarioGrupo_horarioProfesor1` FOREIGN KEY (`id_horarioProfesor`) REFERENCES `horario_profesor` (`id_horario_profesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horario_profesor`
--
ALTER TABLE `horario_profesor`
  ADD CONSTRAINT `fk_horarioProfesor_horarioGrupo1` FOREIGN KEY (`id_horario_grupo`) REFERENCES `horario_grupo` (`id_horario_grupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horarioProfesor_profesor1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `fk_alumnos_has_asignatura_alumnos` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumnos_has_asignatura_asignatura1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor_asignatura`
--
ALTER TABLE `profesor_asignatura`
  ADD CONSTRAINT `fk_asignatura_has_profesor_asignatura1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_asignatura_has_profesor_profesor1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
