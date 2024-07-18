import React from 'react';

const Update = () => {
    return (
        <div className="container">
            <h2>Update Profile</h2>
            <form action="/api/member/update" method="post">
                <div>
                    <label htmlFor="nickname">Nickname:</label>
                    <input type="text" id="nickname" name="nickname" required />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" />
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Update;
