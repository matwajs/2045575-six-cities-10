import LocationItemList from '../../components/location-item-list/location-item-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import PropertyList from '../../components/property-list/property-list';
import UserProfile from '../../components/user-profile/user-profile';
import { CardClassName, MapContainerClassName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/action';
import { Properties, PropertyCity } from '../../types/property';
import SortOptions from '../../components/sort-options/sort-options';
import { useState } from 'react';

export default function MainScreen(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const currentProperties = useAppSelector((state) => state.properties)
    .filter(({city}) => currentCity.name === city.name);
  const dispatch = useAppDispatch();

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [sortedProperties, setSortedProperties] = useState<Properties>(currentProperties);

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
        <LocationItemList
          currentCity={currentCity}
          onLocationItemClick={(city: PropertyCity) => {
            dispatch(setCity(city));
            setSortedProperties(currentProperties);
          }}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentProperties.length} places to stay in {currentCity.name}
              </b>
              <SortOptions
                sortedProperties={sortedProperties}
                currentCity={currentCity}
                setSortedProperties={setSortedProperties}
              />
              <div className="cities__places-list places__list tabs__content">
                <PropertyList
                  properties={sortedProperties}
                  cardClassName={CardClassName.Cities}
                  onCardMouseEnter={(id: number) => setActiveCardId(id)}
                  onCardMouseLeave={() => setActiveCardId(null)}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                containerClassName={MapContainerClassName.City}
                currentCity={currentCity}
                currentProperties={sortedProperties}
                activeCardId={activeCardId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
