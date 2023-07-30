import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WAPPRequest from '../../utils';
import Boop from '../Boop';
import Spinner from '../Spinner';
import './profile.css';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getProfile = async () => {
      const response = await WAPPRequest('/profile', {
        method: 'GET',
      }).catch(() => {
        setError(true);
        return null;
      });

      if (response) {
        setProfile(response);
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  const renderProfile = () => {
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error</div>;
    }

    return profile !== '401' ? (
      <div className="profile-image">
        <h1> {profile.given_name}</h1>
        <img src={profile.picture}></img>
      </div>
    ) : (
      <div className="profile-image">
        <img src="/img/water-drop.png" />
      </div>
    );
  };

  return (
    <div className="profile-container">
      <Boop rotation={10} timing={150}>
        <Link to="/">
          <img className="profile-link" src="img/home (1).png" />
        </Link>
      </Boop>
      <Boop rotation={10} timing={150}>
        <Link to="/dashboard">
          <img className="profile-link" src="img/statistics.png" />
        </Link>
      </Boop>
      <Boop rotation={10} timing={150}>
        <Link to="/settings">
          <img className="profile-link" src="img/settings.png" />
        </Link>
      </Boop>
      <Boop rotation={10} timing={150}>
        <Link to="/logout">
          <img className="profile-link" src="img/exit.png" />
        </Link>
      </Boop>

      {renderProfile()}
    </div>
  );
}