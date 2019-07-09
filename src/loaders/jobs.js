module.exports = async agenda => {
  await agenda.start();
  // Run DELETE_OLD_COMPANIES job every day at midnight
  await agenda.every('0 0 * * *', 'DELETE_OLD_COMPANIES');
};
