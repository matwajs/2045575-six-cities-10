import LocationItemList from '../../components/location-item-list/location-item-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import PropertyList from '../../components/property-list/property-list';
import UserProfile from '../../components/user-profile/user-profile';
import { CardClassName, LOADER_COLOR, LOADER_SIZE, MapContainerClassName } from '../../const';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import { getSortedProperties } from '../../components/sort-options-list/helper';
import SortOptionsList from '../../components/sort-options-list/sort-options-list';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from '../main-screen/main-screen.module.css';

export default function MainScreen(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const properties = useAppSelector((state) => state.properties);
  const activeSortOption = useAppSelector((state) => state.activeSortOption);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const currentProperties = properties.filter(({city}) => currentCity.name === city.name);
  const currentSortedProperties = getSortedProperties(activeSortOption, currentProperties);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <UserProfile />
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationItemList currentCity={currentCity}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentProperties.length} places to stay in {currentCity.name}
              </b>
              <SortOptionsList
                currentCity={currentCity}
                activeSortOption={activeSortOption}
              />
              <div className="cities__places-list places__list tabs__content">
                {properties.length ?
                  <PropertyList
                    properties={currentSortedProperties}
                    cardClassName={CardClassName.Cities}
                    onCardMouseEnter={(id: number) => setActiveCardId(id)}
                    onCardMouseLeave={() => setActiveCardId(null)}
                  /> :
                  <ClipLoader
                    size={LOADER_SIZE}
                    color={LOADER_COLOR}
                    className={styles.loader}
                  />}
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                containerClassName={MapContainerClassName.City}
                currentCity={currentCity}
                properties={currentProperties}
                activeCardId={activeCardId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
