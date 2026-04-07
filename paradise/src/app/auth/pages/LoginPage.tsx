import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { authResource } from '../../../shared/services/resources/auth';
import { loginRequestSchema } from '../../../shared/services/dto/auth';
import type { LoginRequestDTO } from '../../../shared/services/dto/auth';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';


export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate, isPending } = useMutation({
    mutationFn: authResource.login,
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      navigate('/dashboard');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestDTO>({ resolver: zodResolver(loginRequestSchema) });


  function onSubmit(values: LoginRequestDTO) {
    mutate(values)
  }



  return (
    <div>
      <h2 className="mb-1 text-xl font-bold text-white">Welcome back</h2>
      <p className="mb-7 text-sm text-white/70">Sign in to your account to continue</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="admin"
            autoComplete="username"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-xs text-red-400">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" disabled={isPending} className="mt-2">
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Signing in...
            </span>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </div>
  );
}
