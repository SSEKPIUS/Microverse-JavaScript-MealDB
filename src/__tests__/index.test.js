import countFoods from '../modules/countFoods';
import countComments from '../modules/countComments';

jest.mock('../modules/countFoods', () => jest.fn());
jest.mock('../modules/countComments', () => jest.fn());
describe('Itmems Counter Test', () => {
  test('Module Resolves', () => {
    countFoods.mockImplementation((data)=>{
      return data;
    }); 
    expect(countFoods(300)).toBeTruthy;
  });
  test('Exact value is returned', () => {
    countFoods.mockImplementation((data)=>{
      return data;
    }); 
    expect(countFoods(300)).toBe(300);
  });
}); 

// describe('Coments Counter Test', () => {
//   test('Module Resolves', () => {
//     countComments.mockImplementation((data)=>{
//       return data;
//     }); 
//     expect(countFoods(500)).toBeTruthy;
//   });
//   test('Exact commetnts value is returned', () => {
//     countComments.mockImplementation((data)=>{
//       return data;
//     }); 
//     expect(countFoods(400)).toBe(400);
//   });
// }); 