const { ObjectID } = require('mongodb');
const usersCollection = require('../../db').db().collection('users');

const Admin = class admin {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }
};

Admin.allUserDocs = () => {
  return new Promise(async resolve => {
    const allUserDocs = await usersCollection.find().toArray();

    //CLEAN USER DOCS
    allUserDocs.map(userDoc => {
      userDoc = {
        _id: userDoc._id,
        username: userDoc.username,
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        verified: userDoc.verified,
        scope: userDoc.scope,
        avatar: userDoc.avatar,
        active: userDoc.active,
      };

      return userDoc;
    });

    resolve(allUserDocs);
  });
};

Admin.handleRoleAssignment = (userId, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      await usersCollection.findOneAndUpdate(
        { _id: new ObjectID(userId) },
        {
          ...(type == 'downgrade' && {
            $pull: {
              scope: 'admin',
            },
          }),

          ...(type == 'upgrade' && {
            $push: {
              scope: 'admin',
            },
          }),
        }
      );

      resolve('Success');
    } catch (error) {
      reject(error);
    }
  });
};

Admin.handleBanUser = (userId, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      await usersCollection.findOneAndUpdate(
        { _id: new ObjectID(userId) },
        {
          ...(type == 'inactivate' && { $set: { active: false } }),
          ...(type == 'activate' && { $set: { active: true } }),
        }
      );

      resolve('Success');
    } catch (error) {
      reject(error);
    }
  });
};

Admin.adminSearch = searchText => {
  return new Promise(async (resolve, reject) => {
    if (typeof searchText == 'string' && searchText != '') {
      const searchResults = await usersCollection
        .find(
          {
            $or: [
              {
                firstName: { $regex: new RegExp(searchText, 'i') },
              },
              {
                lastName: { $regex: new RegExp(searchText, 'i') },
              },
              {
                username: { $regex: new RegExp(searchText, 'i') },
              },
              {
                email: { $regex: new RegExp(searchText, 'i') },
              },
              {
                verified: { $regex: new RegExp(searchText, 'i') },
              },
              {
                active: { $regex: new RegExp(searchText, 'i') },
              },
              {
                scope: { $regex: new RegExp(searchText, 'i') },
              },
            ],
          },
          {
            $sort: { score: { $meta: 'textScore' } },
          }
        )
        .toArray();

      //CLEAN USER DOCS
      searchResults.map(userDoc => {
        userDoc = {
          _id: userDoc._id,
          username: userDoc.username,
          firstName: userDoc.firstName,
          lastName: userDoc.lastName,
          verified: userDoc.verified,
          scope: userDoc.scope,
          avatar: userDoc.avatar,
          active: userDoc.active,
        };

        return userDoc;
      });

      resolve(searchResults);
    } else {
      reject(['Must be a string.']);
    }
  });
};

Admin.prototype.validateAudioUrl = function () {
  let matchBaseUrl =
    this.data.songUrl.split('https://res.cloudinary.com/my-nigerian-projects/video/upload')[0] ==
    '';
  let matchLengthStringBeforeFileName =
    this.data.songUrl.split('audio')[1].split('.')[0].length == 21;

  if (matchBaseUrl && matchLengthStringBeforeFileName) {
    return true;
  }

  this.errors.push('Invalid song url');
};

Admin.prototype.uploadSong = function () {
  return new Promise(async (resolve, reject) => {
    this.validateAudioUrl();
    if (!this.errors.length) {
      // SAVE
      console.log({ thisdata: this.data });
    } else {
      reject(this.errors);
    }
  });
};

module.exports = Admin;
