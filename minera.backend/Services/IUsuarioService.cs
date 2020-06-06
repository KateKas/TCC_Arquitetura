using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Minera.Data.Entities;
using Minera.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Minera.Services
{
    public interface IUsuarioService
    {
        Task<Usuario> Authenticate(string username, string password);
        Task<IEnumerable<Usuario>> GetAll();
        Task<Usuario> GetById(int id);
        Task Create(Usuario user, string password);
        Task Update(Usuario user, string password = null);
        Task Delete(int id);
    }

    public class UsuarioService : IUsuarioService
    {
        private IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = await _usuarioRepository.GetUserByUsername(username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.password_hash, user.password_salt))
                return null;

            // authentication successful
            return user;
        }

        public async Task<IEnumerable<Usuario>> GetAll()
        {
            return await _usuarioRepository.GetAll().ToListAsync();
        }
        public async Task Create(Usuario user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new BusinessException("Password is required");

            if (await _usuarioRepository.GetUserByUsername(user.username) != null)
                throw new BusinessException("Username \"" + user.username + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.password_hash = passwordHash;
            user.password_salt = passwordSalt;

            await _usuarioRepository.Create(user);
        }

        public async Task Update(Usuario userParam, string password = null)
        {
            var user = await _usuarioRepository.GetById(userParam.id);

            if (user == null)
                throw new BusinessException("Usuário não encontrado");

            if (userParam.username != user.username)
            {
                // username has changed so check if the new username is already taken
                if (await _usuarioRepository.GetUserByUsername(userParam.username) != null)
                    throw new BusinessException("Username " + userParam.username + " is already taken");
            }

            // update user properties
            user.nome = userParam.nome;
            user.username = userParam.username;            

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.password_hash = passwordHash;
                user.password_salt = passwordSalt;
            }

            await _usuarioRepository.Update(user.id,user);
        }
        public async Task Delete(int id)
        {
            var user = _usuarioRepository.GetById(id);

            if (user != null)
            {
                await _usuarioRepository.Delete(id);
            }
        }

        // helper methods
        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("O valor não pode ser vazio ou uma string só com espaços.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("O valor não pode ser vazio ou uma string só com espaços.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Tamanho de hash inválido (64 bytes esperado).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Tamanho de salt inválido (128 bytes esperado).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public async Task<Usuario> GetById(int id)
        {
            return await _usuarioRepository.GetById(id);
        }
    }
}