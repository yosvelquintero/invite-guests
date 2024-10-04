import { renderHook, act } from '@testing-library/react';
import useEmailManagement from './useEmailManagement';

describe('useEmailManagement Hook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useEmailManagement());

    expect(result.current.email).toBe('');
    expect(result.current.invitedEmails).toEqual(new Set());
    expect(result.current.isEmailDuplicated).toBe(false);
    expect(result.current.isEmailError).toBe(true); // Updated expectation
  });

  it('should update email correctly with a valid email', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('test@example.com');
    });

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.isEmailError).toBe(false);
    expect(result.current.isEmailDuplicated).toBe(false);
  });

  it('should set isEmailError to true for invalid email', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('invalid-email');
    });

    expect(result.current.email).toBe('invalid-email');
    expect(result.current.isEmailError).toBe(true);
    expect(result.current.isEmailDuplicated).toBe(false);
  });

  it('should add email when addEmail is called with valid, non-duplicate email', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('user1@example.com');
    });

    act(() => {
      result.current.addEmail();
    });

    expect(result.current.invitedEmails).toEqual(new Set(['user1@example.com']));
    expect(result.current.email).toBe('');
    expect(result.current.isEmailDuplicated).toBe(false);
    expect(result.current.isEmailError).toBe(true); // Updated expectation
  });

  it('should not add email when addEmail is called with invalid email', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('invalid-email');
    });

    act(() => {
      result.current.addEmail();
    });

    expect(result.current.invitedEmails).toEqual(new Set());
    expect(result.current.email).toBe('invalid-email');
    expect(result.current.isEmailError).toBe(true);
  });

  it('should not add duplicate email', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('user1@example.com');
    });

    act(() => {
      result.current.addEmail();
    });

    expect(result.current.invitedEmails).toEqual(new Set(['user1@example.com']));
    expect(result.current.email).toBe('');
    expect(result.current.isEmailDuplicated).toBe(false);
    expect(result.current.isEmailError).toBe(true); // Updated expectation

    act(() => {
      result.current.setEmail('user1@example.com');
    });

    expect(result.current.isEmailDuplicated).toBe(true);

    act(() => {
      result.current.addEmail();
    });

    expect(result.current.invitedEmails).toEqual(new Set(['user1@example.com']));
    expect(result.current.email).toBe('user1@example.com'); // Email not reset
    expect(result.current.isEmailError).toBe(false); // Since email is valid but duplicated
  });

  it('should remove email when removeEmail is called', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('user1@example.com');
    });

    act(() => {
      result.current.addEmail();
    });

    expect(result.current.invitedEmails).toEqual(new Set(['user1@example.com']));

    act(() => {
      result.current.removeEmail('user1@example.com');
    });

    expect(result.current.invitedEmails).toEqual(new Set());
  });

  it('should handle multiple emails', () => {
    const { result } = renderHook(() => useEmailManagement());

    const emails = ['user1@example.com', 'user2@example.com', 'user3@example.com'];

    emails.forEach((email) => {
      act(() => {
        result.current.setEmail(email);
      });
      act(() => {
        result.current.addEmail();
      });
    });

    expect(result.current.invitedEmails).toEqual(new Set(emails));
    expect(result.current.email).toBe('');
    expect(result.current.isEmailError).toBe(true); // Since email is reset to ''
  });

  it('should not add empty email', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('');
    });

    act(() => {
      result.current.addEmail();
    });

    expect(result.current.invitedEmails).toEqual(new Set());
    expect(result.current.email).toBe('');
    expect(result.current.isEmailError).toBe(true);
  });

  it('should not set isEmailDuplicated if email is not in invitedEmails', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('user1@example.com');
    });

    expect(result.current.isEmailDuplicated).toBe(false);
  });

  it('should set isEmailDuplicated to true if email is in invitedEmails', () => {
    const { result } = renderHook(() => useEmailManagement());

    act(() => {
      result.current.setEmail('user1@example.com');
    });

    act(() => {
      result.current.addEmail();
    });

    act(() => {
      result.current.setEmail('user1@example.com');
    });

    expect(result.current.isEmailDuplicated).toBe(true);
  });
});
