-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 18 nov. 2024 à 10:07
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `zoodb`
--

-- --------------------------------------------------------

--
-- Structure de la table `animal`
--

CREATE TABLE `animal` (
  `id` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `habitat_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `animal_food`
--

CREATE TABLE `animal_food` (
  `id` int(11) NOT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` double NOT NULL,
  `date` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `animal_image`
--

CREATE TABLE `animal_image` (
  `id` int(11) NOT NULL,
  `animal_id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `animal_rapport`
--

CREATE TABLE `animal_rapport` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `state` longtext NOT NULL,
  `food` varchar(255) NOT NULL,
  `quantity` double NOT NULL,
  `date` date NOT NULL COMMENT '(DC2Type:date_immutable)',
  `details` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `text` longtext NOT NULL,
  `is_visible` tinyint(1) DEFAULT NULL,
  `created_at` date NOT NULL COMMENT '(DC2Type:date_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `pseudo`, `text`, `is_visible`, `created_at`) VALUES
(6, 'Jean R', 'Une expérience formidable ! Le zoo est magnifique et l\'engagement écologique est palpable.', 1, '2024-11-15'),
(7, 'Giani M', 'Les habitats sont très bien conçus et les animaux semblent heureux. Je recommande vivement.', 1, '2024-11-15'),
(8, 'Milano P', 'Journée mémorable avec mes enfants', 0, '2024-11-15'),
(9, 'Emiliano f', 'Le parc est bien entretenu , nous avions passer une agréable journée', 0, '2024-11-15'),
(10, 'Emiliano P', 'Une visite inoubliable dans un lieu respectueux de la nature. Les habitats des animaux sont magnifiques !', 1, '2024-11-15'),
(11, 'Anne P', 'J\'ai adoré l\'expérience en petit train à travers le zoo. Mes enfants veulent déjà y retourner !', 1, '2024-11-15'),
(12, 'Laurent D', 'Le restaurant propose des plats délicieux et locaux. Une belle pause au cœur de la visite.', 1, '2024-11-15'),
(13, 'Luca M', 'J\'ai beaucoup aimé les explications du vétérinaire sur les animaux. Très pédagogique !', 1, '2024-11-15');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20241030162730', '2024-11-07 16:10:36', 826);

-- --------------------------------------------------------

--
-- Structure de la table `habitat`
--

CREATE TABLE `habitat` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `habitat_habitat_image`
--

CREATE TABLE `habitat_habitat_image` (
  `habitat_id` int(11) NOT NULL,
  `habitat_image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `habitat_image`
--

CREATE TABLE `habitat_image` (
  `id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `race`
--

CREATE TABLE `race` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `value` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `value`, `name`) VALUES
(1, 'ROLE_ADMIN', 'Administateur'),
(2, 'ROLE_EMPLOYEE', 'Employé'),
(3, 'ROLE_VETERNARY', 'Vétérnaire');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `name`, `description`, `image`) VALUES
(2, 'Visite du zoo en petit train', 'Le zoo Arcadia propose une visite en petit train, permettant de découvrir les habitats et les animaux de manière confortable et écologique. Idéal pour les familles, ce tour offre une vue panoramique du parc avec des commentaires sur la faune et la flore.', '6734d1e223fa0.jpg'),
(3, 'Visite des habitats avec un guide gratuit', 'Le zoo Arcadia offre une visite guidée gratuite des habitats, où les visiteurs découvrent les animaux et leur environnement naturel, tout en apprenant des informations enrichissantes sur les espèces et les efforts de conservation du zoo', '67351583ae5d4.jpg'),
(5, 'Restauration', 'Le service de restauration du zoo Arcadia propose des repas sains et durables, à base d\'ingrédients locaux et biologiques. Dans un cadre naturel offrant une vue sur les différents habitats du zoo pour profiter des moments conviviaux en famille', '67371f99ec9d3.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `role_id`, `email`, `password`, `name`) VALUES
(1, 1, 'admin@zoo.org', '$2y$13$GfqtGJj0vP3eqz3D16HSDeBB1ZfZJR6O93pxph8Bh6BnhskxpfwAS', NULL),
(16, 2, 'employe@zoo.org', '$2y$13$xt8SYhuK3vLFKMMYlvcdc.moE5cyd/RlxNEXmbsHCHDvj2fr2KEZO', 'Jean'),
(17, 3, 'veterinaire@zoo.org', '$2y$13$hN5kw18itBVNztoSVohaEe9NZbcH232.cr5hbOH6/E134PHinnj/G', 'Jeanne');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_6AAB231F6E59D40D` (`race_id`),
  ADD KEY `IDX_6AAB231FAFFE2D26` (`habitat_id`);

--
-- Index pour la table `animal_food`
--
ALTER TABLE `animal_food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_931568C38E962C16` (`animal_id`),
  ADD KEY `IDX_931568C3A76ED395` (`user_id`);

--
-- Index pour la table `animal_image`
--
ALTER TABLE `animal_image`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_E4CEDDABB548B0F` (`path`),
  ADD KEY `IDX_E4CEDDAB8E962C16` (`animal_id`);

--
-- Index pour la table `animal_rapport`
--
ALTER TABLE `animal_rapport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_31EBCFA6A76ED395` (`user_id`),
  ADD KEY `IDX_31EBCFA68E962C16` (`animal_id`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `habitat`
--
ALTER TABLE `habitat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_3B37B2E85E237E06` (`name`);

--
-- Index pour la table `habitat_habitat_image`
--
ALTER TABLE `habitat_habitat_image`
  ADD PRIMARY KEY (`habitat_id`,`habitat_image_id`),
  ADD KEY `IDX_A5C5B042AFFE2D26` (`habitat_id`),
  ADD KEY `IDX_A5C5B042521FE96` (`habitat_image_id`);

--
-- Index pour la table `habitat_image`
--
ALTER TABLE `habitat_image`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_9AD7E031B548B0F` (`path`);

--
-- Index pour la table `race`
--
ALTER TABLE `race`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_DA6FBBAF5E237E06` (`name`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_E19D9AD25E237E06` (`name`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`),
  ADD KEY `IDX_8D93D649D60322AC` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `animal`
--
ALTER TABLE `animal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `animal_food`
--
ALTER TABLE `animal_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `animal_image`
--
ALTER TABLE `animal_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `animal_rapport`
--
ALTER TABLE `animal_rapport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `habitat`
--
ALTER TABLE `habitat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `habitat_image`
--
ALTER TABLE `habitat_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `race`
--
ALTER TABLE `race`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `animal`
--
ALTER TABLE `animal`
  ADD CONSTRAINT `FK_6AAB231F6E59D40D` FOREIGN KEY (`race_id`) REFERENCES `race` (`id`),
  ADD CONSTRAINT `FK_6AAB231FAFFE2D26` FOREIGN KEY (`habitat_id`) REFERENCES `habitat` (`id`);

--
-- Contraintes pour la table `animal_food`
--
ALTER TABLE `animal_food`
  ADD CONSTRAINT `FK_931568C38E962C16` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_931568C3A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `animal_image`
--
ALTER TABLE `animal_image`
  ADD CONSTRAINT `FK_E4CEDDAB8E962C16` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`);

--
-- Contraintes pour la table `animal_rapport`
--
ALTER TABLE `animal_rapport`
  ADD CONSTRAINT `FK_31EBCFA68E962C16` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_31EBCFA6A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `habitat_habitat_image`
--
ALTER TABLE `habitat_habitat_image`
  ADD CONSTRAINT `FK_A5C5B042521FE96` FOREIGN KEY (`habitat_image_id`) REFERENCES `habitat_image` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_A5C5B042AFFE2D26` FOREIGN KEY (`habitat_id`) REFERENCES `habitat` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D649D60322AC` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
