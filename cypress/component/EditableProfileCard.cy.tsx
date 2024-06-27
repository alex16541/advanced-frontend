import { EditableProfileCard } from '@/features/EditableProfileCard';
import { TestProvider } from '@/shared/lib/tests/renderWithProviders/renderWithProviders';

const USER_ID = 1;

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {
        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: {
                            authData: {
                                id: USER_ID.toString(),
                            },
                        },
                    },
                }}
            >
                <EditableProfileCard profileId={USER_ID} />
            </TestProvider>,
        );
    });
});
