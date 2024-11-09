import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FriendsActivityComponent = () => {
  const activities = [
    { friend: 'Alice', action: 'liked', type: 'song', value: 'Eternal Dream', time: '2h ago' },
    { friend: 'Bob', action: 'started following', type: 'person', value: 'John Doe', time: '5h ago' },
    { friend: 'Charlie', action: 'shared', type: 'playlist', value: 'Rock Classics', time: '1d ago' },
  ];

  return (
    <div className="container-fluid p-4">
  <h2 className="text-white mb-4">Friends Activity</h2>
  <div className="row">
    {activities.map((activity, index) => (
      <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div className="card bg-dark text-white p-3 h-100 shadow-sm">
          <p className="m-0">
            <strong>{activity.friend}</strong> {activity.action} a {activity.type}:{' '}
            <em>{activity.value}</em>
            <span className="text-muted ml-2">- {activity.time}</span>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default FriendsActivityComponent;
