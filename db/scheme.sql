SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema TimeMaster
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema TimeMaster
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TimeMaster` DEFAULT CHARACTER SET utf8 ;
USE `TimeMaster` ;

-- -----------------------------------------------------
-- Table `TimeMaster`.`solution`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TimeMaster`.`solution` (
  `idsolution` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `comment` VARCHAR(1000) NULL,
  PRIMARY KEY (`idsolution`),
  UNIQUE INDEX `idsolution_UNIQUE` (`idsolution` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TimeMaster`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TimeMaster`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TimeMaster`.`goal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TimeMaster`.`goal` (
  `idgoal` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `creator` INT NOT NULL,
  PRIMARY KEY (`idgoal`),
  UNIQUE INDEX `idgoal_UNIQUE` (`idgoal` ASC),
  INDEX `fk_goal_creator_idx` (`creator` ASC),
  CONSTRAINT `fk_goal_creator`
    FOREIGN KEY (`creator`)
    REFERENCES `TimeMaster`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TimeMaster`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TimeMaster`.`task` (
  `idtask` INT NOT NULL AUTO_INCREMENT,
  `type` INT NOT NULL DEFAULT 0,
  `resolved` INT NULL DEFAULT NULL,
  `dateCreated` DATETIME NOT NULL,
  `idgoal` INT NOT NULL,
  `assignee` INT NULL DEFAULT NULL,
  `urgency` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idtask`),
  UNIQUE INDEX `idtask_UNIQUE` (`idtask` ASC),
  INDEX `fk_idsolution_task_idx` (`resolved` ASC),
  INDEX `fk_idgoal_task_goal_idx` (`idgoal` ASC),
  INDEX `fk_idassignee_user_idx` (`assignee` ASC),
  CONSTRAINT `fk_idsolution_task`
    FOREIGN KEY (`resolved`)
    REFERENCES `TimeMaster`.`solution` (`idsolution`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_idgoal_task_goal`
    FOREIGN KEY (`idgoal`)
    REFERENCES `TimeMaster`.`goal` (`idgoal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_idassignee_user`
    FOREIGN KEY (`assignee`)
    REFERENCES `TimeMaster`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TimeMaster`.`reminder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TimeMaster`.`reminder` (
  `idreminder` INT NOT NULL AUTO_INCREMENT,
  `dateCreated` DATETIME NOT NULL,
  `creator` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `dateBegin` DATETIME NOT NULL,
  PRIMARY KEY (`idreminder`),
  UNIQUE INDEX `idevent_UNIQUE` (`idreminder` ASC),
  INDEX `fk_reminder_user_idx` (`creator` ASC),
  CONSTRAINT `fk_reminder_user`
    FOREIGN KEY (`creator`)
    REFERENCES `TimeMaster`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TimeMaster`.`repeating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TimeMaster`.`repeating` (
  `idrepeating` INT NOT NULL AUTO_INCREMENT,
  `time` INT NOT NULL,
  `idreminder` INT NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idrepeating`),
  UNIQUE INDEX `idrepeating_UNIQUE` (`idrepeating` ASC),
  INDEX `fk_repeating_reminder_idreminder_idx` (`idreminder` ASC),
  CONSTRAINT `fk_repeating_reminder_idreminder`
    FOREIGN KEY (`idreminder`)
    REFERENCES `TimeMaster`.`reminder` (`idreminder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TimeMaster`.`onetime`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TimeMaster`.`onetime` (
  `idonetime` INT NOT NULL AUTO_INCREMENT,
  `idreminder` INT NOT NULL,
  PRIMARY KEY (`idonetime`),
  UNIQUE INDEX `idonetime_UNIQUE` (`idonetime` ASC),
  INDEX `fk_repeating_reminder_idreminder_idx` (`idreminder` ASC),
  CONSTRAINT `fk_onetime_reminder_idreminder`
    FOREIGN KEY (`idreminder`)
    REFERENCES `TimeMaster`.`reminder` (`idreminder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TimeMaster`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TimeMaster`.`event` (
  `idevent` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `timeBegin` DATETIME NOT NULL,
  `timeEnd` DATETIME NOT NULL,
  `idgoal` INT NOT NULL,
  PRIMARY KEY (`idevent`),
  UNIQUE INDEX `idevent_UNIQUE` (`idevent` ASC),
  INDEX `fk_idgoal_event_goal_idx` (`idgoal` ASC),
  CONSTRAINT `fk_idgoal_event_goal`
    FOREIGN KEY (`idgoal`)
    REFERENCES `TimeMaster`.`goal` (`idgoal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
