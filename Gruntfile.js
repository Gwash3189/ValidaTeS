module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
       ts: {
           base: {
               src: ['src/**/*.ts'],
               out: 'dist/Validation.js',
               reference: 'src/reference.ts',
               options: {
                   sourcemap: false,
                   declaration: true
               }
           },
           tests: {
               src: ['tests/**/*.spec.ts'],
               out: 'tests/Validation.spec.js',
               reference: 'tests/reference.ts',
               options: {
                   sourcemap: false,
                   declaration: false
               }
           }
       },
        watch: {
            ts: {
                files: 'src/**/*.ts',
                tasks: ['ts'],
                options: {
                    interrupt: true
                }
            },
            tests: {
                files: 'tests/**/*.ts',
                tasks: ['ts'],
                options: {
                    interrupt: true
                }
            }
        }
    });
};