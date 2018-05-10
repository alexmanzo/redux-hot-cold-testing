import reducer from './reducer';
import { restartGame, makeGuess, generateAuralUpdate } from './actions';

describe('reducer', () => {

    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'})
        expect(state.guesses).toEqual([])
        expect(state.auralStatus).toEqual('')
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0)
        expect(state.correctAnswer).toBeLessThanOrEqual(100)
        expect(state.feedback).toEqual('Make your guess!')

    })

    it('Should return the current state on an unkown action', () => {
        let currentState = {}
        const state = reducer(currentState, {type:'__UNKNOWN'})
        expect(state).toBe(currentState)
    })

    describe('restartGame', () => {
        let state = null
        state = reducer(state, restartGame(45))
        expect(state.guesses).toEqual([])
        expect(state.auralStatus).toEqual('')
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0)
        expect(state.correctAnswer).toBeLessThanOrEqual(100)
        expect(state.feedback).toEqual('Make your guess!')
    })

    describe('makeGuess', () => {
        it('Should make a guess', () => {

            let state = {
                guesses: [],
                feedback: '',
                correctAnswer: 100
            }
            state = reducer(state, makeGuess(10))
            expect(state.guesses).toEqual([10])
            expect(state.feedback).toEqual("You're Ice Cold...")

            state = reducer(state, makeGuess(60))
            expect(state.guesses).toEqual([10, 60])
            expect(state.feedback).toEqual("You're Cold...")

            state = reducer(state, makeGuess(85))
            expect(state.guesses).toEqual([10, 60, 85])
            expect(state.feedback).toEqual("You're Warm.")

            state = reducer(state, makeGuess(99))
            expect(state.guesses).toEqual([10, 60, 85, 99])
            expect(state.feedback).toEqual("You're Hot!")

            state = reducer(state, makeGuess(100))
            expect(state.guesses).toEqual([10, 60, 85, 99, 100])
            expect(state.feedback).toEqual('You got it!')
            })
            
    })

    describe('generateAuralUpdate', () => {
        it('should generate an aural update', () => {
            let state = {
                guesses: [5, 25, 99],
                auralStatus: '',
                feedback: "You're Hot!",
            }
            state = reducer(state, generateAuralUpdate())
            expect(state.auralStatus).toEqual("Here's the status of the game right now: You're Hot! You've made 3 guesses. In order of most- to least-recent, they are: 99, 25, 5")

        })
    })
})

